import { cpf, cnpj } from 'cpf-cnpj-validator';
import { DATE_FORMAT, DATE_PARSE_FORMAT } from './date';
import * as validator from 'email-validator';
import moment from 'moment';
import { Rule } from '@domains/Rule';

export const getTypeCpfCnpj = (cpfCnpj: string) => {
  if (cpfCnpj) {
    cpfCnpj = cpfCnpj.replace(/\D/g, '');

    if (cpfCnpj.length == 11 && cpf.isValid(cpfCnpj)) {
      return 'cpf';
    } else if (cpfCnpj.length == 14 && cnpj.isValid(cpfCnpj)) {
      return 'cnpj';
    }
  }

  return null;
};

export const isMaxValue = (campo: string, tamanhoMax: number) => {
  if (campo === undefined || campo === null) {
    return true;
  }
  const stringValue = `${campo}`;

  return stringValue.length <= tamanhoMax;
};

export const isMinValue = (campo: string, tamanhoMin: number) => {
  if (campo === undefined || campo === null) {
    return false;
  }
  const stringValue = `${campo}`;

  return stringValue.length >= tamanhoMin;
};

export const isEmail = (email: string) => {
  return validator.validate(email);
};

export const getValueByKey = (value: string, list = [], key = 'value', label = 'text') => {
  let result = '-';
  const filtered = list.filter((item) => item[key] === value);
  if (filtered.length > 0) {
    result = filtered[0][label];
  }
  return result;
};

export const getMultipleValuesByKey = (values = [], list = [], key = 'value', label = 'text') => {
  return values.map((v) => getValueByKey(v, list, key, label)).join(', ');
};

export const getFormatMonthYear = (dataDesejavel: string) => {
  let ano;
  let mes;

  if (dataDesejavel) {
    let partes = dataDesejavel.split('-');
    ano = partes[0];
    mes = partes[1];
  }

  return ano ? `${mes}/${ano}` : '-';
};

export const getValueDate = (value: string, formatter = DATE_FORMAT, parser = DATE_PARSE_FORMAT) => {
  return value ? moment(value, parser).format(formatter) : '-';
};

export const getValue = (value: any) => (value ? value : '-');

export const getValueMoney = (value: string, decimalPlaces = 2, defaultValue: number) => {
  const parseValue = (val: string | number) => {
    if (typeof val === 'string') {
      return parseFloat(val.replace(/\./g, '').replace(',', '.'));
    }
    return val;
  };

  const parsedValue = parseValue(value);

  if (isValueValid(parsedValue) && !isNaN(parsedValue)) {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimalPlaces,
    }).format(Math.abs(parsedValue));
    return parsedValue < 0 ? `R$ -${formattedValue}` : `R$ ${formattedValue}`;
  } else if (isValueValid(defaultValue) && !isNaN(defaultValue)) {
    const parsedDefault = parseValue(defaultValue);
    const formattedDefault = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimalPlaces,
    }).format(Math.abs(parsedDefault));
    return parsedDefault < 0 ? `R$ -${formattedDefault}` : `R$ ${formattedDefault}`;
  } else {
    return '-';
  }
};

export const isValueValid = (value: any) => {
  return value !== undefined && value !== null && value !== '';
};

export const getFirstAndLastName = (name: string) => {
  const fullName = name.split(' ');
  return (fullName.shift() + (fullName && fullName.length ? ' ' + fullName.pop() : '')).toUpperCase();
};

export const parseBoolean = (value: boolean) => {
  if (value) return 'Sim';
  else return 'Não';
};

export const addRuleToField = (rules: Record<string, Rule[]>, field: string, newRule: Rule) => {
  return {
    ...rules,
    [field]: rules[field] ? [...rules[field], newRule] : [newRule],
  };
};

export const getField = (field: string) => {
  const keys = field.split('.');
  return keys.length === 2 ? keys[1] : keys[0];
};

export const isValidPrice = (value: number) => {
  return value !== undefined && value !== null && !isNaN(value) && value > 0;
};

export const formatTypedValue = (value: string, maxSize: number) => {
  if (value.length > maxSize) {
    return value.substring(0, maxSize - 5) + '...';
  }
  return value;
};
