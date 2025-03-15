import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';

import './style.css';
import FormField from '@components/FormField/formField';
import { useNotification } from '@contexts/notificationContext';
import { Button } from 'primereact/button';
import { useResetRequest } from '@stores/recover/resetRequest';
import { useErrorContext } from '@contexts/errorContext';
import { atualizar_senha } from 'routes/routesRecover';
import { useNavigate, useParams } from 'react-router-dom';
import { contains } from 'cypress/types/jquery';

const ResetRequestPage = () => {

  const { showNotification } = useNotification();
  const { credenciais, setField } = useResetRequest()
  const { token } = useParams();
  const navigate = useNavigate();

    
  const finalizeResetRequest = async () => {
      try {
        setField("conta.token", token);
        const response = await atualizar_senha(credenciais.conta);
        showNotification("success", response.message, "")
        navigate('/login');
  
        if (!response.ok) {
          showNotification("error", response.message, "")
        }
  
      } catch (error) {
        showNotification("error", 'Erro ao atualizar senha', "");
      }
    };


  return (
    <div className="main-recover-two">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="recovertwo-container">
          <div className="card-recover">
            <h1>Recuperar Senha</h1>
            <div className="fields">
              <FormField attribute="senha">
                <InputText
                  name="senha"
                  value={credenciais.conta.senha}
                  onChange={(e) => setField('conta.senha', e.target.value)}
                  type="password"
                  placeholder="Nova Senha *"
                  required
                />
              </FormField>
    
              <FormField attribute="confirmaSenha">
                <InputText
                  name="confirma"
                  value={credenciais.confirmaSenha}
                  onChange={(e) => setField('confirmaSenha', e.target.value)}
                  type="password"
                  placeholder="Confirme a Senha *"
                  required
              />
              </FormField>
            </div>
            <Button className="button" type="submit" label="Atualizar Senha" onClick={finalizeResetRequest}/>
            <div className="footer">
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ResetRequestPage;