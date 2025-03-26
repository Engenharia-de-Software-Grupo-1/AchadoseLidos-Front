// import './style.css';
// import { JSX, useEffect, useState } from 'react';
// import TemplatePage from '@pages/templatePage';
// import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
// import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
// import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
// import ProductFilters from '@components/Filters/productFilters';
// import SeboFilters from '@components/Filters/seboFilters';
// import { Filters, Orders } from 'types/NavigationFilters';
// import { getAllProducts, getProductsByFiltersAndOrders, getProductsBySeboId } from 'routes/routesProduto';
// import { getAll, getAllSebosByFilterAndOrders } from 'routes/routesSebo';
// import { useAuth } from '@contexts/authContext';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { Sebo } from '@domains/Sebo';
// import { is } from 'cypress/types/bluebird';
// import { set } from 'cypress/types/lodash';

// export interface NavigationPageProps {
//   filters: Filters[];
//   orders: Orders[];
//   cardType?: 'productCard' | 'seboCard';
//   meusProdutos?: boolean;
// }

// export const NavigationPage = (props: NavigationPageProps) => {
//   const { filters, orders, cardType, meusProdutos } = props;
//   const [productCards, setProductCards] = useState<ProductCardProps[]>([]);
//   const [seboCards, setSeboCards] = useState<GenericCardProps[]>([]);
//   const [seboNameIcon, setSeboNameIcon] = useState('pi pi-arrow-down');
//   const [nameIcon, setNameIcon] = useState('pi pi-arrow-down');
//   const [priceIcon, setPriceIcon] = useState('pi pi-arrow-down');
//   const [dateIcon, setDateIcon] = useState('pi pi-arrow-up');
//   const navigate = useNavigate();
//   const { conta } = useAuth();
//   const isEmptyProductCards = productCards.length === 0;
//   const isEmptySeboCards = seboCards.length === 0;
//   const isProductCards = cardType === 'productCard';
//   const isSeboCards = cardType === 'seboCard';
//   const isSebo = conta?.tipo === 'SEBO';
//   const seboProductsRoute = Boolean(meusProdutos);
//   const breadcrumbItems = getBreadcrumbItems();

//   function getBreadcrumbItems() {
//     if (meusProdutos) {
//       return [{ label: 'Meus produtos', url: '/meus-produtos' }];
//     } else {
//       const urlString = isProductCards ? '' : '/sebos';
//       return [{ label: 'Navegar', url: `/navigation${urlString}` }];
//     }
//   }

//   useEffect(() => {
//     isProductCards ? getProducts() : getSebos();
//   }, []);

//   useEffect(() => {
//     if (productCards.length === 0) {
//       handleEmptyContent();
//     }
//   }, [productCards]);

//   useEffect(() => {
//     isProductCards ? getProducts() : getSebos();
//   }, [filters, orders]);

//   useEffect(() => {
//     sortCards(nameIcon, 'name');
//   }, [nameIcon]);

//   useEffect(() => {
//     sortCards(priceIcon, 'price');
//   }, [priceIcon]);

//   useEffect(() => {
//     sortCards(dateIcon, 'date');
//   }, [dateIcon]);

//   useEffect(() => {
//     sortCards(seboNameIcon, 'name');
//   }, [seboNameIcon]);

//   const getFieldUseState = (field: string) => {
//     if (field === 'name') {
//       return isProductCards
//         ? { icon: nameIcon, setIcon: setNameIcon }
//         : { icon: seboNameIcon, setIcon: setSeboNameIcon };
//     } else if (field === 'price') {
//       return { icon: priceIcon, setIcon: setPriceIcon };
//     }
//     return { icon: dateIcon, setIcon: setDateIcon };
//   };

//   const sortCards = (icon: string, field: string) => {
//     orders.forEach((item) => {
//       if (item.field === field) {
//         item.order = icon === 'pi pi-arrow-down' ? 'DESC' : 'ASC';
//       }
//     });
//     isProductCards ? getProducts() : getSebos();
//   };

//   const getProducts = async () => {
//     let response;
//     if (meusProdutos && conta && conta?.tipo === 'SEBO') {
//       response = await getProductsBySeboId(0);
//     } else if (filters.length !== 0 && orders.length !== 0) {
//       response = await getProductsByFiltersAndOrders({ filters, orders });
//     } else {
//       response = await getAllProducts();
//     }
//     setProductCards(response);
//   };

//   const getSebos = () => {
//     if (filters.length === 0 && orders.length === 0) {
//       getAllSebosByFilterAndOrders({ filters, orders }).then((response) => {
//         setSeboCards(response);
//       });
//     } else {
//       getAll().then((response) => {
//         const mappedResponse = response.map((sebo: Sebo) => ({
//           id: sebo.id,
//           title: sebo.nome,
//           description: sebo.endereco?.bairro || 'Campina Grande',
//           imageUrl: sebo.fotoPerfil || '/public/images/sebo.jpg',
//           topLabel: sebo.endereco?.bairro || 'Campina Grande',
//           isButtonVisible: true,
//         }));
//         setSeboCards(mappedResponse);
//       });
//     }
//   };

//   const changeOrder = (type: string) => {
//     const { icon, setIcon } = getFieldUseState(type);
//     setIcon(icon === 'pi pi-arrow-down' ? 'pi pi-arrow-up' : 'pi pi-arrow-down');
//   };

//   const handleEmptyContent = () => {
//     return (
//       <div className="empty-filter">
//         <i className="pi pi-search-minus" style={{ fontSize: '3rem', color: 'var(--Achados-Black-50)' }} />
//         <div className="empty-filter-text">
//           <div className="empty-filter-text-1">
//             <span>Nenhum {isSeboCards ? 'sebo' : 'produto'} encontrado!</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const _handlePaginationHeader = (): JSX.Element => {
//     return <p className="nav-pagination-header-text">1-10 de 20</p>;
//   };

//   const handlePaginationFooter = (): JSX.Element => {
//     return (
//       <div className="nav-pagination-footer">
//         1-20 de 200
//         <i className="pi pi-angle-left"></i>
//         <i className="pi pi-angle-right"></i>
//       </div>
//     );
//   };

//   return (
//     <main className="nav-page">
//       <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
//         <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
//         <div className="nav-center">
//           {isProductCards && <ProductFilters filters={filters} />}
//           {isSeboCards && <SeboFilters filters={filters} />}
//           <div className="nav-content-column">
//             <div className="nav-filter-display">
//               <p className="nav-filter-display-text">
//                 Resultados de pesquisa para: <br />
//                 Filtro 1, Filtro 2.
//               </p>
//               <div className="nav-filter-display-order">
//                 <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
//                   Nome
//                 </p>
//                 <i
//                   className={isProductCards ? nameIcon : seboNameIcon}
//                   onClick={() => changeOrder('name')}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {' '}
//                 </i>
//                 {isProductCards && (
//                   <>
//                     <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
//                       Preco
//                     </p>
//                     <i className={priceIcon} onClick={() => changeOrder('price')} style={{ cursor: 'pointer' }}>
//                       {' '}
//                     </i>
//                     <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
//                       Data de Criação
//                     </p>
//                     <i className={dateIcon} onClick={() => changeOrder('date')} style={{ cursor: 'pointer' }}>
//                       {' '}
//                     </i>
//                   </>
//                 )}
//               </div>
//             </div>
//             {isSebo && isProductCards && seboProductsRoute ? (
//               <Button
//                 icon="pi pi-plus"
//                 className="nav-pagination-header-button"
//                 onClick={() => navigate('/product/edit')}
//               >
//                 Adicionar produto
//               </Button>
//             ) : null}
//             <div className="nav-content-center">
//               {isProductCards && productCards.map((card, index) => <ProductCard key={index} {...card} />)}
//               {isSeboCards && seboCards.map((card, index) => <GenericCard key={index} {...card} />)}
//             </div>
//             {isProductCards && isEmptyProductCards
//               ? handleEmptyContent()
//               : !isEmptyProductCards && handlePaginationFooter()}
//             {isSeboCards && isEmptySeboCards ? handleEmptyContent() : !isEmptySeboCards && handlePaginationFooter()}
//           </div>
//         </div>
//       </TemplatePage>
//     </main>
//   );
// };
