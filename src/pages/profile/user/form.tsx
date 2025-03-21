import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';
import { ProfileFormFieldUser } from '@components/ProfileForm/ProfileFormFieldUser';
import { FieldNamesUser } from '@domains/FieldNames';
import { useFormUser } from './useForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DialogModal from '@components/DialogModal';
import { useAuth } from '@contexts/authContext';
import { deleteUser, getById, updateUser } from 'routes/routesUser';
import { useNotification } from '@contexts/notificationContext';
import { Button } from 'primereact/button';

const ProfileUserForm = () => {
  const { breadcrumbItems, setField, submitted, user } = useFormUser();
  const { conta,  auth_logout } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    setUser();
  }, [conta]);

  const setUser = async () => {
    try {
      if (conta?.usuario?.id !== undefined) {
        const usuario = await getById(conta.usuario.id);
        (Object.keys(usuario) as Array<keyof typeof usuario>).forEach((key) => {
          if (usuario[key] !== undefined) {
            setField(key as string, usuario[key]);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [visible, setVisible] = useState<boolean>(false);

  const updateDataUser = async () => {
    try {
      if (conta?.usuario?.id !== undefined) {
        await updateUser(user, conta.usuario.id);
        showNotification('success', 'Dados atualizados com sucesso!', '');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = async () => {
    try {
        if (conta?.usuario?.id !== undefined) {
            await deleteUser(conta.usuario.id);
            showNotification('success', 'Conta excluída com sucesso!', '');
            auth_logout();
            navigate('/');
        }
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <main className="container-profile-user-form">
      <TemplatePage simpleHeader={false} simpleFooter={true}>
        <section className="container-profile-user-form-edit">
          <ALBreadCrumb breadcrumbItems={breadcrumbItems} />

          <div className="container-image-form">
            <ProfilePhoto
              imageProfile={user.fotoPerfil || ''}
              canUpload
              setField={setField}
              userId={conta?.usuario?.id}
            />

            <ProfileFormFieldUser
              labelText="Biografia Curta"
              fieldName={FieldNamesUser.biografia}
              fieldValue={user.biografia}
              setField={setField}
              hasSubmissionFailed={submitted}
              placeholderText="biografia curta"
              isTextArea
              isOptional
              isShortInput
            />
          </div>

          <section className="container-form-user-data">
            <section className="container-section-form-user">
              <div className="content-form-user-data">
                <div className="form-user-content1">
                  <span className="span-form-user-data">Dados</span>
                  <ProfileFormFieldUser
                    labelText="Nome Completo"
                    fieldName={FieldNamesUser.nome}
                    fieldValue={user.nome}
                    setField={setField}
                    hasSubmissionFailed={submitted}
                    placeholderText="Nome Completo *"
                  />

                  <ProfileFormFieldUser
                    labelText="CPF"
                    fieldName={FieldNamesUser.cpf}
                    fieldValue={user.cpf}
                    setField={setField}
                    hasSubmissionFailed={submitted}
                    placeholderText="CPF *"
                  />

                  <ProfileFormFieldUser
                    labelText="Instagram"
                    fieldName={FieldNamesUser.instagram}
                    fieldValue={user.instagram}
                    setField={setField}
                    hasSubmissionFailed={submitted}
                    placeholderText="Instagram"
                    isOptional
                  />

                  <ProfileFormFieldUser
                    labelText="Twitter"
                    fieldName={FieldNamesUser.twitter}
                    fieldValue={user.twitter}
                    setField={setField}
                    hasSubmissionFailed={submitted}
                    placeholderText="Twitter"
                    isOptional
                  />

                  <Button label="Excluir Conta" className="button-trash" onClick={() => setVisible(true)} />
                  {visible && 
                    <DialogModal 
                    visibleDialog={visible} 
                    setVisibleDialog={setVisible}
                    onConfirm={deleteAccount} />}
                </div>

                <div className="form-user-content2">
                  <ProfileFormFieldUser
                    labelText="Telefone"
                    fieldName={FieldNamesUser.telefone}
                    fieldValue={user.telefone}
                    setField={setField}
                    hasSubmissionFailed={submitted}
                    placeholderText="Telefone *"
                  />
                  <ProfileFormFieldUser
                    labelText="Goodreads"
                    fieldName={FieldNamesUser.goodreads}
                    fieldValue={user.goodreads}
                    setField={setField}
                    hasSubmissionFailed={submitted}
                    placeholderText="gooddreads"
                    isOptional
                  />
                  <ProfileFormFieldUser
                    labelText="Skoob"
                    fieldName={FieldNamesUser.skoob}
                    fieldValue={user.skoob}
                    setField={setField}
                    hasSubmissionFailed={submitted}
                    placeholderText="skoob"
                    isOptional
                  />
                </div>
              </div>

              <div className="container-button-save-form-user">
                <Button label="Salvar" className="button-save" onClick={updateDataUser} />
              </div>
            </section>
          </section>
        </section>
      </TemplatePage>
    </main>
  );
};

export default ProfileUserForm;
