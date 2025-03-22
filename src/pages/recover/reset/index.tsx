import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';

import './style.css';
import FormField from '@components/FormField/formField';
import { useNotification } from '@contexts/notificationContext';
import { Button } from 'primereact/button';
import { useResetRequest } from '@stores/recover/resetRequest';
import { atualizar_senha } from 'routes/routesRecover';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const ResetRequestPage = () => {
  const { showNotification } = useNotification();
  const { credenciais, setField, validate } = useResetRequest();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [token]);

  const finalizeResetRequest = async () => {
    if (validate()) {
      try {
        await setField('conta.token', token);
        const response = await atualizar_senha(credenciais.conta);

        if (response.status === 200) {
          showNotification('success', 'Senha atualizada com sucesso!', '');
          navigate('/login');
        }
      } catch (error) {
        if (error.response) {
          const errorData = error.response.data;

          if (errorData.errors && Array.isArray(errorData.errors)) {
            errorData.errors.forEach((err: { message: string }) => {
              showNotification('error', err.message, '');
            });
          } else {
            showNotification('error', errorData.mensagem || 'Erro no servidor.', '');
          }
        } else if (error.request) {
          showNotification('error', 'Sem resposta do servidor. Verifique sua conexão.', '');
        } else {
          showNotification('error', 'Algo deu errado. Tente novamente mais tarde.', '');
        }
      }
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
            <Button className="button" type="submit" label="Atualizar Senha" onClick={finalizeResetRequest} />
            <div className="footer"></div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ResetRequestPage;
