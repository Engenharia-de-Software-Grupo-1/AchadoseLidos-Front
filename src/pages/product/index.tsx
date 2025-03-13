import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import Gallery from '@components/Gallery/gallery';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

const breadcrumbItems = [{ label: 'Página do produto', url: '/product-page' }];

const ProductPage = () => {
  return (
    <div className="container-product-page">
      <TemplatePage simpleHeader={false} simpleFooter={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <div className="container-product-frame">
          <main className="product-frame">
            <section className="product-details-frame">
              <Gallery />
            </section>

            <section className="product-details-frame">
              <main className="product-atributes-frame">
                <div className="product-title-frame">
                  <header className="product-Achados-H4"> Produto tal </header>
                  <p className="product-sebo">Sebo Tal - Bairro Tal</p>
                  <div className="product-tags">
                    <Tag severity="info" value="Bom estado" />
                    <Tag severity="secondary" value="K7" />
                  </div>
                  <p className="product-stock"> 2 em estoque</p>
                  <p className="product-Achados-SubH1">R$ 00,00</p>
                </div>
                <div className="product-actions-frame">
                  <Button
                    icon="pi pi-heart"
                    rounded
                    severity="danger"
                    aria-label="Favorite"
                    className="favorite-button"
                  />
                  <Button label="Adicionar à cesta" severity="success" rounded />
                </div>
                <p className="product-ediction-year">
                  {' '}
                  Ano da Edição: 1900
                  Ano de lançamento: 1900 
                  Autor: Fulano de Tal
                </p>
              </main>
            </section>
          </main>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProductPage;
