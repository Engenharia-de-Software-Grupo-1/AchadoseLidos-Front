import { useState } from 'react';
import { extractRules, stepRules, validateRule } from '@utils/formRules';
import { useErrorContext } from '@contexts/errorContext';
import { Rule } from '@domains/Rule';
import { getField } from '@utils/utils';

interface UseFormOptions<T> {
  initialData: T;
  rules?: Record<string, Rule[]>;
  aditionalValidate?: (formData: T, validationResults: Record<string, any>) => Record<string, any>;
  stepFields?: Record<number, string[]>;
}

export const useForm = <T>({ initialData, rules = {}, stepFields, aditionalValidate }: UseFormOptions<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const { setErrors, setError } = useErrorContext();

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

  return { formData, setField, validate, getRule };
};
