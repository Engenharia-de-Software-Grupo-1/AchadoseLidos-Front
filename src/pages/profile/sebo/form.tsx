import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';
import { AddressFormField } from '@components/ProfileForm/addressFormField';
import { AddressNames } from '@domains/AddressNames';
import { useForm } from './useForm';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import UploadImages from '@components/UploadImages/uploadImages';
import { Button } from 'primereact/button';
import DialogModal from '@components/DialogModal/dialogModal';
import FormField from '@components/FormField/formField';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const ProfileSeboForm = () => {
  const { breadcrumbItems, handleEnderecoChange, sebo, setField, submitted, imageProfile } = useForm();

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
                <FormField label="Nome" attribute="nome" required editField>
                  <InputText
                    value={sebo.nome}
                    onChange={(e) => setField('nome', e.target.value)}
                    placeholder="Digite o nome do Sebo"
                  />
                </FormField>
                <FormField label="CPF/CNPJ" attribute="cpfCnpj" required editField short>
                  <InputText
                    value={sebo.cpfCnpj}
                    onChange={(e) => setField('cpfCnpj', e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </FormField>
                <FormField label="Biografia curta" attribute="biografia" editField>
                  <InputTextarea
                    style={{ height: 'auto' }}
                    value={sebo.biografia}
                    onChange={(e) => setField('biografia', e.target.value)}
                    placeholder="Escreva uma breve biografia sobre o Sebo"
                    rows={5}
                    cols={30}
                  />
                </FormField>
                <FormField label="Nome dos Curadores" attribute="curadores" editField>
                  <InputTextarea
                    style={{ height: 'auto' }}
                    value={sebo.curadores}
                    onChange={(e) => setField('curadores', e.target.value)}
                    placeholder="Digite o nome dos curadores(separados por vírgula)"
                    rows={5}
                    cols={30}
                  />
                </FormField>
                <FormField label="Horário de Funcionamento" attribute="horarioFuncionamento" required editField>
                  <InputText
                    value={sebo.horarioFuncionamento}
                    onChange={(e) => setField('horarioFuncionamento', e.target.value)}
                    placeholder="Horário de Funcionamento"
                  />
                </FormField>
              </div>

              <div className="fields-column">
                <FormField label="CEP" attribute="cep" editField required adress>
                  <InputText
                    value={sebo.endereco.cep}
                    onChange={(e) => setField('endereco.cep', e.target.value)}
                    placeholder="00000-000"
                  />
                </FormField>
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
                <FormField label="Rua" attribute="rua" editField required adress>
                  <InputText
                    value={sebo.endereco.rua}
                    onChange={(e) => setField('endereco.rua', e.target.value)}
                    placeholder='Rua "Nome da Rua"'
                  />
                </FormField>
                <FormField label="Bairro" attribute="bairro" editField required adress>
                  <InputText
                    value={sebo.endereco.bairro}
                    onChange={(e) => setField('endereco.bairro', e.target.value)}
                    placeholder="Bairro"
                  />
                </FormField>
                <FormField label="Número" attribute="numero" editField required adress>
                  <InputText
                    value={sebo.endereco.numero}
                    onChange={(e) => setField('endereco.numero', e.target.value)}
                    placeholder="Número"
                  />
                </FormField>
                <FormField label="Complemento" attribute="complemento" editField adress>
                  <InputText
                    value={sebo.endereco.complemento}
                    onChange={(e) => setField('endereco.complemento', e.target.value)}
                    placeholder="Complemento"
                  />
                </FormField>
                <div className='checkbox-adress'>
                  <Checkbox className="mr-2" onChange={(e) => setChecked(e.checked ?? false)} checked={checked} />
                  <span className="span-checkbox">Este endereço é público?</span>
                </div>
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
                <FormField label="Whatsapp" attribute="telefone" required={!checked} editField short>
                  <InputText
                    value={sebo.telefone}
                    onChange={(e) => setField('telefone', e.target.value)}
                    placeholder="Whatsapp"
                  />
                </FormField>
                <FormField label="Instagram" attribute="instagram" editField short>
                  <InputText
                    value={sebo.instagram}
                    onChange={(e) => setField('instagram', e.target.value)}
                    placeholder="Instagram"
                  />
                </FormField>
                <FormField label="Estante Virtual" attribute="estanteVirtual" editField short>
                  <InputText
                    value={sebo.estanteVirtual}
                    onChange={(e) => setField('estanteVirtual', e.target.value)}
                    placeholder="Estante Virtual"
                  />
                </FormField>
                <FormField label="Mercado Livre" attribute="mercadoLivre" editField short>
                  <InputText
                    value={sebo.mercadoLivre}
                    onChange={(e) => setField('mercadoLivre', e.target.value)}
                    placeholder="Mercado Livre"
                  />
                </FormField>
                <FormField label="Enjoei" attribute="enjoei" editField short>
                  <InputText
                    value={sebo.enjoei}
                    onChange={(e) => setField('enjoei', e.target.value)}
                    placeholder="Enjoei"
                  />
                </FormField>
                <FormField label="Amazon" attribute="amazon" editField short>
                  <InputText
                    value={sebo.amazon}
                    onChange={(e) => setField('amazon', e.target.value)}
                    placeholder="Amazon"
                  />
                </FormField>
              </div>
            </div>

            <div className="container-historia-sebo">
              <FormField label="História (longo)" attribute="historia" editField>
                <InputTextarea
                  style={{ height: 'auto' }}
                  value={sebo.historia}
                  onChange={(e) => setField('historia', e.target.value)}
                  placeholder="Conte sua história"
                  rows={5}
                  cols={30}
                />
              </FormField>
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
