import { cloneElement } from 'react';
import { observer } from 'mobx-react';
import { useErrorContext } from '@contexts/errorContext';
import { getField } from '@utils/utils';
import { classNames } from 'primereact/utils';
import './style.css';

interface FormFieldProps {
  label?: string;
  attribute: string;
  children: React.ReactNode;
  required?: boolean;
  editField?: boolean;
  short?: boolean;
  adress?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  attribute,
  children,
  required,
  editField,
  short,
  adress,
}) => {
  const { errors } = useErrorContext();
  const error = errors[getField(attribute)];

  return (
    <div className={adress ? 'address-form-field' : editField ? 'profile-form-field' : 'field'}>
      {label && (
        <label htmlFor={attribute} className={classNames({ 'p-error': error?.error, 'field-label': editField })}>
          {label}
          {(error?.error || required) && <span className="p-error"> *</span>}
        </label>
      )}
      <div className="input-wrapper">
      {cloneElement(children as React.ReactElement<any>, {
        id: attribute,
        className: classNames({
          'p-invalid p-error': error?.error,
          'field-input': editField,
          'short-input': short,
        }),
      })}
      </div>
      
      {error?.error && <small className="p-error">{error?.message}</small>}
    </div>
  );
};

export default observer(FormField);
