import TemplatePage from '@pages/templatePage'
import './style.css'
import Profile from '@components/ProfileUsers/profileUsers';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb'

const ProfileUser = () => {

    const imageProfile = '/images/anarita.JPG'
    const description = "Hipster ipsum tattooed brunch I' m baby. Trust tonx pitchfork I'm fund. Level flannel polaroid tousled 8-bit edison big. Literally jomo before butcher beard fashion juice shorts subway austin. Yolo cornhole cornhole tilde raw."

    const breadCrumbItems = [
        { label: 'Usuário', url: '/profile/user' }
    ]

    return (
        <div className='container-profile-user'>
            <TemplatePage simpleHeader={false} simpleFooter={true}>

                <div className='container-profile-user'>
                    <ALBreadCrumb breadcrumbItems={breadCrumbItems} />

                    <Profile
                        imageProfile={imageProfile}
                        titleProfile='Usuário Fulano de Tal'
                        descripProfile={description}
                        isSebo={false}
                        authUser={true}
                        isUser={true}
                    />
                </div>

            </TemplatePage>
        </div>
    )
}

export default ProfileUser