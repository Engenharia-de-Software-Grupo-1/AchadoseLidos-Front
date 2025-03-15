import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';

import './style.css';
import { Button } from 'primereact/button';
import FormField from '@components/FormField/formField';
import { useState } from 'react';
import { useRecoverRequest } from '@stores/recover/recoverRequest';
import { useErrorContext } from '@contexts/errorContext';
import { recuperar_senha } from 'routes/routesRecover';
import { useNotification } from '@contexts/notificationContext';

const RecoverRequestPage = () => {

  const { credenciais, setField, validate } = useRecoverRequest()
  const { setErrors, setError } = useErrorContext();
  const { showNotification } = useNotification();
  
    
  const finalizeRecoverRequest = async () => {
    if (validate()) {
      try {
        const response = await recuperar_senha(credenciais);
        
        if (!response.ok) {
          const errorData: Error = await response.json();
          showNotification("error", response.message, "")
        } else {
          showNotification("success", response.message, "")
        }
        
      } catch (error) {
        showNotification("error", 'Algo deu errado, tente novamente mais tarde.', "");
      }
    } else {
      setError("email", {error:true, message:"Por favor, preencha o campo."})
    }
  }

  return (
    <div className="main-recover-one">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="recover-container">
          <div className="card-recover">
            <h1>Recuperar Senha</h1>
            <div className="fields">
              <p>Digite o e-mail relacionado à sua conta.<br/>
              Você receberá um email com um link de recuperação.</p>
              <FormField attribute="email">
                <InputText
                  name="email"
                  value={credenciais.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="E-mail *"
                  required
                />
              </FormField>
            </div>
            <Button className="button" type="submit" label="Enviar e-mail de recuperação" onClick={finalizeRecoverRequest}/>
            <div className="footer">
              <p><a href="/login">Voltar</a></p>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default RecoverRequestPage;