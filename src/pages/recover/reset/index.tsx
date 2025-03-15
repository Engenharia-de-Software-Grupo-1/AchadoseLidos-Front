import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';

import './style.css';
import { Password } from 'primereact/password';
import CustomButton from '@components/CustomButton/custom-button';
import FormField from '@components/FormField/formField';
import { useState } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { Button } from 'primereact/button';

interface RecoverPageTwoProps {}

const RecoverPageTwo = () => {

  const [credenciais, setCredenciais] = useState({
      senha: "",
      confirma: "",
    });
  
    const { showNotification } = useNotification();

    
  
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setCredenciais((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (credenciais: { senha: any; confirma: any; }) => {
  
      
      if (credenciais.senha !== credenciais.confirma){
        showNotification('error', null, 'Senhas não Conferem');
      } else {
        showNotification('success', null, 'Senhas Conferem');
      }
    };

  return (
    <div className="main-recover-two">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="recovertwo-container">
          <div className="card-recover">
            <h1>Recuperar Senha</h1>
            <div className="fields">
              <FormField attribute="credenciais.senha">
                <InputText
                  name="senha"
                  value={credenciais.senha}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Nova Senha *"
                  required
                />
              </FormField>
    
              <FormField attribute="credenciais.confirma">
                <InputText
                  name="confirma"
                  value={credenciais.confirma}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Confirme a Senha *"
                  required
                />
              </FormField>
            </div>
            <Button className="button" type="submit" label="Atualizar Senha" onClick={() => handleSubmit(credenciais)}/>
            <div className="footer">
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default RecoverPageTwo;