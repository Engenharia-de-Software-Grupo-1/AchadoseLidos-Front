import Banner from "../../components/banner";
import Menu from "../../components/menu";
import "./style.css";

const HomePage = () => {

    return (
        <>
            <div className="main-container">
                <div className="main-header">
                    <Menu/>
                </div>
                <div>
                    <Banner/>
                </div>
                <div className="main-context">
                    <p className="main-p1">Explore itens de segunda mão!</p>
                    <p className="main-p2">ACHADOS E LIDOS</p>
                    <p className="main-p3">é o catálogo virtual dos sebos de Campina Grande!</p>
                </div>
            </div>
        
        </>
    )
}

export default HomePage
