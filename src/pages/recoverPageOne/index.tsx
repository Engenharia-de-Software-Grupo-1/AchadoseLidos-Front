import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';

import './style.css';
import CustomButton from '@components/CustomButton/custom-button';
import { Button } from 'primereact/button';
import FormField from '@components/FormField/formField';
import { useState } from 'react';

interface RecoverPageOneProps {}

const RecoverPageOne = () => {

  const [credenciais, setCredenciais] = useState({
      email: ""
    });
  
    
  
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setCredenciais((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (credenciais: { email: any;}) => {
      console.log(credenciais.email)
    };

  return (
    <div className="main-recover-one">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="recover-container">
          <div className="card-recover">
            <h1>Recuperar Senha</h1>
            <div className="fields">
              <p>Digite o e-mail relacionado à sua conta.<br/>
              Você receberá um email com um link de recuperação.</p>
              <FormField attribute="conta.email">
                <InputText
                  name="email"
                  value={credenciais.email}
                  onChange={handleInputChange}
                  placeholder="E-mail *"
                  required
                />
              </FormField>
            </div>
            <Button className="button" type="submit" label="Enviar e-mail de recuperação" onClick={() => handleSubmit(credenciais)}/>
            <div className="footer">
              <p><a href="/login">Voltar</a></p>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default RecoverPageOne;