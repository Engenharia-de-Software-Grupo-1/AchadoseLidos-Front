import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';
import { ProfileFormField } from '@components/ProfileForm/profileFormField';
import { FieldNames } from '@domains/FieldNames';
import { AddressFormField } from '@components/ProfileForm/addressFormField';
import { AddressNames } from '@domains/AddressNames';
import { useForm } from './useForm';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import UploadImages from '@components/UploadImages/uploadImages';
import { Button } from 'primereact/button';
import DialogModal from '@components/DialogModal/dialogModal';

const ProfileSeboForm = () => {
  const {
    breadcrumbItems,
    handleEnderecoChange,
    sebo,
    setField,
    submitted,
    imageProfile,
  } = useForm();

  const [checked, setChecked] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="container-main-edit-sebo">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} />

        <div className="container-edit-sebo">
          <div className="form-edit-sebo">
            <ProfilePhoto imageProfile={imageProfile} canUpload setField={setField} />

            <div className="container-data-form">
              <div className="fields-column">
                <ProfileFormField
                  labelText="Nome"
                  fieldName={FieldNames.nome}
                  fieldValue={sebo.nome}
                  setField={setField}
                  hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                  placeholderText="Digite o nome do Sebo" // também falta adicionar as rules que Eliane criou, se elas forem necessárias aqui especificamente
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
                  placeholderText="Digite o nome dos curadores"
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
                // Ainda falta adicionar o checkbox para o campo ehPublico e horario func
              </div>
            </div>

            <div className="container-upload">
              <UploadImages />
            </div>

            <div className="container-contat-edit-sebo">
              <div>
                <Checkbox className="mr-2" onChange={(e) => setChecked(e.checked ?? false)} checked={checked} />
                <span className="span-checkbox">Você concorda em vender produtos via plataforma?</span>
              </div>

              <div className="form-contat-sebo">
                <ProfileFormField
                  labelText="Whatsapp"
                  fieldName={FieldNames.telefone}
                  fieldValue={sebo.telefone}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="Whatsapp"
                  isOptional={!checked}
                  isShortInput
                />
                <ProfileFormField
                  labelText="Instagram"
                  fieldName={FieldNames.instagram}
                  fieldValue={sebo.instagram}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="Instagram"
                  isOptional
                  isShortInput
                />
                <ProfileFormField
                  labelText="Estante Virtual"
                  fieldName={FieldNames.estanteVirtual}
                  fieldValue={sebo.estanteVirtual}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="Estante Virtual"
                  isOptional
                  isShortInput
                />
                <ProfileFormField
                  labelText="Mercado Livre"
                  fieldName={FieldNames.mercadoLivre}
                  fieldValue={sebo.mercadoLivre}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="Mercado Livre"
                  isOptional
                  isShortInput
                />
                <ProfileFormField
                  labelText="Enjoei"
                  fieldName={FieldNames.enjoei}
                  fieldValue={sebo.enjoei}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="Enjoei"
                  isOptional
                  isShortInput
                />
                <ProfileFormField
                  labelText="Amazon"
                  fieldName={FieldNames.amazon}
                  fieldValue={sebo.amazon}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="Amazon"
                  isOptional
                  isShortInput
                />
              </div>
            </div>

            <div className="container-historia-sebo">
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

            <div className="container-buttons">
              <Button label="Excluir Conta" className="button-trash" onClick={() => setVisible(true)} />
              {visible && <DialogModal visibleDialog={visible} setVisibleDialog={setVisible}></DialogModal>}

              <Button label="Salvar" className="button-save" />
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProfileSeboForm;
