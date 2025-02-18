import { InputText } from "primereact/inputtext";
import * as React from "react";
import './style.css';

interface InputTextComponentProps {
    placeholder: string;
}

const InputTextComponent: React.FC<InputTextComponentProps> = ({ placeholder }) => {

    const [value, setValue] = React.useState<string>('');
    
    return (
        <div className="card flex">
            <InputText
                className="input-text-register"
                value={value}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
        </div>
    )
}

export default InputTextComponent;