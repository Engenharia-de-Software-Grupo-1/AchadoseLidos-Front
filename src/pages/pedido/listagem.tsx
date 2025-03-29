import './style.css';
import { useEffect, useState } from 'react';
import TemplatePage from '@pages/template';
import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import { getAll } from 'routes/routesPedido';
import { Paginator } from 'primereact/paginator';
import { PedidoList } from '@domains/Pedido';
import { Button } from 'primereact/button';

interface ListagemPedidoPageProps {}

export const ListagemPedidoPage = () => {
  const [orderCards, setOrderCards] = useState<GenericCardProps[]>([]);
  const breadcrumbItems = [{ label: 'Histórico de Pedidos', url: '/profile/historico' }];
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);

  //useEffect(() => {
  //  getSebos();
  //}, [filters, sorters, nameIcon]);

  const getSebos = async () => {
    const response = await getAll({ filters, sorters });
    setOrderCards(
      response.map((pedido: PedidoList) => ({
        id: pedido.id,
        title: `Pedido #${pedido?.id}`,
        description: `${pedido?.qtdProdutos} ${pedido?.qtdProdutos === 1 ? 'Item' : 'Itens'}`,
        imageUrl: '/images/sem_foto.png',
        topLabel: pedido?.status,
        seboId: pedido?.sebo?.id,
        isButtonVisible: false,
        isOffWhiteFrills: true,
      }))
    );
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
      <TemplatePage simpleHeader={true} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <div className="nav-content-center">
          <div className="nav-content-column">
            <h1 className="h1-highlight">Histórico de Pedidos</h1>

            <div className="status-filters">
              <Button label="Pendente" className="status-button pending" />
              <Button label="Concluído" className="status-button completed" />
              <Button label="Cancelado" className="status-button canceled" />
            </div>
            {orderCards.length > 0 ? (
              <>
                <div className="nav-content-center-sebo">
                  {orderCards.slice(first, first + rows).map((card, index) => (
                    <GenericCard key={index} {...card} />
                  ))}
                </div>
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={orderCards.length}
                  onPageChange={(e) => {
                    setFirst(e.first);
                    setRows(e.rows);
                  }}
                ></Paginator>
              </>
            ) : (
              handleEmptyContent('Nenhum pedido encontrado!')
            )}
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};
