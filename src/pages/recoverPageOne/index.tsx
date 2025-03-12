import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';

import './style.css';
import CustomButton from '@components/CustomButton/custom-button';

interface RecoverPageOneProps {
  children: React.ReactNode;
  simpleHeader: boolean;
}

const RecoverPageOne = () => {
  return (
    <div className="main-recover-one">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="background">
          <div className="container">
            <h1>Recuperar Senha</h1>
            <div className="fields">
              <p>Digite o e-mail relacionado à sua conta.<br/>
              Você receberá um email com um link de recuperação.</p>
              <InputText placeholder="E-mail"/>
            </div>
            <CustomButton label="Enviar e-mail de recuperação"/>
            <div className="footer">
              <p><a>Voltar</a></p>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default RecoverPageOne;