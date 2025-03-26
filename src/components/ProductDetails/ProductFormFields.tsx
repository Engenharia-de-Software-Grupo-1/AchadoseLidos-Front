import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import './style.css';
import { classNames } from 'primereact/utils';
import { Produto } from '@domains/Produto/Produto';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { GeneroProduto } from 'constants/ProdutoConstants';
import { useEffect, useState } from 'react';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { InputTextarea } from 'primereact/inputtextarea';

type ProductFormFieldProps = {
  hasSubmissionFailed: boolean;
  fieldName: keyof Produto;
  fieldValue?: string | undefined;
  fieldValues?: string[] | undefined;
  fieldValuePrice?: number | undefined;
  fieldValueStock?: number | undefined;
  fieldValueNumber?: number | undefined;
  setField: (field: keyof Produto, value: string | number) => void;
  setGenero?: (genero: keyof typeof GeneroProduto) => void;
  iconName?: string;
  genero?: keyof typeof GeneroProduto;
  labelText: string;
  isTextArea?: boolean;
  placeholderText: string;
  isShortInput?: boolean;
  isOptional?: boolean;
  isPassword?: boolean;
  isPrice?: boolean;
  isCategory?: boolean;
  isStock?: boolean;
  isGenero?: boolean;
  isYear?: boolean;
  options?: { label: string; value: string }[];
};

const ProductFormField = ({
  hasSubmissionFailed,
  fieldValue,
  fieldValues,
  fieldValuePrice,
  fieldValueStock,
  fieldValueNumber,
  iconName,
  setField,
  fieldName,
  labelText,
  isTextArea,
  placeholderText,
  isShortInput,
  isOptional,
  isPrice,
  isCategory,
  isStock,
  isGenero,
  isYear,
  options,
  genero,
  setGenero,
}: ProductFormFieldProps) => {
  const shouldShowError = hasSubmissionFailed && !isOptional && (!fieldValue || !fieldValuePrice);
  const [optionsGenero, setOptionsGenero] = useState<string[]>([]);

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField(fieldName, e.target.value);
  };

  const handleNumberChange = (e: InputNumberValueChangeEvent | InputNumberChangeEvent) => {
    setField(fieldName, e.value ? e.value : 0);
  };

  const handleMultiChange = (e: MultiSelectChangeEvent) => {
    setField(fieldName, e.value ? e.value : 0);
  };

  const handleInputDropdownChange = (e: DropdownChangeEvent) => {
    setField(fieldName, e.target.value);
    if (fieldName === 'categoria') {
      if (setGenero) {
        setGenero(e.target.value);
      }
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setField(fieldName, e.target.value);
  };

  useEffect(() => {
    const generos = genero ? GeneroProduto[genero] : [];
    setOptionsGenero([...generos]);
  }, [genero]);

  return (
    <div
      className={classNames('profile-form-field', {
        'profile-form-field-price': isPrice,
      })}
    >
      <div className="field-label">
        <label>
          {labelText} {!isOptional && <text>*</text>}
        </label>

        {!!iconName && ( // isto é uma tooltip. ainda falta a mensagem da tooltip
          <IconField className="label-icon">
            <i className={`pi pi-${iconName}`} />
          </IconField>
        )}
      </div>

      {isTextArea ? (
        <InputTextarea
          className={classNames('text-area', {
            'taxt-area-short': isTextArea,
          })}
          value={fieldValue}
          onChange={handleTextAreaChange}
          placeholder={placeholderText}
        />
      ) : isPrice ? (
        <InputNumber
          className={classNames('field-input', {
            'short-input': isShortInput,
            'empty-input-error': shouldShowError,
            'field-input-price': isPrice,
          })}
          placeholder={placeholderText}
          variant="filled"
          style={{ width: '230px' }}
          value={fieldValuePrice}
          onValueChange={handleNumberChange}
          mode="decimal"
          minFractionDigits={2}
        />
      ) : isStock ? (
        <InputNumber
          inputId="minmax-buttons"
          className={classNames('field-input', {
            'short-input': isShortInput,
            'empty-input-error': shouldShowError,
            'field-input-price': isPrice,
            'field-input-stock': isStock,
          })}
          style={{ width: '230px' }}
          value={fieldValueStock}
          onValueChange={handleNumberChange}
          mode="decimal"
          showButtons
          min={0}
          max={1000}
        />
      ) : isYear ? (
        <InputNumber
          className={classNames('field-input', {
            'short-input': isShortInput,
            'empty-input-error': shouldShowError,
            'field-input-year': isYear,
          })}
          useGrouping={false}
          style={{ width: '230px' }}
          value={fieldValueNumber}
          onChange={handleNumberChange}
          placeholder={placeholderText}
        />
      ) : isCategory ? (
        <Dropdown
          value={fieldValue}
          onChange={handleInputDropdownChange}
          options={options}
          placeholder={placeholderText}
          className={classNames('w-full field-input field-input-category', {
            'empty-input-error': shouldShowError,
          })}
          checkmark={true}
          highlightOnSelect={false}
        />
      ) : isGenero ? (
        <MultiSelect
          value={fieldValues ? fieldValues : []}
          onChange={handleMultiChange}
          options={optionsGenero}
          placeholder={placeholderText}
          maxSelectedLabels={3}
          className={classNames('w-full md:w-15rem field-input field-input-genero', {
            'empty-input-error': shouldShowError,
          })}
        />
      ) : (
        <InputText
          className={classNames('field-input', {
            'short-input': isShortInput,
            'empty-input-error': shouldShowError,
          })}
          value={fieldValue}
          onChange={handleInputTextChange}
          placeholder={placeholderText}
        />
      )}
    </div>
  );
};

export { ProductFormField };
