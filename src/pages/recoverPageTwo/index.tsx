import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';

import './style.css';
import { Password } from 'primereact/password';
import CustomButton from '@components/CustomButton/custom-button';

interface RecoverPageTwoProps {
  children: React.ReactNode;
  simpleHeader: boolean;
}

const RecoverPageTwo = () => {
  return (
    <TemplatePage simpleHeader={true}>
      <div className="background">
        <div className="container">
          <h1>Recuperar Senha</h1>
          <div className="fields">
            <Password placeholder="Senha" toggleMask />
            <Password placeholder="Confirmar Senha" />
          </div>
          <CustomButton label="Atualizar Senha"/>
          <div className="footer">
          </div>
        </div>
      </div>
    </TemplatePage>
  );
};

export default RecoverPageTwo;