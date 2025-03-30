import { useCallback, useState } from 'react';
import { extractRules, stepRules, validateRule } from '@utils/formRules';
import { useErrorContext } from '@contexts/errorContext';
import { Rule } from '@domains/Rule';
import { getField } from '@utils/utils';
import { useNotification } from '@contexts/notificationContext';
import { ibge } from 'brasilapi-js';
import { validarEmail } from '@routes/routesAuth';

interface UseFormOptions<T> {
  initialData: T | null;
  rules?: Record<string, Rule[]>;
  aditionalValidate?: (formData: T, validationResults: Record<string, any>) => Record<string, any>;
  stepFields?: Record<number, string[]>;
}

export const useForm = <T>({ initialData, rules = {}, stepFields, aditionalValidate }: UseFormOptions<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [cities, setCities] = useState<{ value: string; text: string }[]>([]);
  const { setErrors, setError } = useErrorContext();
  const { showNotification } = useNotification();

  const setField = (field: string, value: any) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev! };

      const keys = field.split('.');
      let currentField = updatedFormData;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentField[key] = value;
        } else {
          currentField = currentField[key];
        }
      });

      return updatedFormData;
    });

    const fieldName = getField(field);
    setError(fieldName, validateRule(value, getRule(fieldName)));
  };

  const validate = (stepIndex?: number): boolean => {
    let definition = rules;
    if (stepFields) {
      let fieldsToValidate = stepFields[stepIndex] || [];
      definition = stepRules(fieldsToValidate, rules);
    }

    let validationResults = extractRules(definition, formData);

    if (aditionalValidate) {
      validationResults = aditionalValidate(formData, validationResults);
    }

    setErrors(validationResults);
    return !Object.values(validationResults).some((field) => field.error);
  };

  const getRule = (field: string): Rule[] => {
    return rules[field] || [];
  };

  const loadCitiesByState = useCallback(async () => {
    try {
      const response = await ibge.country.getBy('PB');
      const citiesOptions = response.data.map((city: any) => ({
        value: city.codigo_ibge,
        text: city.nome,
      }));
      setCities(citiesOptions);
    } catch (error) {
      showNotification('error', null, 'Erro ao carregar cidades');
      setCities([]);
    }
  }, []);

  const validateEmail = async (): Promise<boolean> => {
    try {
      const response = await validarEmail(formData?.conta?.email);
      return response.status === 200;
    } catch (error) {
      console.error('Erro ao validar e-mail:', error);
      return false;
    }
  };

  const checkTelefone = (object: T, validationResults: Record<string, any>): Record<string, any> => {
    if (object.telefone && object.telefone.length !== 13) {
      validationResults['telefone'] = {
        error: true,
        message: 'O número de telefone deve ter o prefixo e o DDD',
        rules: [],
      };
    }
    return validationResults;
  };

  const verifyPassword = (object: T, validationResults: Record<string, any>): Record<string, any> => {
    const passwordFields = ['senha', 'confirmaSenha'];
    passwordFields.forEach((field) => {
      if (!object.conta[field]) {
        validationResults[field] = { error: true, message: 'Campo obrigatório', rules: [] };
      }
    });

    if (object.conta.senha && object.conta.confirmaSenha && object.conta.senha !== object.conta.confirmaSenha) {
      validationResults['confirmaSenha'] = {
        error: true,
        message: 'Por favor, coloque senhas equivalentes',
        rules: [],
      };
    }

    return validationResults;
  };

  return {
    formData,
    setField,
    validate,
    getRule,
    loadCitiesByState,
    cities,
    setFormData,
    showNotification,
    validateEmail,
    verifyPassword,
    checkTelefone,
  };
};
