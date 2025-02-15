import { BreadCrumb } from "primereact/breadcrumb";
import Banner from "../../components/Banner/banner";
import TemplatePage from "../templatePage";
import "./style.css";

const HomePage = () => {
  const home = { icon: 'pi pi-home', url: 'https://primereact.org' };
  const images = ["/images/banner.jpg"];
  const items = [];

  return (
    <TemplatePage simpleHeader={false}>
      <div className="main-context">
        <Banner images={images} />
        <div>
          <p className="main-p1">Explore itens de segunda mão!</p>
          <p className="main-p2">ACHADOS E LIDOS</p>
          <p className="main-p3">
            é o catálogo virtual dos sebos de Campina Grande!
          </p>
        </div>
        <BreadCrumb model={items} home={home} style={{ justifyContent: "flex-start", marginLeft: "1rem" }} />
      </div>
    </TemplatePage>
  );
};

export default HomePage;
