import PedidoDatatable from '@components/PedidoDatatable/pedidoDatatable';
import { useEffect } from 'react';
import TemplatePage from '@pages/template';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import './style.css';
import { Button } from 'primereact/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePedido } from '@stores/pedido/pedidoStore';
import { useAuth } from '@contexts/authContext';
import { ProgressSpinner } from 'primereact/progressspinner';

const PedidoPage = () => {
  const { id } = useParams();
  const { conta } = useAuth();
  const { pedido, loadingPedido, getPedido, handleQuantityChange, handleSelectionChange, handleCancel, handleConfirm } =
    usePedido();
  const navigate = useNavigate();
  const isUser = conta?.tipo === 'USUARIO';

  useEffect(() => {
    if (id) {
      getPedido(Number(id));
    }
  }, [id]);

  const isFinalizado = false;

  const breadCrumbItems = [
    { label: 'Perfil', url: `/profile/${!isUser ? 'sebo' : 'user'}/` },
    { label: 'Historico', url: '/profile/historico/' },
    { label: 'Detalhes do Pedido', url: `/profile/historico/${id}` },
  ];

  if (loadingPedido) {
    return (
      <div className="flex justify-content-center p-4">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <TemplatePage simpleHeader={false} simpleFooter={true}>
      <div className="pedido-container">
        <ALBreadCrumb breadcrumbItems={breadCrumbItems} />
        <h1 className="h1-highlight" style={{ paddingBottom: '0', marginTop: '0' }}>
          Pedido #{id}{' '}
        </h1>
        {!isUser ? (
          <h3 style={{ margin: '-2rem', padding: '0' }}>
            <Link to={`/profile/user/${pedido.usuario?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              Usuário {pedido.usuario?.nome}
            </Link>
          </h3>
        ) : (
          <h3 style={{ margin: '-2rem', padding: '0' }}>{pedido.sebo?.nome}</h3>
        )}
        <h4 style={{ padding: '0', marginBottom: '0' }}>{pedido.createdAt}</h4>
        <div style={{ width: '80%' }}>
          <PedidoDatatable
            pedido={pedido}
            onQuantityChange={handleQuantityChange}
            onSelectionChange={handleSelectionChange}
            isUser={isUser}
          />
          {!isUser && !isFinalizado && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '1rem 0', gap: '1rem' }}>
              <Button
                label="Cancelar Venda"
                style={{
                  backgroundColor: 'var(--Achados-Red)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                }}
                tooltipOptions={{ position: 'top' }}
                onClick={() => handleCancel(() => navigate('/profile/historico'))}
              />
              <Button
                label="Confirmar Venda"
                style={{
                  backgroundColor: 'var(--Achados-Success)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                }}
                tooltip={'Ao confirmar, não será mais possível editar este pedido.'}
                tooltipOptions={{ position: 'top' }}
                onClick={() => handleConfirm(() => navigate('/profile/historico'))}
              />
            </div>
          )}
        </div>
      </div>
    </TemplatePage>
  );
};

export default PedidoPage;
