import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/ALBreadCrumb';
import { useBreadcrumb } from '@hooks/useBreadcrumb';
import ProfilePhoto from '@components/ProfilePhoto';
import { useProfileSeboForm } from '@stores/profile/sebo/formStore';
import { ProfileFormField } from '@components/ProfileForm/ProfileFormField';
import { FieldNames } from '@domains/FieldNames';
import { IconField } from 'primereact/iconfield';
import { AddressFormField } from '@components/ProfileForm/AddressFormField';
import { AddressNames } from '@domains/AddressNames';
import { useForm } from './useForm';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import UploadImages from '@components/UploadImages';
import { Button } from 'primereact/button';

const ProfileSeboForm = () => {
  const {
    breadcrumbItems,
    cities,
    getRule,
    endereco,
    handleEnderecoChange,
    sebo,
    setField,
    setSubmitted,
    submitted,
    validateStep,
    imageProfile,
  } = useForm();


  const [alterPassword, setAlterPassword] = useState(false);

  const handleAlterPassword = () => {
    setAlterPassword(!alterPassword);
  }

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
              </div>

              <div className="fields-column">
                <AddressFormField
                  labelText="CEP"
                  fieldName={AddressNames.cep}
                  fieldValue={sebo.endereco.cep}
                  hasSubmissionFailed={submitted}
                  placeholderText="00000-000"
                  setField={handleEnderecoChange}
                />
                <AddressFormField
                  labelText="Estado"
                  fieldName={AddressNames.estado}
                  fieldValue={sebo.endereco.estado}
                  hasSubmissionFailed={submitted}
                  placeholderText="Estado"
                  setField={handleEnderecoChange}
                />
                <AddressFormField
                  labelText="Cidade"
                  fieldName={AddressNames.cidade}
                  fieldValue={sebo.endereco.cidade}
                  hasSubmissionFailed={submitted}
                  placeholderText="Cidade"
                  setField={handleEnderecoChange}
                />
                <AddressFormField
                  labelText="Rua"
                  fieldName={AddressNames.rua}
                  fieldValue={sebo.endereco.rua}
                  hasSubmissionFailed={submitted}
                  placeholderText='Rua "Nome da Rua"'
                  setField={handleEnderecoChange}
                />
                <AddressFormField
                  labelText="Bairro"
                  fieldName={AddressNames.bairro}
                  fieldValue={sebo.endereco.bairro}
                  hasSubmissionFailed={submitted}
                  placeholderText="Bairro"
                  setField={handleEnderecoChange}
                />
                <AddressFormField
                  labelText="Número"
                  fieldName={AddressNames.numero}
                  fieldValue={sebo.endereco.numero}
                  hasSubmissionFailed={submitted}
                  placeholderText="Número"
                  setField={handleEnderecoChange}
                />
                <AddressFormField
                  labelText="Complemento"
                  fieldName={AddressNames.complemento}
                  fieldValue={sebo.endereco.complemento}
                  hasSubmissionFailed={submitted}
                  placeholderText="Complemento"
                  setField={handleEnderecoChange}
                  isOptional
                />
                // Ainda falta adicionar o checkbox para o campo ehPublico
              </div>
            </div>

            <div className='container-upload'>
              <UploadImages />
            </div>

            <div className='container-historia-sebo'>
              <ProfileFormField
                labelText="História (longo)"
                fieldName={FieldNames.historia}
                fieldValue={sebo.historia}
                setField={setField}
                hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                placeholderText="Conte sua história" // também falta adicionar as rules que Eliane criou, se elas forem necessárias aqui especificamente
                isTextArea
                isOptional
              />
            </div>

            <div className='container-buttons'>
              <Button label="Excluir Conta" className='button-trash' />
              <Button label="Salvar" className='button-save' />
            </div>

          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProfileSeboForm;

