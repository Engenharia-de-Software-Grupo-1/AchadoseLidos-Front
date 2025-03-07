import { isCpfCnpj, isEmail, isMaxLength } from './utils';

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

export const extractRules = (definition: Record<string, Rule[]>, object: any, adress: boolean) => {
  const fields = Object.keys(definition) as string[];
  const result = {} as {};

  fields.forEach((field) => {
    const rules = definition[field];
    result[field] = adress ? validateRule(object['endereco'][field], rules) : validateRule(object[field], rules);
  });

  return result;
};

const validateRule = (value: any, ruleList = []) => {
  const validationResult = { error: false, message: '', rules: ruleList };

  ruleList.forEach((rule: Rule) => {
    if (rule.rule === 'required') {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        validationResult.error = true;
        validationResult.message = (rule.message ?? 'Por favor, preencha o campo') + ' ';
      }
    } else if (rule.rule === 'isCpfCnpj') {
      if (value && !isCpfCnpj(value)) {
        validationResult.error = true;
        validationResult.message = (rule.message ?? 'Por favor, informe um CPF/CNPJ válido') + ' ';
      }
    } else if (rule.rule === 'isMaxLength') {
      if (value && rule.maxLength && !isMaxLength(value, rule.maxLength)) {
        validationResult.error = true;
        validationResult.message = (rule.message ?? 'Por favor, retifique o tamanho do campo') + ' ';
      }
    } else if (rule.rule === 'isEmail') {
      if (value && !isEmail(value)) {
        validationResult.error = true;
        validationResult.message = (rule.message ?? 'Por favor, informe um e-mail válido') + ' ';
      }
    }
  });

  return validationResult;
};
