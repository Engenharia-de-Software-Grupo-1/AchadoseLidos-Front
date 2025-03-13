import { useState } from 'react';
import TemplatePage from '@pages/templatePage';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import TabDadosBasicos from './tabs/tabDadosBasicos';
import TabDadosPerfil from './tabs/tabPerfil';
import { useRegisterUser } from '@stores/register/user/store';
import { useNotification } from '@contexts/notificationContext';

import './style.css';

const RegisterUser = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { user, setField, validateStep} = useRegisterUser();
    const [submitted, setSubmitted] = useState(false);
    const { showNotification } = useNotification();

    const nextStep = (e: any) => {
        if (validateStep(activeIndex)) {
          setSubmitted(true);
          setActiveIndex(activeIndex + 1);
        } else {
          showNotification('error', null, 'Verifique os campos do formulário!');
        }
        setSubmitted(false);
      };

      const stepBack = (e: any) => {
        setActiveIndex(activeIndex - 1);
      };

      const stepsItems = [
        {
          label: 'Dados Básicos',
          component: <TabDadosBasicos user={user} setField={setField} />,
        },
        {
          label: 'Dados do Perfil',
          component: <TabDadosPerfil user={user} setField={setField} />,
        },
      ];

      return (
        <div className="main-register-user">
          <TemplatePage simpleHeader simpleFooter contents>
            <div className="container-register-user">
              <div className="card">
                <p className="tittle-register">Cadastro de Usuário</p>
                <div className="steps-content">{stepsItems[activeIndex].component}</div>
                <Steps
                  model={stepsItems.map((step, index) => ({
                    label: step.label,
                    command: () => setActiveIndex(index),
                  }))}
                  activeIndex={activeIndex}
                  readOnly
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {activeIndex !== 0 && <Button className="step-button" label="Voltar" onClick={(e) => stepBack(e)} />}
                  <Button className="step-button" label="Continuar" onClick={(e) => nextStep(e)} />
                </div>
                <p className="login" style={{ color: '#2F292A', textAlign: 'center' }}>
                  Já tem uma conta? Entrar
                </p>
              </div>
            </div>
          </TemplatePage>
        </div>
      );
    };
    
    export default RegisterUser;