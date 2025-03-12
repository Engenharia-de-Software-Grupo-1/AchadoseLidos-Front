import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';
import CustomButton from '@components/CustomButton/custom-button';
import { Password } from 'primereact/password';
import './style.css';

import { redirect } from 'react-router-dom';
import FormField from '@components/FormField/formField';
import { useState } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { Button } from 'primereact/button';
import { useErrorContext } from '@contexts/errorContext';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {

  const [credenciais, setCredenciais] = useState({
    email: "",
    senha: "",
  });

  const { showNotification } = useNotification();
  const { setErrors, setError } = useErrorContext();
  

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCredenciais((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (credenciais: { email: any; senha: any; }) => {

    console.log("Logging in with:", { email:credenciais.email, senha:credenciais.senha });
    
    if (
      credenciais.email === "user@example.com" &&
      credenciais.senha === "password123"
    ) {
      showNotification('success', null, 'Logged in');
    } else {
      showNotification('error', null, 'Email ou Senha inválidos');
    }
  };
  

  return (
    <div className="main-login" >
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="container-login">
          <div className="card-login">
            <h1>Já possui uma conta?</h1>
            <div className="fields">

              <FormField attribute="conta.email">
                <InputText
                  name="email"
                  value={credenciais.email}
                  onChange={handleInputChange}
                  placeholder="E-mail *"
                  required
                />
              </FormField>
    
              <FormField attribute="senha">
                <InputText
                  name="senha"
                  value={credenciais.senha}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Senha *"
                  required
                />
              </FormField>
            </div>
            <Button label="Entrar" className="button" type="submit" onClick={() => handleSubmit(credenciais)}/>
            <div className="footer">
              <p>Não possui uma conta? <a href="/register">Cadastre-se</a></p>
              <p>Esqueceu sua senha? <a href="/recoverone">Recuperar senha</a></p>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default LoginPage;