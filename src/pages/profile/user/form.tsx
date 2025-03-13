import TemplatePage from '@pages/templatePage';
import './style.css'
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';
import { ProfileFormFieldUser } from '@components/ProfileForm/ProfileFormFieldUser';
import { FieldNamesUser } from '@domains/FieldNames';
import { useForm } from '../sebo/useForm';
import { useFormUser } from './useForm';
import { Button } from 'primereact/button';
import { useState } from 'react';
import DialogModal from '@components/DialogModal';
import ButtonComponent from '@components/Button';

const ProfileUserForm = () => {

    const [visible, setVisible] = useState<boolean>(false);

    const {
        breadcrumbItems,
        getRule,
        setField,
        setSubmitted,
        submitted,
        validateStep,
        imageProfile,
        user
    } = useFormUser();

    return (
        <main className='container-profile-user-form'>
            <TemplatePage simpleHeader={false} simpleFooter={true}>
                <section className='container-profile-user'>
                    <ALBreadCrumb breadcrumbItems={breadcrumbItems} />

                    <div className='container-image-form'>
                        <ProfilePhoto imageProfile={imageProfile} canUpload />

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

                    <section className='container-form-user-data'>
                        <section className='container-section-form-user'>
                            <div className='content-form-user-data'>

                                <div className='form-user-content1'>
                                    <span className='span-form-user-data'>Dados</span>
                                    <ProfileFormFieldUser
                                        fieldName={FieldNamesUser.nome}
                                        fieldValue={user.nome}
                                        setField={setField}
                                        hasSubmissionFailed={submitted}
                                        placeholderText="Nome Completo *"
                                    />

                                    <ProfileFormFieldUser
                                        fieldName={FieldNamesUser.cpf}
                                        fieldValue={user.cpf}
                                        setField={setField}
                                        hasSubmissionFailed={submitted}
                                        placeholderText="CPF *"
                                    />

                                    <ProfileFormFieldUser
                                        fieldName={FieldNamesUser.instagram}
                                        fieldValue={user.instagram}
                                        setField={setField}
                                        hasSubmissionFailed={submitted}
                                        placeholderText="Instagram"
                                        isOptional
                                    />

                                    <ProfileFormFieldUser
                                        fieldName={FieldNamesUser.twitter}
                                        fieldValue={user.twitter}
                                        setField={setField}
                                        hasSubmissionFailed={submitted}
                                        placeholderText="Twitter"
                                        isOptional
                                    />

                                    <ButtonComponent label="Excluir Conta" type='button-trash' onClick={() => setVisible(true)} />
                                    {visible && (
                                        <DialogModal visibleDialog={visible} setVisibleDialog={setVisible}></DialogModal>
                                    )}
                                </div>

                                <div className='form-user-content2'>
                                    <ProfileFormFieldUser
                                        fieldName={FieldNamesUser.telefone}
                                        fieldValue={user.telefone}
                                        setField={setField}
                                        hasSubmissionFailed={submitted}
                                        placeholderText="Telefone *"
                                    />
                                    <ProfileFormFieldUser
                                        fieldName={FieldNamesUser.goodreads}
                                        fieldValue={user.goodreads}
                                        setField={setField}
                                        hasSubmissionFailed={submitted}
                                        placeholderText="gooddreads"
                                        isOptional
                                    />
                                    <ProfileFormFieldUser
                                        fieldName={FieldNamesUser.skoob}
                                        fieldValue={user.skoob}
                                        setField={setField}
                                        hasSubmissionFailed={submitted}
                                        placeholderText="skoob"
                                        isOptional
                                    />
                                </div>
                            </div>

                            <div className='container-button-save-form-user'>
                                <ButtonComponent label="Salvar" type='button-save' />
                            </div>
                        </section>
                    </section>
                </section>
            </TemplatePage>
        </main>
    );
}

export default ProfileUserForm;
