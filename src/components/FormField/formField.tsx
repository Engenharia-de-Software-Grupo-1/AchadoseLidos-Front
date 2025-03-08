import { cloneElement } from 'react';
import { observer } from 'mobx-react';
import { useErrorContext } from '@contexts/errorContext';
import { getField } from '@utils/utils';

interface FormFieldProps {
  label?: string;
  attribute: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, attribute, children }) => {
  const { errors } = useErrorContext();
  const error = errors[getField(attribute)];

  return (
    <div className="field">
      {label && (
        <label htmlFor={attribute} className={error?.error ? 'p-error' : ''}>
          {label}
          {error?.error && <span className="p-error"> *</span>}
        </label>
      )}
      <div className="input-wrapper">
        {cloneElement(children as React.ReactElement<any>, {
          id: attribute,
          className: error?.error ? 'p-invalid p-error' : '',
        })}
      </div>
      {error?.error && <small className="p-error">{error?.message}</small>}
    </div>
  );
};

export default observer(FormField);
