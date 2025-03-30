import './style.css';
import { useEffect, useState } from 'react';
import TemplatePage from '@pages/template';
import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import { Paginator } from 'primereact/paginator';
import { Filter } from 'types/NavigationFilters';
import { Button } from 'primereact/button';
import { usePedido } from '@stores/pedido/pedidoStore';
import { useAuth } from '@contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

export const ListagemPedidoPage = () => {
  const [orderCards, setOrderCards] = useState<GenericCardProps[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const { pedidos, initialize } = usePedido();
  const breadcrumbItems = [{ label: 'Histórico de Pedidos', url: '/profile/historico' }];
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);
  const { conta, authChecked } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authChecked && !conta) {
      navigate('/login');
    } else {
      initialize(
        {
          filters: filters,
          sorters: [],
        },
        () => getPedidos()
      );
    }
  }, [conta, navigate, filters]);

  useEffect(() => getPedidos(), [pedidos]);

  const updateFilters = (status: string) => {
    setFilters([{ campo: 'status', operador: '=', valor: status }]);
  };

  const getPedidos = () => {
    setOrderCards([
      ...pedidos.map((pedido) => ({
        id: pedido.id,
        title: `Pedido #${pedido.id}`,
        description: `${pedido.qtdProdutos} ${pedido.qtdProdutos === 1 ? 'Item' : 'Itens'}`,
        imageUrl: pedido.sebo?.fotoPerfil ?? '/images/sebo.png',
        topLabel: conta?.tipo === 'USUARIO' ? pedido.sebo?.nome : pedido.usuario?.nome,
        seboId: pedido.sebo?.id,
        isButtonVisible: false,
        isOffWhiteFrills: true,
        bottomLabel: pedido.status,
      })),
    ]);
  };

  if (!authChecked) {
    return (
      <TemplatePage simpleHeader={false} simpleFooter={true}>
        <div className="order-page">
          <div className="flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <ProgressSpinner />
          </div>
        </div>
      </TemplatePage>
    );
  }

  const handleEmptyContent = (message: string) => (
    <div className="empty-filter">
      <i className="pi pi-search-minus" style={{ fontSize: '3rem', color: 'var(--Achados-Black-50)' }} />
      <div className="empty-filter-text">
        <div className="empty-filter-text-1">
          <span style={{ marginTop: '5px' }}>{message}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="order-page">
      <TemplatePage simpleHeader={false} simpleFooter={true} backgroundFooterDiff={true}>
        <div className="order-page">
          <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
          <div className="order-content-center">
            <div className="order-content-column">
              <h1 className="h1-highlight">Histórico de Pedidos</h1>

              <div className="status-filters">
                <Button label="Pendente" className="status-button pending" onClick={() => updateFilters('PENDENTE')} />
                <Button
                  label="Concluído"
                  className="status-button completed"
                  onClick={() => updateFilters('CONCLUIDO')}
                />
                <Button
                  label="Cancelado"
                  className="status-button canceled"
                  onClick={() => updateFilters('CANCELADO')}
                />
              </div>
              {orderCards.length > 0 ? (
                <>
                  <div className="order-content-center-sebo">
                    {orderCards.slice(first, first + rows).map((card, index) => {
                      return (
                        <div
                          className='card-container-pedido-details'
                          key={index}
                          onClick={() => navigate(`/profile/historico/pedido/${card?.id}`)}
                          style={{ cursor: 'pointer'}}
                        >
                          <GenericCard {...card} />
                        </div>
                      );
                    })}
                  </div>

                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={orderCards.length}
                    onPageChange={(e) => {
                      setFirst(e.first);
                      setRows(e.rows);
                    }}
                    style={{ backgroundColor: 'var(--Achados-OffWhite)' }}
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
