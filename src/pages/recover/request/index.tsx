import TemplatePage from '@pages/template';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import FormField from '@components/FormField/formField';
import { useRecoverRequest } from '@stores/recover/recoverStore';
import './style.css';

const RecoverRequestPage = () => {
  const { credenciais, setField, finalizeRecoverRequest } = useRecoverRequest();

  return (
    <div className="main-recover-one">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="recover-container">
          <div className="card-recover">
            <h1>Recuperar Senha</h1>
            <div className="fields">
              <p>
                Digite o e-mail relacionado à sua conta.
                <br />
                Você receberá um email com um link de recuperação.
              </p>
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
            <Button
              className="button"
              type="submit"
              label="Enviar e-mail de recuperação"
              onClick={() => finalizeRecoverRequest()}
            />
            <div className="footer">
              <p>
                <a href="/login">Voltar</a>
              </p>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default RecoverRequestPage;
