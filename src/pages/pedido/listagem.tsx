import './style.css';
import { useEffect, useState } from 'react';
import TemplatePage from '@pages/template';
import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import { Paginator } from 'primereact/paginator';
import { PedidoList } from '@domains/Pedido';
import { Button } from 'primereact/button';
import { usePedido } from '@stores/pedido/pedidoStore';

export const ListagemPedidoPage = () => {
  const [orderCards, setOrderCards] = useState<GenericCardProps[]>([]);
  const { pedidos, initialize } = usePedido();
  const breadcrumbItems = [{ label: 'Histórico de Pedidos', url: '/profile/historico' }];
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);
  let filters = Filter[] = [];

  useEffect(() => {
    initialize({
      filters: filters,
      sorters: [],
    }, () => getPedidos());
  }, [filters]);

  const setFilters = (status: string) => {
    filters = [];
    filters.push({ campo: 'status', operador: 'like', valor: status })
  }

  const getPedidos = async () => {
    setOrderCards(
      pedidos.map((pedido: PedidoList) => ({
        id: pedido.id,
        title: `Pedido #${pedido?.id}`,
        description: `${pedido?.qtdProdutos} ${pedido?.qtdProdutos === 1 ? 'Item' : 'Itens'}`,
        imageUrl: pedido?.sebo?.fotoPerfil ?? '/images/foto_pedido.png',
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
          <span style={{marginTop: '5px'}}>{message}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="order-page">
      <TemplatePage simpleHeader={true} simpleFooter={false} backgroundFooterDiff={true}>
        <div className="order-page">
          <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
          <div className="order-content-center">
            <div className="order-content-column">
              <h1 className="h1-highlight">Histórico de Pedidos</h1>

              <div className="status-filters">
                <Button label="Pendente" className="status-button pending" onClick={() => setFilters('PENDENTE')}/>
                <Button label="Concluído" className="status-button completed" onClick={() => setFilters('CONCLUIDO')}/>
                <Button label="Cancelado" className="status-button canceled" onClick={() => setFilters('CANCELADO')}/>
              </div>
              {orderCards.length > 0 ? (
                <>
                  <div className="order-content-center-sebo">
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
        </div>
      </TemplatePage>
    </div>
  );
};
