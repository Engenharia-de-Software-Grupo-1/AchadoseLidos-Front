import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import MultipleDemo from '@components/NavigationFilter';
import TemplatePage from '@pages/templatePage';
import { Button } from 'primereact/button';
import React from 'react';
import './style.css';
import { getAll } from 'routes/routesProduto';
import { Filters, Orders } from 'types/NavigationFilters';

const breadcrumbItems = [{ label: 'Buscar', url: '/navigation' }];

export interface NavigationPageProps {
  filters: Filters[];
  orders: Orders[];
}

export const NavigationPage = (props: NavigationPageProps) => {
  const displayOrganization = props;
  const [cards, setCards] = React.useState<ProductCardProps[]>([]);
  const [nameIcon, setNameIcon] = React.useState('pi pi-arrow-down');
  const [priceIcon, setPriceIcon] = React.useState('pi pi-arrow-down');
  const [dateIcon, setDateIcon] = React.useState('pi pi-arrow-up');

  //mock
  // cards.push({
  //   name: 'Diário de uma Ana Rita',
  //   owner: 'Lupa',
  //   price: 1000000,
  //   image: 'images/anarita.JPG',
  //   createdAt: new Date('2025-09-01'),
  // });
  // cards.push({
  //   name: 'As crônicas de Naiara',
  //   owner: 'SeboDeolane',
  //   price: 99.05,
  //   image: 'images/naiara.jpeg',
  //   createdAt: new Date('2025-09-02'),
  // });
  // cards.push({
  //   name: 'Eliane e a pedra Filosofal',
  //   owner: 'Lupa',
  //   price: 67.8,
  //   image: 'images/eliane.jpeg',
  //   createdAt: new Date('2025-09-02'),
  // });
  // cards.push({
  //   name: 'A Helena que roubava livros, sacolas carteiras e corações',
  //   owner: 'Cata Livros',
  //   price: 37.25,
  //   image: 'images/helena.jpeg',
  //   createdAt: new Date('2025-09-02'),
  // });
  
  React.useEffect(() => {
    sortCardsByName();
  }, [nameIcon]);

  const sortCardsByName = () => {
    displayOrganization.orders = [{ campo: 'name', ordem: nameIcon === 'pi pi-arrow-down' ? 'desc' : 'asc' }];
    getAll(displayOrganization).then((response) => {
      setCards(response);
    }
    );
  };

  React.useEffect(() => {
    sortCardsByPrice();
  }, [priceIcon]);

  const sortCardsByPrice = () => {
    displayOrganization.orders = [{ campo: 'price', ordem: nameIcon === 'pi pi-arrow-down' ? 'desc' : 'asc' }];
    getAll(displayOrganization).then((response) => {
      setCards(response);
    }
    );
  };
  
  React.useEffect(() => {
    sortCardsByDate();
  }, [dateIcon]);

  const sortCardsByDate = () => {
    displayOrganization.orders = [{ campo: 'date', ordem: nameIcon === 'pi pi-arrow-down' ? 'desc' : 'asc' }];
    getAll(displayOrganization).then((response) => {
      setCards(response);
    }
    );
  };

  const changeOrder = (type: string) => {
    if (type === 'name') {
      setNameIcon(nameIcon === 'pi pi-arrow-down' ? 'pi pi-arrow-up' : 'pi pi-arrow-down');
    } else if (type === 'price') {
      setPriceIcon(priceIcon === 'pi pi-arrow-down' ? 'pi pi-arrow-up' : 'pi pi-arrow-down');
    } else if (type === 'date') {
      setDateIcon(dateIcon === 'pi pi-arrow-down' ? 'pi pi-arrow-up' : 'pi pi-arrow-down');
    }
  };

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
                <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
                  Nome
                </p>
                <i className={nameIcon} onClick={() => changeOrder('name')} style={{ cursor: 'pointer' }}>
                  {' '}
                </i>
                <p
                  className="nav-filter-display-order-text"
                  style={{ cursor: 'pointer' }}
                >
                  Preco
                </p>
                <i className={priceIcon} onClick={() => changeOrder('price')} style={{ cursor: 'pointer' }}>
                  {' '}
                </i>
                <p
                  className="nav-filter-display-order-text"
                  style={{ cursor: 'pointer' }}
                >
                  Data de Criação
                </p>
                <i className={dateIcon} onClick={() => changeOrder('date')} style={{ cursor: 'pointer' }}>
                  {' '}
                </i>
              </div>
            </div>
            <div className="nav-pagination-header">
              <p className="nav-pagination-header-text">1-10 de 20</p>
            </div>
            <div className="nav-content-center">
              {cards.map((card, index) => (
                <ProductCard key={index} {...card} />
              ))}
            </div>
            <div className="nav-pagination-footer">
              1-20 de 200
              <i className="pi pi-angle-left"></i>
              <i className="pi pi-angle-right"></i>
            </div>
          </div>
        </div>
      </TemplatePage>
    </main>
  );
};
