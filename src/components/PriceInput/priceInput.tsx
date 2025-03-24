import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';

const PriceInput: React.FC = () => {
  const [value, setValue] = useState<number | null>(0);

  return (
    <div>
      <InputNumber
        value={value}
        onValueChange={(e) => setValue(e.value ?? 0)}
        mode="currency"
        currency="BRL"
        locale="pt-BR"
        style={{ width: '140px' }}
        inputStyle={{ width: '100%' }}
      />
    </div>
  );
};

export default PriceInput;
