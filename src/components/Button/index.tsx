import { Button } from 'primereact/button';
import './style.css';

interface buttonProps {
    label: string;
    type: string;
    onClick?: () => void;
}

const ButtonComponent = ({label, type, onClick}: buttonProps) => {
    return (
        <Button label={label} className={type} onClick={onClick}></Button>
    );
}

export default ButtonComponent;