import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import Gallery from '@components/Gallery/gallery';
import './style.css';
import { useAuth } from '@contexts/authContext';
import { Produto } from '@domains/Produto/Produto';
import { Link } from 'react-router-dom';

interface TagProps {
  severity: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null | undefined;
  value: string;
}

interface ProdutoDetalhesProps {
  productName: string;
  seboName?: string;
  bairro?: string;
  tags: TagProps[];
  stock: number;
  price: number;
  editionYear?: number;
  releaseYear?: number;
  author?: string;
  description?: string;
  data?: Produto;
  id?: any;
}

const ProductDetails: React.FC<ProdutoDetalhesProps> = (props: ProdutoDetalhesProps) => {
  const { productName, seboName, bairro, tags, stock, price, editionYear, releaseYear, author, description, data, id } =
    props;
  const { conta } = useAuth();

  return (
    <main className="product-frame">
      <section className="product-columns-frame">
        <section className="product-details-frame">
          <Gallery position="product-card-galleria" photos={data?.fotos} />
        </section>

        <section className="product-details-frame">
          <span className="achados-h4">{productName}</span>
          <p className="product-sebo">{bairro ? `${seboName} - ${bairro}` : `${seboName}`}</p>

          <div className="product-tags">
            {tags.map((tag: TagProps, index: number) => (
              <Tag key={index} severity={tag.severity} value={tag.value} />
            ))}
          </div>

          <p className="product-stock">{`${stock} em estoque`}</p>
          <p className="product-Achados-SubH1">{`R$ ${price.toFixed(2)}`}</p>

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
              />
              <Link to={`/product/${id}/edit`}>
                <Button icon="pi pi-pencil" label="Editar" severity="success" className="button-cesta" rounded />
              </Link>
            </div>
          )}

          <div className="product-ediction-year">
            {editionYear && (
              <p className="product-ediction-year-p">
                <span className="product-ediction-year-span">Ano da Edição:</span> {editionYear}
              </p>
            )}
            {releaseYear && (
              <p className="product-ediction-year-p">
                <span className="product-ediction-year-span">Ano de lançamento:</span> {releaseYear}{' '}
              </p>
            )}
            {author && (
              <p className="product-ediction-year-p">
                <span className="product-ediction-year-span">Autor:</span> {author}
              </p>
            )}
          </div>

          {description && (
            <p className="product-ediction-p">
              <span className="product-ediction-description">Descrição: </span>
              {description}
            </p>
          )}
        </section>
      </section>
    </main>
  );
};

export default ProductDetails;
