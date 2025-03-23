import { createContext, useContext, useState, ReactNode } from 'react';

interface Error {
  error: boolean;
  message: string;
}

interface ErrorContextType {
  errors: Record<string, Error>;
  setErrors: (errors: Record<string, Error>) => void;
  setError: (field: string, error: Error) => void;
  clearError: (field: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errors, setErrorsState] = useState<Record<string, Error>>({});

  const setErrors = (newErrors: Record<string, Error>) => {
    setErrorsState(newErrors);
  };

  const setError = (field: string, error: Error) => {
    setErrorsState((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const clearError = (field: string) => {
    setErrorsState((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return <ErrorContext.Provider value={{ errors, setErrors, setError, clearError }}>{children}</ErrorContext.Provider>;
};
