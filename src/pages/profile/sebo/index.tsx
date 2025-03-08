import TemplatePage from "@pages/templatePage";
import "./style.css";
import Banner from "@components/Banner/banner";
import Profile from "@components/ProfileUsers";
import Gallery from "@components/Gallery";
import MyMap from "@components/Map";
import ContainerItems from "@components/ContainerItems";
import ALBreadCrumb from "@components/ALBreadCrumb/ALBreadCrumb";


const ProfileSebo = () => {

    const images = ['/images/banner.jpg'];
    const imageProfile = '/images/anarita.JPG';
    const breadcrumbItems = [
        { label: 'Meu Perfil', url: '/profile/sebo' },
      ];

    return (
        <div className="main-profile-sebo">
            <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
                <Banner images={images} showIndicators={false} />

                <div className="profile-sebo">
                    <Profile
                        imageProfile={imageProfile}
                        titleProfile={"Recanto das Páginas"}
                        descripProfile={"O Sebo Recanto das Páginas é um espaço acolhedor para amantes da literatura e da história dos livros. Com prateleiras repletas de obras raras, clássicos da literatura, quadrinhos e edições esgotadas, nosso sebo é um verdadeiro refúgio para leitores e colecionadores."}
                        isSebo={true}
                        authUser={false}
                    />
                </div>

                <ContainerItems title="Todos os Itens" backgroundBege={false}> </ContainerItems>
                <ContainerItems title="Eventos" backgroundBege={true}> </ContainerItems>

                <div className="container-carousel-items">
                    <div className="content-title-history">
                        <span className="title-carousel-history">
                            Nossa História
                        </span>
                    </div>
                </div>

                <div className="space-carousel-history">
                    <div className="container-hist-pics">
                        <div className="hist">
                            <span className="text-hist">Office ipsum you must be muted. Activities previous request what's impact where just whatever journey enable. Socialize journey responsible the say centric an. Emails recap angel food sky close running mint they don't. Strategic discussion diligence so revision first-order unlock bed. Ui new calculator join discussions if synergy anomalies cta. Too weeks diligence vec discussion unpack I race. Beforehand first-order say charts with replied. Stands this comms due wider. Goto solutionize i'm technologically idea weeks emails people site. Emails pollination creep sop first-order. Own turn win teams base algorithm calculator. Breakout hits air gave journey dive club book get. Door regroup churning hard just half closing dive initiative working. Stronger weeks the closer back-end knowledge asserts. Productive decisions these follow weaponize blue email mindfulness. Three knowledge day sky boil first where line member. Also business message closest solutions dog. Ditching streamline 2 hill walk start. Strategic also open live book standup player-coach food. Closing one points existing ui bells seat also info. Already cadence player-coach before office diligence I hits open key. Stakeholder just latest third me what's. Good when stakeholder more comms.</span>
                        </div>

                        <Gallery/>
                    </div>

                    <div className="container-map">
                        <MyMap/>
                    </div>

                </div>
            </TemplatePage>
        </div>
    );
}

export default ProfileSebo;