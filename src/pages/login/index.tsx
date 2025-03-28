import TemplatePage from '@pages/template';
import { InputText } from 'primereact/inputtext';
import FormField from '@components/FormField/formField';
import { Button } from 'primereact/button';
import { useLogin } from '@stores/login/loginStore';
import './style.css';

const LoginPage = () => {
  const { credenciais, setField, finalizeLogin } = useLogin();

  return (
    <div className="main-login">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="container-login">
          <div className="card-login">
            <h1>Já possui uma conta?</h1>
            <div className="fields">
              <FormField attribute="email">
                <InputText
                  name="email"
                  value={credenciais.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="E-mail *"
                  required
                />
              </FormField>

              <FormField attribute="senha">
                <InputText
                  name="senha"
                  value={credenciais.senha}
                  onChange={(e) => setField('senha', e.target.value)}
                  type="password"
                  placeholder="Senha *"
                  required
                />
              </FormField>
            </div>
            <Button label="Entrar" className="button" type="submit" onClick={() => finalizeLogin()} />
            <div className="footer">
              <p>
                Não possui uma conta? <a href="/register">Cadastre-se</a>
              </p>
              <p>
                Esqueceu sua senha? <a href="/recover/request">Recuperar senha</a>
              </p>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default LoginPage;
