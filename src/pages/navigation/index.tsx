import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import MultipleDemo from '@components/NavigationFilter';
import TemplatePage from '@pages/templatePage';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import React from 'react';
import './style.css';
  
const breadcrumbItems = [{ label: 'Buscar', url: '/navigation' }];

export const NavigationPage = () => {
  const [icon, setIcon] = React.useState('pi pi-arrow-down');
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [cards, setCards] = React.useState<ProductCardProps[]>([]);

  //mock
  cards.push({
    name: 'Diário de uma Ana Rita',
    owner: 'Lupa',
    price: 1000000,
    image: 'images/anarita.JPG',
  });
  cards.push({
    name: 'As crônicas de Naiara',
    owner: 'SeboDeolane',
    price: 99.05,
    image: 'images/naiara.jpeg',
  });
  cards.push({
    name: 'Eliane e a pedra Filosofal',
    owner: 'Lupa',
    price: 67.8,
    image: 'images/eliane.jpeg',
  });
  cards.push({
    name: 'A Helefffffffffffffffna que roubdfdfdava livros',
    owner: 'Cata Livros',
    price: 37.25,
    image: 'images/helena.jpeg',
  });

  const changeOrder = () => {
    if (icon === 'pi pi-arrow-down') {
      setIcon('pi pi-arrow-up');
      setOrdenacao('asc');
    } else {
      setIcon('pi pi-arrow-down');
      setOrdenacao('desc');
    }
  };

  const setOrdenacao = (tipo: 'asc' | 'desc') => {
    if (selectedFilters.includes('nome')) {
      cards.sort((a, b) => (tipo === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    } else if (selectedFilters.includes('preco')) {
      cards.sort((a, b) => (tipo === 'asc' ? a.price - b.price : b.price - a.price));
    }
  };

  const addFilter = (order: string) => {
    if (selectedFilters.includes(order)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== order));
    } else {
      setSelectedFilters([...selectedFilters, order]);
    }
    setOrdenacao(icon === 'pi pi-arrow-down' ? 'desc' : 'asc');
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
                <p
                  className={classNames('nav-filter-display-order-text', {
                    'nav-filter-highlight': selectedFilters.includes('nome'),
                  })}
                  onClick={() => addFilter('nome')}
                  style={{ cursor: 'pointer' }}
                >
                  Nome
                </p>
                <p
                  className={classNames('nav-filter-display-order-text', {
                    'nav-filter-highlight': selectedFilters.includes('preco'),
                  })}
                  onClick={() => addFilter('preco')}
                  style={{ cursor: 'pointer' }}
                >
                  Preco
                </p>
                {/* <p
                  className={classNames('nav-filter-display-order-text', {
                    'nav-filter-highlight': selectedFilters.includes('filtro'),
                  })}
                  onClick={() => addFilter('filtro')}
                  style={{ cursor: 'pointer' }}
                >
                  Filtro
                </p> */}
                <i className={icon} onClick={changeOrder} style={{ cursor: 'pointer' }}>
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
