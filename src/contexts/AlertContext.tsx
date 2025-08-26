'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Alert {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (message: string, type?: Alert['type'], duration?: number) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (message: string, type: Alert['type'] = 'success', duration: number = 3000) => {
    const id = Date.now().toString();
    const newAlert: Alert = { id, message, type, duration };
    
    setAlerts(prev => [...prev, newAlert]);
    
    setTimeout(() => {
      removeAlert(id);
    }, duration);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}