import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';
import './style.css';

import FormField from '@components/FormField/formField';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useErrorContext } from '@contexts/errorContext';
import { useLogin } from '@stores/login/loginStore';
import { login } from 'routes/routesLogin';
import { LoginResponse } from '@domains/LoginResponse';
import { useNotification } from '@contexts/notificationContext';

const LoginPage = () => {
  const { credenciais, setField, validate } = useLogin();
  const { setErrors, setError } = useErrorContext();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const finalizeLogin = async () => {
    if (validate()) {
      try {
        const response = await login(credenciais);

        if (!response.ok) {
          showNotification('error', 'Erro ao realizar login:', response.message);
          setError('email', { error: true, message: '' });
          setError('senha', { error: true, message: 'Email ou senha inválidos' });
        } else {
          const data: LoginResponse = await response.json();
          localStorage.setItem('token', data.token);
          navigate('/');
        }
      } catch (error) {
        showNotification('error', 'Erro ao realizar login', '');
      }
    }
  };

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
            <Button label="Entrar" className="button" type="submit" onClick={finalizeLogin} />
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
