import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import MultipleDemo from '@components/NavigationFilter';
import ProductCard from '@components/ProductCard/productCard';
import TemplatePage from '@pages/templatePage';
import './style.css';
import { Button } from 'primereact/button';

type Props = {};

const breadcrumbItems = [{ label: 'Navegar', url: '/navigation' }];

export const NavigationPage = (_props: Props) => {
  return (
    <main className="nav-page">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <div className="nav-center">
          <div className="nav-filter-column">
            <div className="nav-filter-column-header">
              <span className="nav-filter-column-header-text">Filtros</span>
              <Button className="nav-filter-column-header-button" rounded>
                Aplicar {'>'}
              </Button>
            </div>
            <MultipleDemo></MultipleDemo>
          </div>
          <div className="nav-content-column">
            <div className="nav-filter-display">
              <p className="nav-filter-display-text">
                Resultados de pesquisa para: <br />
                Filtro 1, Filtro 2.
              </p>
              <div className="nav-filter-display-order">
                <p className="nav-filter-display-order-text">Nome</p>
                <i className="pi pi-angle-down"> </i>
              </div>
            </div>
            <div className="nav-pagination-header">
              <p className="nav-pagination-header-text">1-10 de 20</p>
            </div>
            <div className="nav-content-center">
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
            </div>
            <div className="nav-pagitation-footer"></div>
          </div>
        </div>
      </TemplatePage>
    </main>
  );
};
