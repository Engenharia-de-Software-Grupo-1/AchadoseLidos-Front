import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import './style.css';
import { classNames } from 'primereact/utils';
import { Endereco } from '@domains/Endereco';

type AddressFormFieldProps = {
  hasSubmissionFailed: boolean;
  fieldName: keyof Endereco;
  fieldValue: string | undefined;
  setField: (field: keyof Endereco, value: string) => void;
  labelText: string;
  placeholderText: string;
  isOptional?: boolean;
};

const AddressFormField = ({
  hasSubmissionFailed,
  fieldValue,
  setField,
  fieldName,
  labelText,
  placeholderText,
  isOptional,
}: AddressFormFieldProps) => {
  const shouldShowError = hasSubmissionFailed && !isOptional && !fieldValue;

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField(fieldName, e.target.value);
  };

  return (
    <div className="address-form-field">
      <label className="field-label">
        {labelText} {!isOptional && <text>*</text>}
      </label>

      <InputText
        className={classNames('field-input', {
          'empty-input-error': shouldShowError,
        })}
        value={fieldValue}
        onChange={handleInputTextChange}
        placeholder={placeholderText}
      />

      {shouldShowError && <text className="error-message">Insira o campo acima</text>}
    </div>
  );
};

export { AddressFormField };
