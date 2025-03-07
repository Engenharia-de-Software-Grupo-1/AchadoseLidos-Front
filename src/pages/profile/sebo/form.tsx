import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/ALBreadCrumb';
import { useBreadcrumb } from '@hooks/useBreadcrumb';
import ProfilePhoto from '@components/ProfilePhoto';
import FormField from '@components/FormField/formField';
import { InputText } from 'primereact/inputtext';
import { useProfileSeboForm } from '@stores/profile/sebo/formStore';
import { useState } from 'react';

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
              <FormField attribute="nome" label="Nome" rule={getRule('nome')} submitted={submitted}>
                <InputText
                  value={sebo.nome}
                  onChange={(e) => setField('nome', e.target.value)}
                  placeholder="Nome do Sebo *"
                />
              </FormField>

              <FormField attribute="cpfCnpj" rule={getRule('cpfCnpj')} submitted={submitted}>
                <InputText
                  value={sebo.cpfCnpj}
                  onChange={(e) => setField('cpfCnpj', e.target.value)}
                  placeholder="CPF ou CNPJ *"
                />
              </FormField>

              <FormField attribute="email" rule={getRule('email')} submitted={submitted}>
                <InputText
                  value={sebo.conta.email}
                  onChange={(e) => setField('conta', { ...sebo.conta, email: e.target.value })}
                  placeholder="E-mail *"
                />
              </FormField>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProfileSeboForm;
