import { cpf, cnpj } from 'cpf-cnpj-validator';
import { DATE_FORMAT, DATE_PARSE_FORMAT } from './date';
import * as validator from 'email-validator';
import * as moment from 'moment';

export const cleanCpfCnpj = (cpfCnpj: string) => {
  cpfCnpj = cpfCnpj.replace('.', '');
  cpfCnpj = cpfCnpj.replace('/', '');
  cpfCnpj = cpfCnpj.replace('-', '');

  return cpfCnpj;
};

export const isCpfCnpj = (cpfCnpj: string) => {
  if (cpfCnpj) {
    cpfCnpj = cleanCpfCnpj('' + cpfCnpj);

    if (cpf.isValid(cpfCnpj)) {
      return 'cpf';
    } else if (cnpj.isValid(cpfCnpj)) {
      return 'cnpj';
    }
  }

  return null;
};

export const isMaxLength = (campo: string, tamanhoMax: number) => {
  if (campo === undefined || campo === null) {
    return true;
  }
  const stringValue = `${campo}`;

  return stringValue.length <= tamanhoMax;
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

export const checkBoolean = (value: boolean) => {
  if (value) return 'Sim';
  else return 'Não';
};
