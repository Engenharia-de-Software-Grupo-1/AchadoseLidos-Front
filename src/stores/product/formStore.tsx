import { createContext, useContext, useState, ReactNode } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { extractRules, stepRules } from '@utils/formRules';
import { Produto } from '@domains/Produto/Produto';
import { ProdutoFieldNames } from '@domains/Produto/ProdutoFieldNames';

interface ProdutoFormContextType {
  Produto: Produto;
  setField: (field: string, value: any) => void;
  validateStep: (stepIndex: number) => boolean;
  getRule: (field: string) => {};
}

const ProdutoFormContext = createContext<ProdutoFormContextType | null>(null);

export const useProdutoForm = (): ProdutoFormContextType => {
  const context = useContext(ProdutoFormContext);
  if (!context) {
    throw new Error('useProdutoForm must be used within a ProdutoFormProvider');
  }
  return context;
};

interface ProdutoFormProviderProps {
  children: ReactNode;
}

export const ProdutoFormProvider = ({ children }: ProdutoFormProviderProps) => {
  const { showNotification } = useNotification();
  const [Produto, setFormData] = useState<Produto>({
    // falta foto
    nome: '',
    preco: 0,
    categoria: 'LIVRO',
    qtdEstoque: 0,
    anoEdicao: 0,
    anoLancamento: 0,
    estadoConservacao: 'EXCELENTE',
    autores: '',
    descricao: '',
    status: 'ATIVO',
    createdAt: new Date(),
    updatedAt: new Date(),
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

    const validationResults = extractRules(rulesByStep, Produto);

    const hasError = Object.keys(validationResults).some((field) => validationResults[field].error);
    return !hasError;
  };

  return (
    <ProdutoFormContext.Provider value={{ Produto, setField, validateStep, getRule }}>
      {children}
    </ProdutoFormContext.Provider>
  );
};
