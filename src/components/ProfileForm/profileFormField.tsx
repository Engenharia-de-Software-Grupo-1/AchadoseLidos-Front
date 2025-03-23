import { Sebo } from '@domains/Sebo';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import './style.css';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';

type ProfileFormFieldProps = {
  hasSubmissionFailed: boolean;
  fieldName: keyof Sebo;
  fieldValue: string | undefined;
  setField: (field: keyof Sebo, value: string) => void;
  iconName?: string;
  labelText: string;
  isTextArea?: boolean;
  placeholderText: string;
  isShortInput?: boolean;
  isOptional?: boolean;
  isPassword?: boolean;
};

const ProfileFormField = ({
  hasSubmissionFailed,
  fieldValue,
  iconName,
  setField,
  fieldName,
  labelText,
  isTextArea,
  placeholderText,
  isShortInput,
  isOptional,
  isPassword,
}: ProfileFormFieldProps) => {
  const shouldShowError = hasSubmissionFailed && !isOptional && !fieldValue;

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField(fieldName, e.target.value);
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
        <InputTextarea
          value={fieldValue}
          onChange={handleTextAreaChange}
          placeholder={placeholderText}
          rows={5}
          cols={30}
        />
      ) : (
        <InputText
          className={classNames('field-input', {
            'short-input': isShortInput,
            'empty-input-error': shouldShowError,
          })}
          type={isPassword ? 'password' : 'text'}
          value={fieldValue}
          onChange={handleInputTextChange}
          placeholder={placeholderText}
        />
      )}

      {shouldShowError && <text className="error-message">Insira o campo acima</text>}
    </div>
  );
};

export { ProfileFormField };
