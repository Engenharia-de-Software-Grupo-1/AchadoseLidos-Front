import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import './style.css';
import { classNames } from 'primereact/utils';
import { Produto } from '@domains/Produto/Produto';
import { InputNumber } from 'primereact/inputnumber';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';


type ProductFormFieldProps = {
  hasSubmissionFailed: boolean;
  fieldName: keyof Produto;
  fieldValue?: string | undefined;
  fieldValueNumber?: number | undefined;
  setField: (field: keyof Produto, value: string | number) => void;
  iconName?: string;
  labelText: string;
  isTextArea?: boolean;
  placeholderText: string;
  isShortInput?: boolean;
  isOptional?: boolean;
  isPassword?: boolean;
  isPrice?: boolean;
  isCategory?: boolean;
  isStock?: boolean;
  isState?: boolean;
};

const ProductFormField = ({
  hasSubmissionFailed,
  fieldValue,
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
  isState,
}: ProductFormFieldProps) => {
  const shouldShowError = hasSubmissionFailed && !isOptional && (!fieldValue || !fieldValueNumber);

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField(fieldName, e.target.value);
  };

  const handlePriceChange = (e: InputNumberValueChangeEvent) => {
    setField(fieldName, e.value ? e.value : 0);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setField(fieldName, e.target.value);
  };

  return (
    <div className="profile-form-field">
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
        <textarea
          className="text-area"
          value={fieldValue}
          onChange={handleTextAreaChange}
          placeholder={placeholderText}
        />
      ) : isPrice ? (
          <InputNumber 
          className={classNames('field-input', 'field-input-price', {
            'short-input': isShortInput,
            'empty-input-error': shouldShowError,
          })}
          variant="filled" 
          value={fieldValueNumber} 
          onValueChange={handlePriceChange} mode="decimal" 
          minFractionDigits={2} />
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

      {shouldShowError && <text className="error-message">Insira o campo acima</text>}
    </div>
  );
};

export { ProductFormField };
