import TemplatePage from '@pages/template';
import { InputText } from 'primereact/inputtext';
import FormField from '@components/FormField/formField';
import { Button } from 'primereact/button';
import { useResetRequest } from '@stores/recover/resetStore';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import './style.css';

const ResetRequestPage = () => {
  const { credenciais, setField, finalizeResetRequest } = useResetRequest();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [token]);

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
            <Button
              className="button"
              type="submit"
              label="Atualizar Senha"
              onClick={() => finalizeResetRequest(token)}
            />
            <div className="footer"></div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ResetRequestPage;
