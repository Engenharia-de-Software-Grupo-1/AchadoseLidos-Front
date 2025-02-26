import TemplatePage from "@pages/templatePage";
import  "./style.css";
import Banner from "@components/Banner/banner";
import Profile from "@components/ProfileUsers";

const ProfileSebo = () => {

    const images = ['/images/banner.jpg'];
    const imageProfile = '/images/anarita.JPG';

    return (
        <div className="main-profile-sebo">
            <TemplatePage simpleHeader={false} simpleFooter={false}>
                <Banner images={images} showIndicators={false}/>

                <div className="profile-sebo">
                    <Profile 
                    imageProfile={imageProfile} 
                    titleProfile={"Recanto das Páginas"}
                    descripProfile={"O Sebo Recanto das Páginas é um espaço acolhedor para amantes da literatura e da história dos livros. Com prateleiras repletas de obras raras, clássicos da literatura, quadrinhos e edições esgotadas, nosso sebo é um verdadeiro refúgio para leitores e colecionadores."}
                    isSebo={true}
                    />      
                </div>
                teste
            </TemplatePage>
        </div>
    );
}

export default ProfileSebo;