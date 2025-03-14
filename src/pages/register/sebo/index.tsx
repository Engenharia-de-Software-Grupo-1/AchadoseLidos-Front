import { useState } from 'react';
import TemplatePage from '@pages/templatePage';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import TabDadosBasicos from './tabs/tabDadosBasicos';
import TabEndereco from './tabs/tabEndereco';
import TabDadosPerfil from './tabs/tabPerfil';
import { useRegisterSebo } from '@stores/register/sebo/store';
import { useNotification } from '@contexts/notificationContext';
import { registerSebo } from '../../../routes/routesSebo';

import './style.css';

const RegisterSebo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { sebo, setField, validateStep, cities } = useRegisterSebo();
  const [submitted, setSubmitted] = useState(false);
  const { showNotification } = useNotification();

  const finalizeRegister = async () => {
    try {
      const response = await registerSebo(sebo);
      console.log(response);
      alert('Sebo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar sebo:', error);
    }
  };
  

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
      component: <TabDadosBasicos sebo={sebo} setField={setField} />,
    },
    {
      label: 'Endereço',
      component: <TabEndereco sebo={sebo} setField={setField} cities={cities} />,
    },
    {
      label: 'Dados do Perfil',
      component: <TabDadosPerfil sebo={sebo} setField={setField} />,
    },
  ];

  return (
    <div className="main-register-sebo">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="container-register-sebo">
          <div className="card">
            <p className="tittle-register">Cadastro de Sebo</p>
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
              {activeIndex !== 0 && activeIndex < 3 && 
              <Button className="step-button" label="Voltar" onClick={(e) => stepBack(e)} />}
              {activeIndex === 2 && (
                <Button className="step-button" label="Finalizar" onClick={finalizeRegister} />
              )}
              {activeIndex < 2 && (
              <Button className="step-button" label="Continuar" onClick={(e) => nextStep(e)} />
              )}

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

export default RegisterSebo;
