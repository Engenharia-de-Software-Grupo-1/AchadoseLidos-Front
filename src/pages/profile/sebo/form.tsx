import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';
import { Checkbox } from 'primereact/checkbox';
import { useEffect, useState } from 'react';
import UploadImages from '@components/UploadImages/uploadImages';
import { Button } from 'primereact/button';
import DialogModal from '@components/DialogModal/dialogModal';
import FormField from '@components/FormField/formField';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useProfileSeboForm } from '@stores/profile/sebo/formStore';
import { useAuth } from '@contexts/authContext';
import { useNotification } from '@contexts/notificationContext';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

const ProfileSeboForm = () => {
  const { sebo, setField, cities, validate, initialize, loading, updateSebo, deleteSebo } = useProfileSeboForm();
  const { showNotification } = useNotification();
  const { conta, handleLogout } = useAuth();
  const [visible, setVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: 'Meu Perfil', url: '/profile/sebo' },
    { label: 'Editar Sebo', url: '/profile/sebo/edit' },
  ];

  useEffect(() => {
    if (conta?.sebo?.id) {
      initialize(conta.sebo.id);
    }
  }, [conta?.sebo?.id]);

  const finalizeUpdate = async () => {
    if (validate()) {
      updateSebo(() => {
        navigate('/');
        showNotification('success', null, 'Sebo atualizado com sucesso!');
      });
    } else {
      showNotification('error', null, 'Preencha todos os campos obrigatórios!');
    }
  };

  const deleteContaSebo = () => {
    deleteSebo(() => {
      setVisible(false);
      handleLogout();
      showNotification('success', null, 'Sebo excluído com sucesso!');
    });
  };

  return (
    <div className="container-main-edit-sebo">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} />

        {loading ? (
          <div className="loading-spinner">
            <i className="pi pi-spinner mr-2" />
          </div>
        ) : (
          <div className="container-edit-sebo">
            <div className="form-edit-sebo">
              <ProfilePhoto imageProfile={sebo?.fotoPerfil} canUpload setField={setField} />

              <div className="container-data-form">
                <div className="fields-column">
                  <FormField label="Nome" attribute="nome" required editField>
                    <InputText
                      value={sebo?.nome}
                      onChange={(e) => setField('nome', e.target.value)}
                      placeholder="Digite o nome do Sebo"
                    />
                  </FormField>
                  <FormField label="CPF/CNPJ" attribute="cpfCnpj" required editField short>
                    <InputText
                      value={sebo?.cpfCnpj}
                      onChange={(e) => setField('cpfCnpj', e.target.value)}
                      placeholder="000.000.000-00"
                    />
                  </FormField>
                  <FormField label="Biografia curta" attribute="biografia" editField>
                    <InputTextarea
                      style={{ height: 'auto' }}
                      value={sebo?.biografia}
                      onChange={(e) => setField('biografia', e.target.value)}
                      placeholder="Escreva uma breve biografia sobre o Sebo"
                      rows={5}
                      cols={30}
                    />
                  </FormField>
                  <FormField label="Nome dos Curadores" attribute="curadores" editField>
                    <InputTextarea
                      style={{ height: 'auto' }}
                      value={sebo?.curadores}
                      onChange={(e) => setField('curadores', e.target.value)}
                      placeholder="Digite o nome dos curadores(separados por vírgula)"
                      rows={5}
                      cols={30}
                    />
                  </FormField>
                  <FormField label="Horário de Funcionamento" attribute="horarioFuncionamento" editField>
                    <InputText
                      value={sebo?.horarioFuncionamento}
                      onChange={(e) => setField('horarioFuncionamento', e.target.value)}
                      placeholder="Horário de Funcionamento"
                    />
                  </FormField>
                </div>

                <div className="fields-column">
                  <FormField label="CEP" attribute="cep" editField required adress>
                    <InputText
                      value={sebo?.endereco.cep}
                      onChange={(e) => setField('endereco.cep', e.target.value)}
                      placeholder="00000-000"
                    />
                  </FormField>

                  <FormField label="Estado" attribute="estado" editField required adress>
                    <InputText value="Paraíba" disabled placeholder="Estado *" style={{ width: '400px' }} />
                  </FormField>

                  <FormField label="Cidade" attribute="cidade" editField required adress>
                    <Dropdown
                      value={sebo?.endereco.cidade}
                      onChange={(e) => setField('endereco.cidade', e.target.value)}
                      options={cities}
                      optionLabel="text"
                      optionValue="value"
                      showClear
                      placeholder="Cidade *"
                      style={{ width: '400px' }}
                    />
                  </FormField>
                  <FormField label="Rua" attribute="rua" editField required adress>
                    <InputText
                      value={sebo?.endereco.rua}
                      onChange={(e) => setField('endereco.rua', e.target.value)}
                      placeholder='Rua "Nome da Rua"'
                    />
                  </FormField>
                  <FormField label="Bairro" attribute="bairro" editField required adress>
                    <InputText
                      value={sebo?.endereco.bairro}
                      onChange={(e) => setField('endereco.bairro', e.target.value)}
                      placeholder="Bairro"
                    />
                  </FormField>
                  <FormField label="Número" attribute="numero" editField required adress>
                    <InputText
                      value={sebo?.endereco.numero}
                      onChange={(e) => setField('endereco.numero', e.target.value)}
                      placeholder="Número"
                    />
                  </FormField>
                  <FormField label="Complemento" attribute="complemento" editField adress>
                    <InputText
                      value={sebo?.endereco.complemento}
                      onChange={(e) => setField('endereco.complemento', e.target.value)}
                      placeholder="Complemento"
                    />
                  </FormField>
                  <div className="checkbox-adress">
                    <Checkbox
                      className="mr-2"
                      onChange={(e) => setField('endereco.ehPublico', e.checked)}
                      checked={sebo?.endereco.ehPublico}
                    />
                    <span className="span-checkbox">Este endereço é público?</span>
                  </div>
                </div>
              </div>

              <div className="container-upload">
                <UploadImages />
              </div>

              <div className="container-contat-edit-sebo">
                <div>
                  <Checkbox
                    className="mr-2"
                    onChange={(e) => setField('concordaVender', e.checked)}
                    checked={sebo?.concordaVender}
                  />
                  <span className="span-checkbox">Você concorda em vender produtos via plataforma?</span>
                </div>

                <div className="form-contat-sebo">
                  <FormField label="Whatsapp" attribute="telefone" required={sebo?.concordaVender} editField short>
                    <InputText
                      value={sebo?.telefone}
                      onChange={(e) => setField('telefone', e.target.value)}
                      placeholder="Whatsapp"
                    />
                  </FormField>
                  <FormField label="Instagram" attribute="instagram" editField short>
                    <InputText
                      value={sebo?.instagram}
                      onChange={(e) => setField('instagram', e.target.value)}
                      placeholder="Instagram"
                    />
                  </FormField>
                  <FormField label="Estante Virtual" attribute="estanteVirtual" editField short>
                    <InputText
                      value={sebo?.estanteVirtual}
                      onChange={(e) => setField('estanteVirtual', e.target.value)}
                      placeholder="Estante Virtual"
                    />
                  </FormField>
                  <FormField label="Mercado Livre" attribute="mercadoLivre" editField short>
                    <InputText
                      value={sebo?.mercadoLivre}
                      onChange={(e) => setField('mercadoLivre', e.target.value)}
                      placeholder="Mercado Livre"
                    />
                  </FormField>
                  <FormField label="Enjoei" attribute="enjoei" editField short>
                    <InputText
                      value={sebo?.enjoei}
                      onChange={(e) => setField('enjoei', e.target.value)}
                      placeholder="Enjoei"
                    />
                  </FormField>
                  <FormField label="Amazon" attribute="amazon" editField short>
                    <InputText
                      value={sebo?.amazon}
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
                    value={sebo?.historia}
                    onChange={(e) => setField('historia', e.target.value)}
                    placeholder="Conte sua história"
                    rows={5}
                    cols={30}
                  />
                </FormField>
              </div>

              <div className="container-buttons">
                <Button label="Excluir Conta" className="button-trash" onClick={() => setVisible(true)} />
                {visible && (
                  <DialogModal
                    visibleDialog={visible}
                    setVisibleDialog={setVisible}
                    onClickDelete={deleteContaSebo}
                    mensage='Você tem certeza que deseja excluir sua conta? Todos os seus dados serão apagados.'
                  ></DialogModal>
                )}
                <Button label="Salvar" className="button-save" type="submit" onClick={() => finalizeUpdate()} />
              </div>
            </div>
          </div>
        )}
      </TemplatePage>
    </div>
  );
};

export default ProfileSeboForm;
