import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/ALBreadCrumb';
import { useBreadcrumb } from '@hooks/useBreadcrumb';
import ProfilePhoto from '@components/ProfilePhoto';
import { useProfileSeboForm } from '@stores/profile/sebo/formStore';
import { useState } from 'react';
import { ProfileFormField } from '@components/ProfileForm/ProfileFormField';
import { FieldNames } from '@domains/FieldNames';
import { IconField } from 'primereact/iconfield';

const ProfileSeboForm = () => {
  const { sebo, setField, validateStep, getRule, cities } = useProfileSeboForm();
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbItems = [
    { label: 'Meu Perfil', url: '/profile/sebo' },
    { label: 'Editar Sebo', url: '/profile/sebo/edit' },
  ];

  const imageProfile = '/images/anarita.JPG';
  return (
    <div className="container-main-edit-sebo">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems}></ALBreadCrumb>

        <div className="container-edit-sebo">
          <div className="form-edit-sebo">
            <ProfilePhoto imageProfile={imageProfile} canUpload />

            <div className="container-data-form">
              <div className="fields-column">
                <ProfileFormField
                  labelText="Nome"
                  fieldName={FieldNames.nome}
                  fieldValue={sebo.nome}
                  setField={setField}
                  hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                  placeholderText="Nome do Sebo" // também falta adicionar as rules que Eliane criou, se elas forem necessárias aqui especificamente
                />

                <ProfileFormField
                  labelText="CPF/CNPJ"
                  fieldName={FieldNames.cpfCnpj}
                  fieldValue={sebo.cpfCnpj}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="000.000.000-00"
                  isShortInput
                />

                <ProfileFormField
                  labelText="Biografia curta"
                  fieldName={FieldNames.briefBio}
                  fieldValue={sebo.biografia}
                  hasSubmissionFailed={submitted}
                  setField={setField}
                  iconName="info-circle"
                  placeholderText="Escreva uma breve biografia sobre o Sebo"
                  isTextArea
                  isOptional
                />

                <ProfileFormField
                  labelText="Nome dos Curadores (separados por vírgula)"
                  fieldName={FieldNames.curadores}
                  fieldValue={sebo.curadores}
                  hasSubmissionFailed={submitted}
                  setField={setField}
                  placeholderText="Fulaninha, Fulaninho"
                  isTextArea
                  isOptional
                />

                <button className="change-password-button">
                  <IconField className="label-icon">
                    <i className={'pi pi-pencil'} />
                  </IconField>

                  <text className="change-password-text">Alterar senha</text>
                </button>
              </div>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProfileSeboForm;
