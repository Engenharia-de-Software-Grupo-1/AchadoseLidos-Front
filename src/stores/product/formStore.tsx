import { createContext, useContext, useState, ReactNode } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { extractRules, stepRules } from '@utils/formRules';
import { Product } from '@domains/Product';

interface ProductFormContextType {
  product: Product;
  setField: (field: string, value: any) => void;
  validateStep: (stepIndex: number) => boolean;
  getRule: (field: string) => {};
}

const ProductFormContext = createContext<ProductFormContextType | null>(null);

export const useProductForm = (): ProductFormContextType => {
  const context = useContext(ProductFormContext);
  if (!context) {
    throw new Error('useProductForm must be used within a ProductFormProvider');
  }
  return context;
};

interface ProductFormProviderProps {
  children: ReactNode;
}

export const ProductFormProvider = ({ children }: ProductFormProviderProps) => {
  const { showNotification } = useNotification();
  const [product, setFormData] = useState<Product>({
    // falta foto
    nomeProduto: '',
    preco: '',
    categoria: '',
    estoque: '',
    anoEdicao: '',
    anoLancamento: '',
    estado: '',
    autores: '',
    descricao: '',
  });

  const setField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const rules: Record<string, Rule[]> = {
    nomeProduto: [{ rule: 'required' }],
    preco: [{ rule: 'required' }],
    categoria: [{ rule: 'required' }],
    estoque: [{ rule: 'required' }],
    estado: [{ rule: 'required' }],
  };

  const getRule = (field: string) => {
    return rules[field] ? rules[field] : {};
  };

  const validateStep = (stepIndex: number): boolean => {
    let fieldsToValidate = [
      'nomeProduto',
      'preco',
      'categoria',
      'estoque',
      'confirmaSenha',
      'estado',
    ];


    const rulesByStep = stepRules(fieldsToValidate, rules);

    const validationResults = extractRules(rulesByStep, product);

    const hasError = Object.keys(validationResults).some((field) => validationResults[field].error);
    return !hasError;
  };

  return (
    <ProductFormContext.Provider value={{ product, setField, validateStep, getRule }}>
      {children}
    </ProductFormContext.Provider>
  );
};
