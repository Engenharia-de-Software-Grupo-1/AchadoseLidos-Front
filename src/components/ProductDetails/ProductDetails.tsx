import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import Gallery from '@components/Gallery/gallery';
import './style.css';
import { useAuth } from '@contexts/authContext';
import { Produto } from '@domains/Produto/Produto';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '@routes/routesProduto';
import { useNotification } from '@contexts/notificationContext';
import DialogModal from '@components/DialogModal/dialogModal';
import { useState } from 'react';
interface ProdutoDetalhesProps {
  data: Produto;
  id: any;
}

const ProductDetails: React.FC<ProdutoDetalhesProps> = ({ data, id }: ProdutoDetalhesProps) => {
  const { conta } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(id);
      showNotification('success', 'Produto excluído com sucesso!', '');
      navigate('/');
    } catch (error) {
      console.error('Erro ao deletar produto', error);
    }
  };

  return (
    <main className="product-frame">
      <section className="product-columns-frame">
        <section className="product-details-frame">
          <Gallery position="product-card-galleria" photos={data?.fotos} />
        </section>

        <section className="product-details-frame">
          <span className="achados-h4">{data.nome}</span>
          <p className="product-sebo">
            {data.sebo?.endereco.bairro ? `${data.sebo.nome} - ${data.sebo.endereco.bairro}` : `${data.sebo?.nome}`}
          </p>

          <div className="product-tags">
            {data.categoria && <Tag severity="info" value={data.categoria} />}
            {data.estadoConservacao && <Tag severity="info" value={data.estadoConservacao} />}
          </div>

          <p className="product-stock">{`${data.qtdEstoque} em estoque`}</p>
          <p className="product-Achados-SubH1">{`R$ ${data.preco.toFixed(2)}`}</p>

          {conta?.tipo === 'USUARIO' && (
            <div className="product-actions-frame">
              <Button icon="pi pi-heart" rounded severity="danger" aria-label="Favorite" className="favorite-button" />
              <Button label="Adicionar à cesta" severity="success" className="button-cesta" rounded />
            </div>
          )}
          {conta?.tipo === 'SEBO' && (
            <div className="product-actions-frame">
              <Button
                icon="pi pi-trash"
                label="Excluir"
                severity="danger"
                aria-label="Excluir"
                className="ex-button"
                rounded
                onClick={() => setVisible(true)}
              />

              {visible && (
                <DialogModal
                  setVisibleDialog={setVisible}
                  visibleDialog={visible}
                  onClickDelete={handleDeleteProduct}
                  message='Você tem certeza que deseja excluir? Todos os dados deste produto serão apagados.'
                />
              )}
              <Link to={`/product/${id}/edit`}>
                <Button icon="pi pi-pencil" label="Editar" severity="success" className="button-cesta" rounded />
              </Link>
            </div>
          )}

          <div className="product-ediction-year">
            {data.anoEdicao && (
              <p className="product-ediction-year-p">
                <span className="product-ediction-year-span">Ano da Edição:</span> {data.anoEdicao}
              </p>
            )}
            {data.anoLancamento && (
              <p className="product-ediction-year-p">
                <span className="product-ediction-year-span">Ano de lançamento:</span> {data.anoLancamento}{' '}
              </p>
            )}
            {data.autores && (
              <p className="product-ediction-year-p">
                <span className="product-ediction-year-span">Autor:</span> {data.autores}
              </p>
            )}
          </div>

          {data.descricao && (
            <p className="product-ediction-p">
              <span className="product-ediction-description">Descrição: </span>
              {data.descricao}
            </p>
          )}
        </section>
      </section>
    </main>
  );
};

export default ProductDetails;
