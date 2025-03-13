import TemplatePage from '@pages/templatePage';
import './style.css'
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';
import { ProfileFormFieldUser } from '@components/ProfileForm/ProfileFormFieldUser';
import { FieldNamesUser } from '@domains/FieldNames';
import { useForm } from '../sebo/useForm';
import { useFormUser } from './useForm';

const ProfileUserForm = () => {

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
        <div className='container-profile-user-form'>
            <TemplatePage simpleHeader={false} simpleFooter={true}>
                <div className='container-profile-user'>
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

                    <div className='container-form-user-data'>
                    <div className='content-form-user-data'> 
                            tests
                    </div>
                    </div>
                </div>
            </TemplatePage>
        </div>
    );
}

export default ProfileUserForm;