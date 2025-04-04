import { Rule, ValidationResult } from '@domains/Rule';
import { getTypeCpfCnpj, isEmail, isMaxValue, isMinValue, isValidPrice } from './utils';

export const stepRules = (fieldsToValidate: Array<string>, rules: Record<string, Rule[]>) =>
  fieldsToValidate.reduce(
    (acc, field) => {
      if (rules[field]) {
        acc[field] = rules[field];
      }
      return acc;
    },
    {} as Record<string, Rule[]>
  );

const findNestedValue = (obj: any, field: string): any => {
  if (!obj || typeof obj !== 'object') return undefined;
  if (field in obj) return obj[field];

  for (const key of Object.keys(obj)) {
    const nestedValue = findNestedValue(obj[key], field);
    if (nestedValue !== undefined) return nestedValue;
  }

  return undefined;
};

export const extractRules = (definition: Record<string, Rule[]>, object: any) => {
  const fields = Object.keys(definition);
  const result: Record<string, any> = {};

  fields.forEach((field) => {
    const rules = definition[field];
    const value = findNestedValue(object, field);
    result[field] = validateRule(value, rules);
  });

  return result;
};

const validateRequired = (value: any): Partial<ValidationResult> | null => {
  if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
    return { error: true, message: 'Campo obrigatório' };
  }
  return null;
};

const validateCpfCnpj = (value: any): Partial<ValidationResult> | null => {
  if (value && !getTypeCpfCnpj(String(value))) {
    return { error: true, message: 'Informe um CPF/CNPJ válido' };
  }
  return null;
};

const validateLength = (value: any, minLength?: number, maxLength?: number): Partial<ValidationResult> | null => {
  const str = String(value);
  if (maxLength && !isMaxValue(str, maxLength)) {
    return { error: true, message: `O campo deve ter no máximo ${maxLength} caracteres` };
  }
  if (minLength && !isMinValue(str, minLength)) {
    return { error: true, message: `O campo deve ter pelo menos ${minLength} caracteres` };
  }
  return null;
};

const validateEmail = (value: any): Partial<ValidationResult> | null => {
  if (value && !isEmail(String(value))) {
    return { error: true, message: 'Informe um e-mail válido' };
  }
  return null;
};

const validatePrice = (value: any): Partial<ValidationResult> | null => {
  if (value !== undefined && value !== null && !isValidPrice(Number(value))) {
    return { error: true, message: 'Informe um preço válido' };
  }
  return null;
};

const applyRule = (rule: Rule, value: string | number): Partial<ValidationResult> | null => {
  switch (rule.rule) {
    case 'required':
      return validateRequired(value);
    case 'getTypeCpfCnpj':
      return validateCpfCnpj(value);
    case 'isValidLength':
      return validateLength(value, rule.minLength, rule.maxLength);
    case 'isEmail':
      return validateEmail(value);
    case 'isPrice':
      return validatePrice(value);
    default:
      return null;
  }
};

export const validateRule = (value: string | number, ruleList: Rule[] = []) => {
  const validationResult = { error: false, message: '', rules: ruleList };

  ruleList.forEach((rule: Rule) => {
    const error = applyRule(rule, value);
    if (error) {
      return { ...validationResult, ...error };
    }
  });

  return validationResult;
};
