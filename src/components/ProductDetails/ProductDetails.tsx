import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import Gallery from '@components/Gallery/gallery';
import './style.css';

interface TagProps {
  severity: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null | undefined;
  value: string;
}

interface ProdutoDetalhesProps {
  productName: string;
  seboName?: string; // não é opcional.
  bairro: string;
  tags: TagProps[];
  stock: number;
  price: number;
  editionYear?: number;
  releaseYear: number;
  author?: string;
  description?: string;
}

const ProductDetails: React.FC<ProdutoDetalhesProps> = (props: ProdutoDetalhesProps) => {
  const { productName, seboName, bairro, tags, stock, price, editionYear, releaseYear, author, description } = props;
  return (
    <main className="product-frame">
      <section className="product-columns-frame">
        <section className="product-details-frame">
          <Gallery position="product-card-galleria"/>
        </section>

        <section className="product-details-frame">
          <span className="achados-h4">{productName}</span>
          <p className="product-sebo">{`${seboName} - ${bairro}`}</p>

          <div className="product-tags">
            {tags.map((tag: TagProps, index: number) => (
              <Tag key={index} severity={tag.severity} value={tag.value} />
            ))}
          </div>

          <p className="product-stock">{`${stock} em estoque`}</p>
          <p className="product-Achados-SubH1">{`R$ ${price.toFixed(2)}`}</p>

          <div className="product-actions-frame">
            <Button icon="pi pi-heart" rounded severity="danger" aria-label="Favorite" className="favorite-button" />
            <Button label="Adicionar à cesta" severity="success" rounded />
          </div>

          <p className="product-ediction-year">
            <strong>Ano da Edição:</strong> {editionYear} <br />
            <strong>Ano de lançamento:</strong> {releaseYear} <br />
            <strong>Autor:</strong> {author}
          </p>

          <p style={{ textAlign: 'justify' }}>
            <strong>Descrição: </strong>
            <br></br>
            {description}
          </p>
        </section>
      </section>
    </main>
  );
};

export default ProductDetails;
