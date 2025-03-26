import './style.css';
import { useEffect, useState } from 'react';
import TemplatePage from '@pages/templatePage';
import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProductFilters from '@components/Filters/productFilters';
import { Filters, Orders } from 'types/NavigationFilters';
import { getAllProducts, getProductsByFiltersAndOrders, getProductsBySeboId } from 'routes/routesProduto';
import { useAuth } from '@contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSorting } from '@hooks/useSorting';

interface ProductNavigationPageProps {
  filters: Filters[];
  orders: Orders[];
  meusProdutos?: boolean;
}

export const ProductNavigationPage = ({ filters, orders, meusProdutos }: ProductNavigationPageProps) => {
  const [productCards, setProductCards] = useState<ProductCardProps[]>([]);
  const navigate = useNavigate();
  const { conta } = useAuth();
  const isSebo = conta?.tipo === 'SEBO';
  const { nameIcon, priceIcon, dateIcon, changeOrder } = useSorting(orders);
  const breadcrumbItems = meusProdutos
    ? [{ label: 'Meus produtos', url: '/meus-produtos' }]
    : [{ label: 'Produtos', url: '/products' }];

  useEffect(() => {
    getProducts();
  }, [filters, orders]);

  const getProducts = async () => {
    let response;
    if (meusProdutos && isSebo) {
      response = await getProductsBySeboId(0);
    } else if (filters.length !== 0 && orders.length !== 0) {
      response = await getProductsByFiltersAndOrders({ filters, orders: orders });
    } else {
      response = await getAllProducts();
    }
    setProductCards(response);
  };

  const handleEmptyContent = (message: string) => (
    <div className="empty-filter">
      <i className="pi pi-search-minus" style={{ fontSize: '3rem', color: 'var(--Achados-Black-50)' }} />
      <div className="empty-filter-text">
        <div className="empty-filter-text-1">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="nav-page">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <div className="nav-content-center">
          <ProductFilters filters={filters} />
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
                <i className={nameIcon} onClick={() => changeOrder('name')} style={{ cursor: 'pointer' }} />

                <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
                  Preço
                </p>
                <i className={priceIcon} onClick={() => changeOrder('price')} style={{ cursor: 'pointer' }} />

                <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
                  Data de Criação
                </p>
                <i className={dateIcon} onClick={() => changeOrder('date')} style={{ cursor: 'pointer' }} />
              </div>
            </div>
            {isSebo && meusProdutos && (
              <Button
                icon="pi pi-plus"
                className="nav-pagination-header-button"
                onClick={() => navigate('/product/edit')}
              >
                Adicionar produto
              </Button>
            )}
            {productCards.length > 0
              ? productCards.map((card, index) => <ProductCard key={index} {...card} />)
              : handleEmptyContent('Nenhum produto encontrado!')}
            {productCards.length > 0 && (
              <div className="nav-pagination-footer">
                1-20 de 200
                <i className="pi pi-angle-left"></i>
                <i className="pi pi-angle-right"></i>
              </div>
            )}
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};
