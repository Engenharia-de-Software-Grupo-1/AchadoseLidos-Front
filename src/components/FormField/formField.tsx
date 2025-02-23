import { cloneElement } from 'react';
import { observer } from 'mobx-react';

interface FormFieldProps {
  label?: string;
  attribute: string;
  rule?: any;
  submitted?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  attribute,
  rule,
  submitted = false,
  children,
}) => {
  const validateField = () => {
    return rule?.error && submitted ? { className: 'p-invalid p-error' } : {};
  };

  const getFieldErrorMessage = () => {
    if (rule?.error && submitted) {
      return <small className="p-error">{rule.message}</small>;
    }
    return <small>&nbsp;</small>;
  };

  const childProps = { id: attribute, rules: rule, ...validateField()};

  return (
    <div className="field">
      <label {...validateField()} htmlFor={attribute}>
        {label}
        {rule?.rules?.some((r: any) => r.rule === 'required') && <span className="p-error"> *</span>}
      </label>
      {cloneElement(children as React.ReactElement, childProps)}
      {getFieldErrorMessage()}
    </div>
  );
};

export default observer(FormField);
