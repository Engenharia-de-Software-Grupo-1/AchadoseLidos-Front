import { Rule } from '@domains/Rule';
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

export const validateRule = (value: string | number, ruleList: Rule[] = []) => {
  const validationResult = { error: false, message: '', rules: ruleList };

  ruleList.forEach((rule: Rule) => {
    if (rule.rule === 'required') {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        validationResult.error = true;
        validationResult.message = 'Campo obrigatório';
      }
    } else if (rule.rule === 'getTypeCpfCnpj') {
      if (value && !getTypeCpfCnpj(String(value))) {
        validationResult.error = true;
        validationResult.message = 'Informe um CPF/CNPJ válido';
      }
    } else if (rule.rule === 'isValidLength') {
      if (value && rule.maxLength && !isMaxValue(String(value), rule.maxLength)) {
        validationResult.error = true;
        validationResult.message = `O campo deve ter no máximo ${rule.maxLength} caracteres`;
      } else if (value && rule.minLength && !isMinValue(String(value), rule.minLength)) {
        validationResult.error = true;
        validationResult.message = `O campo deve ter pelo menos ${rule.minLength} caracteres`;
      }
    } else if (rule.rule === 'isEmail') {
      if (value && !isEmail(String(value))) {
        validationResult.error = true;
        validationResult.message = 'Informe um e-mail válido';
      }
    } else if (rule.rule === 'isPrice'){
      if (value !== undefined && value !== null && !isValidPrice(Number(value))) {
        validationResult.error = true;
        validationResult.message = 'Informe um preço válido';
      }
    }
  });

  return validationResult;
};
