import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { CategoriaProduto, EstadoConservacaoProduto } from 'constants/ProdutoConstants';

interface BasicDemoProps {
  type: typeof CategoriaProduto | typeof EstadoConservacaoProduto | readonly string[];
  placeholder: string;
  className: string;
  gender?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}

export default function BasicDemo({ type, className, placeholder, onChange, disabled }: BasicDemoProps) {
  const [selectedValues, setSelectedValues] = useState('');
  const fieldOptions = Object.keys(type).map((key) => ({
    label: key,
    value: type[key as keyof typeof type],
  }));

  return (
    <div className={className}>
      <MultiSelect
        value={selectedValues}
        onChange={onChange ? onChange : (e) => setSelectedValues(e.value)}
        options={fieldOptions}
        optionLabel="label"
        placeholder={placeholder}
        maxSelectedLabels={6}
        className="w-full md:w-20rem"
        disabled={disabled}
      />
    </div>
  );
}
