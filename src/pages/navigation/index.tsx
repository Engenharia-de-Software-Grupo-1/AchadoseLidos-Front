import './style.css';
import { useEffect, useState } from 'react';
import TemplatePage from '@pages/templatePage';
import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProductFilters from '@components/Filters/productFilters';
import SeboFilters from '@components/Filters/seboFilters';
import { Filters, Orders } from 'types/NavigationFilters';
import { getAllProducts } from 'routes/routesProduto';
import { getAllSebos } from 'routes/routesSebo';
import { useAuth } from '@contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';


export interface NavigationPageProps {
  filters: Filters[];
  orders: Orders[];
  cardType?: 'productCard' | 'seboCard';
  meusProdutos?: boolean;
}

export const NavigationPage = (props: NavigationPageProps) => {
  const { filters, orders, cardType, meusProdutos } = props;
  const [cards, setCards] = useState<ProductCardProps[]>([]);
  const [seboCards, setSeboCards] = useState<GenericCardProps[]>([]);
  const [seboNameIcon, setSeboNameIcon] = useState('pi pi-arrow-down');
  const [nameIcon, setNameIcon] = useState('pi pi-arrow-down');
  const [priceIcon, setPriceIcon] = useState('pi pi-arrow-down');
  const [dateIcon, setDateIcon] = useState('pi pi-arrow-up');
  const navigate = useNavigate();
  const { conta } = useAuth();
  const isProductCards = cardType === 'productCard';
  const isSeboCards = cardType === 'seboCard';
  const isSebo = conta?.tipo === 'SEBO';
  const seboProductsRoute = Boolean(meusProdutos);
  const breadcrumbItems = getBreadcrumbItems();

  function getBreadcrumbItems() {
    if (meusProdutos) {
      return [{ label: 'Meus produtos', url: '/meus-produtos' }];
    } else {
      const urlString = isProductCards ? '' : '/sebos';
      return [{ label: 'Navegar', url: `/navigation${urlString}` }];
    }
  }

  useEffect(() => {
    sortCards(nameIcon, 'name');
  }, [nameIcon]);

  useEffect(() => {
    sortCards(priceIcon, 'price');
  }, [priceIcon]);

  useEffect(() => {
    sortCards(dateIcon, 'date');
  }, [dateIcon]);

  useEffect(() => {
    sortCards(seboNameIcon, 'name');
  }, [seboNameIcon]);

  const getFieldUseState = (field: string) => {
    if (field === 'name') {
      return isProductCards
        ? { icon: nameIcon, setIcon: setNameIcon }
        : { icon: seboNameIcon, setIcon: setSeboNameIcon };
    } else if (field === 'price') {
      return { icon: priceIcon, setIcon: setPriceIcon };
    }
    return { icon: dateIcon, setIcon: setDateIcon };
  };

  const sortCards = (icon: string, field: string) => {
    orders.forEach((item) => {
      if (item.field === field) {
        item.order = icon === 'pi pi-arrow-down' ? 'DESC' : 'ASC';
      }
    });
    isProductCards ? getProducts() : getSebos();
  };

  const getProducts = () => {
    if (meusProdutos) {
      // getMyProducts({ filters, orders }).then((response) => {
      //   setCards(response);
      // });
      return;      
    } else {
      getAllProducts({ filters, orders }).then((response) => {
        setCards(response);
      });
    }
  };

  const getSebos = () => {
    getAllSebos({ filters, orders }).then((response) => {
      setSeboCards(response);
    });
  };

  const changeOrder = (type: string) => {
    const { icon, setIcon } = getFieldUseState(type);
    setIcon(icon === 'pi pi-arrow-down' ? 'pi pi-arrow-up' : 'pi pi-arrow-down');
  };

  return (
    <main className="nav-page">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <div className="nav-center">
          {isProductCards && <ProductFilters filters={filters} />}
          {isSeboCards && <SeboFilters filters={filters} />}
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
                <i
                  className={isProductCards ? nameIcon : seboNameIcon}
                  onClick={() => changeOrder('name')}
                  style={{ cursor: 'pointer' }}
                >
                  {' '}
                </i>
                {isProductCards && (
                  <>
                    <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
                      Preco
                    </p>
                    <i className={priceIcon} onClick={() => changeOrder('price')} style={{ cursor: 'pointer' }}>
                      {' '}
                    </i>
                    <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
                      Data de Criação
                    </p>
                    <i className={dateIcon} onClick={() => changeOrder('date')} style={{ cursor: 'pointer' }}>
                      {' '}
                    </i>
                  </>
                )}
              </div>
            </div>
            <div className="nav-pagination-header">
              <p className="nav-pagination-header-text">1-10 de 20</p>
              {isSebo && isProductCards && seboProductsRoute ? (
                <Button icon="pi pi-plus" className="nav-pagination-header-button" onClick={() => navigate('/product/edit')}>
                  Adicionar produto
                </Button>
              ) : null}
            </div>
            <div className="nav-content-center">
              {isProductCards && cards.map((card, index) => <ProductCard key={index} {...card} />)}
              {isSeboCards && seboCards.map((card, index) => <GenericCard key={index} {...card} />)}
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
