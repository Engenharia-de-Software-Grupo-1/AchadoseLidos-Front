import { Button } from 'primereact/button';
import './style.css';

interface CustomButtonProps {
    label: string;
}

export default function CustomButton({ label }: CustomButtonProps) {
  return (
    <Button className="CustomButton" label={label}/>
);
};