import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  addDoc 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType, testConnection } from '../firebase/config';
import { 
  Property, 
  Empreendimento, 
  LandingPageConfig, 
  SiteSettings, 
  Lead 
} from '../types';
import { 
  INITIAL_PROPERTIES, 
  INITIAL_EMPREENDIMENTOS, 
  INITIAL_SETTINGS, 
  INITIAL_LANDING_PAGE 
} from '../data/initialData';

interface DataContextType {
  properties: Property[];
  empreendimentos: Empreendimento[];
  landingPages: LandingPageConfig[];
  activeLandingPage: LandingPageConfig | null;
  settings: SiteSettings;
  leads: Lead[];
  loading: boolean;
  saveProperty: (property: Property) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  saveEmpreendimento: (emp: Empreendimento) => Promise<void>;
  deleteEmpreendimento: (id: string) => Promise<void>;
  saveLandingPage: (lp: LandingPageConfig) => Promise<void>;
  saveSettings: (settings: SiteSettings) => Promise<void>;
  submitLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<Lead>;
  updateLeadStatus: (id: string, status: Lead['status'], notes?: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  resetToInitialData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>(INITIAL_EMPREENDIMENTOS);
  const [landingPages, setLandingPages] = useState<LandingPageConfig[]>([INITIAL_LANDING_PAGE]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Timeout-guarded fetch helper to prevent 10s offline hangs
  const fetchWithTimeout = async <T,>(promise: Promise<T>, timeoutMs = 2500): Promise<T> => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('Firestore fetch timeout')), timeoutMs);
    });
    try {
      return await Promise.race([promise, timeoutPromise]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  };

  // Sync / Fetch from Firestore
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      // 1. Properties
      try {
        const propSnap = await fetchWithTimeout(getDocs(collection(db, 'properties')));
        if (!propSnap.empty) {
          const list: Property[] = [];
          propSnap.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Property);
          });
          list.sort((a, b) => (a.order || 0) - (b.order || 0));
          setProperties(list);
        }
      } catch (err) {
        // Keeps INITIAL_PROPERTIES on timeout or offline mode
      }

      // 2. Empreendimentos
      try {
        const empSnap = await fetchWithTimeout(getDocs(collection(db, 'empreendimentos')));
        if (!empSnap.empty) {
          const list: Empreendimento[] = [];
          empSnap.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Empreendimento);
          });
          list.sort((a, b) => (a.order || 0) - (b.order || 0));
          setEmpreendimentos(list);
        }
      } catch (err) {
        // Keeps INITIAL_EMPREENDIMENTOS
      }

      // 3. Landing Pages
      try {
        const lpSnap = await fetchWithTimeout(getDocs(collection(db, 'landingPages')));
        if (!lpSnap.empty) {
          const list: LandingPageConfig[] = [];
          lpSnap.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as LandingPageConfig);
          });
          setLandingPages(list);
        }
      } catch (err) {
        // Keeps INITIAL_LANDING_PAGE
      }

      // 4. Settings
      try {
        const setSnap = await fetchWithTimeout(getDocs(collection(db, 'settings')));
        if (!setSnap.empty) {
          const s = setSnap.docs[0].data() as SiteSettings;
          setSettings(s);
        }
      } catch (err) {
        // Keeps INITIAL_SETTINGS
      }

      // 5. Leads (only readable if signed in)
      if (auth.currentUser) {
        try {
          const leadsSnap = await fetchWithTimeout(getDocs(collection(db, 'leads')));
          if (!leadsSnap.empty) {
            const list: Lead[] = [];
            leadsSnap.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...docSnap.data() } as Lead);
            });
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setLeads(list);
          }
        } catch (err) {
          // silent
        }
      }
    } catch (globalError) {
      console.warn('Data fetch status:', globalError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Operations
  const saveProperty = async (property: Property) => {
    try {
      const propId = property.id || `prop-${Date.now()}`;
      const toSave = { ...property, id: propId, updatedAt: new Date().toISOString() };
      await setDoc(doc(db, 'properties', propId), toSave);
      setProperties((prev) => {
        const index = prev.findIndex((p) => p.id === propId);
        if (index >= 0) {
          const copy = [...prev];
          copy[index] = toSave;
          return copy;
        }
        return [...prev, toSave];
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `properties/${property.id}`);
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'properties', id));
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `properties/${id}`);
    }
  };

  const saveEmpreendimento = async (emp: Empreendimento) => {
    try {
      const empId = emp.id || `emp-${Date.now()}`;
      const toSave = { ...emp, id: empId, updatedAt: new Date().toISOString() };
      await setDoc(doc(db, 'empreendimentos', empId), toSave);
      setEmpreendimentos((prev) => {
        const index = prev.findIndex((e) => e.id === empId);
        if (index >= 0) {
          const copy = [...prev];
          copy[index] = toSave;
          return copy;
        }
        return [...prev, toSave];
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `empreendimentos/${emp.id}`);
    }
  };

  const deleteEmpreendimento = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'empreendimentos', id));
      setEmpreendimentos((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `empreendimentos/${id}`);
    }
  };

  const saveLandingPage = async (lp: LandingPageConfig) => {
    try {
      const lpId = lp.id || `landing-${Date.now()}`;
      const toSave = { ...lp, id: lpId, updatedAt: new Date().toISOString() };
      await setDoc(doc(db, 'landingPages', lpId), toSave);
      setLandingPages((prev) => {
        const index = prev.findIndex((l) => l.id === lpId);
        if (index >= 0) {
          const copy = [...prev];
          copy[index] = toSave;
          return copy;
        }
        return [...prev, toSave];
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `landingPages/${lp.id}`);
    }
  };

  const saveSettings = async (newSettings: SiteSettings) => {
    try {
      const toSave = { ...newSettings, updatedAt: new Date().toISOString() };
      await setDoc(doc(db, 'settings', 'general'), toSave);
      setSettings(toSave);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/general');
    }
  };

  const submitLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'novo',
      createdAt: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, 'leads'), newLead);
      const savedLead = { ...newLead, id: docRef.id };
      setLeads((prev) => [savedLead, ...prev]);
      return savedLead;
    } catch (error) {
      // If offline, still add to state so user gets immediate visual confirmation
      console.warn('Lead saved locally:', error);
      setLeads((prev) => [newLead, ...prev]);
      return newLead;
    }
  };

  const updateLeadStatus = async (id: string, status: Lead['status'], notes?: string) => {
    try {
      const leadRef = doc(db, 'leads', id);
      const updatePayload: Record<string, unknown> = { status };
      if (notes !== undefined) updatePayload.notes = notes;
      await updateDoc(leadRef, updatePayload);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status, ...(notes !== undefined ? { notes } : {}) } : l))
      );
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `leads/${id}`);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'leads', id));
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `leads/${id}`);
    }
  };

  const resetToInitialData = async () => {
    for (const item of INITIAL_PROPERTIES) {
      await setDoc(doc(db, 'properties', item.id), item);
    }
    for (const item of INITIAL_EMPREENDIMENTOS) {
      await setDoc(doc(db, 'empreendimentos', item.id), item);
    }
    await setDoc(doc(db, 'landingPages', INITIAL_LANDING_PAGE.id), INITIAL_LANDING_PAGE);
    await setDoc(doc(db, 'settings', 'general'), INITIAL_SETTINGS);
    setProperties(INITIAL_PROPERTIES);
    setEmpreendimentos(INITIAL_EMPREENDIMENTOS);
    setLandingPages([INITIAL_LANDING_PAGE]);
    setSettings(INITIAL_SETTINGS);
  };

  const activeLandingPage = landingPages.find((lp) => lp.active) || landingPages[0] || null;

  return (
    <DataContext.Provider
      value={{
        properties,
        empreendimentos,
        landingPages,
        activeLandingPage,
        settings,
        leads,
        loading,
        saveProperty,
        deleteProperty,
        saveEmpreendimento,
        deleteEmpreendimento,
        saveLandingPage,
        saveSettings,
        submitLead,
        updateLeadStatus,
        deleteLead,
        resetToInitialData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
