import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';

interface BasicDemoProps {
  type: { [key: string]: string } | readonly string[];
  className: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}

export default function BasicDemo({ type, className, onChange, disabled }: BasicDemoProps) {
  const [selectedValues, setSelectedValues] = useState('');
  const fieldOptions = Array.isArray(type)
    ? type.map((item) => ({ label: item, value: item }))
    : Object.keys(type).map((key) => ({
        label: key,
        value: (type as { [key: string]: string })[key],
      }));

  return (
    <div className={className}>
      <MultiSelect
        value={selectedValues}
        onChange={onChange ? onChange : (e) => setSelectedValues(e.value)}
        options={fieldOptions}
        optionLabel="label"
        placeholder={'Selecione'}
        maxSelectedLabels={6}
        className="w-full md:w-20rem"
        disabled={disabled}
      />
    </div>
  );
}
