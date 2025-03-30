import { createContext, useContext, useRef, ReactNode } from 'react';
import { Toast } from 'primereact/toast';

export type Severity = 'info' | 'success' | 'warn' | 'error';

interface NotificationContextType {
  showNotification: (severity: Severity, summary: string | null, detail: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const toastRef = useRef<Toast>(null);

  const showNotification = (severity: Severity, summary: string | null, detail: string) => {
    if (toastRef.current) {
      toastRef.current.show({ severity, summary, detail, life: 3000 });
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <Toast ref={toastRef} />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
