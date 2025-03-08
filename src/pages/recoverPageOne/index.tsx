import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


import './style.css';
import { redirect } from 'react-router-dom';

interface RecoverPageOneProps {
  children: React.ReactNode;
  simpleHeader: boolean;
}

const RecoverPageOne = () => {
  return (
    <TemplatePage simpleHeader={true}>
      <div className="background">
        <div className="container">
          <h1>Recuperar Senha</h1>
          <div className="fields">
            <p>Digite o e-mail relacionado à sua conta.<br/>
            Você receberá um email com um link de recuperação.</p>
            <InputText placeholder="E-mail"/>
          </div>
          <Button className="submit" label="Enviar e-mail de recuperação"/>
          <div className="footer">
            <p><a>Voltar</a></p>
          </div>
        </div>
      </div>
    </TemplatePage>
  );
};

export default RecoverPageOne;