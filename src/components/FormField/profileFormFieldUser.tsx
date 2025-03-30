import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import './style.css';
import { classNames } from 'primereact/utils';
import { Usuario } from '@domains/Usuario';

type ProfileFormFieldPropsUser = {
  hasSubmissionFailed: boolean;
  fieldName: keyof Usuario;
  fieldValue: string | undefined;
  setField: (field: keyof Usuario, value: string) => void;
  iconName?: string;
  labelText?: string;
  isTextArea?: boolean;
  placeholderText: string;
  isShortInput?: boolean;
  isOptional?: boolean;
};

const ProfileFormFieldUser = ({
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
}: ProfileFormFieldPropsUser) => {
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
        {labelText && (
          <label>
            {labelText} {!isOptional && <text>*</text>}
          </label>
        )}

        {!!iconName && (
          <IconField className="label-icon">
            <i className={`pi pi-${iconName}`} />
          </IconField>
        )}
      </div>

      {isTextArea ? (
        <textarea
          className="text-area text-area-user"
          value={fieldValue}
          onChange={handleTextAreaChange}
          placeholder={placeholderText}
        />
      ) : (
        <InputText
          className={classNames('field-user-input', 'field-input', {
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

export { ProfileFormFieldUser };
