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
  seboName?: string;
  bairro?: string;
  tags: TagProps[];
  stock: number;
  price: number;
  editionYear?: number;
  releaseYear?: number;
  author?: string;
  description?: string;
}

const ProductDetails: React.FC<ProdutoDetalhesProps> = (props: ProdutoDetalhesProps) => {
  const { productName, seboName, bairro, tags, stock, price, editionYear, releaseYear, author, description } = props;
  let accountContext = '';
  
  if (seboName) {// Trocar pra cenário real, isso foi só pra testar.
    accountContext = 'deslogado';
  }

  return (
    <main className="product-frame">
      <section className="product-columns-frame">
        <section className="product-details-frame">
          <Gallery position="product-card-galleria"/>
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

            {accountContext === 'usuario' && (
            <div className="product-actions-frame">
              <Button icon="pi pi-heart" rounded severity="danger" aria-label="Favorite" className="favorite-button" />
              <Button label="Adicionar à cesta" severity="success" rounded />
            </div>
            )}
            {accountContext === 'sebo' && (
            <div className="product-actions-frame">
              <Button icon="pi pi-trash" label="Excluir" severity="danger" aria-label="Excluir" rounded />
              <Button icon="pi pi-pencil" label="Editar" severity="success" rounded />
            </div>
            )}
            {accountContext === 'deslogado' && (
              window.location.href = '/' // trocaria pra redirecionar pra login.
            )}

          <p className="product-ediction-year">
            {editionYear && (
              <>
              <strong>Ano da Edição:</strong> {editionYear} <br />
              </>
            )}
            {releaseYear && (
              <>
              <strong>Ano de lançamento:</strong> {releaseYear} <br />
              </>
            )}
            {author && (
              <>
              <strong>Autor:</strong> {author} <br />
              </>
            )}
          </p>

            {description && (
            <p style={{ textAlign: 'justify' }}>
              <strong>Descrição: </strong>
              <br />
              {description}
            </p>
            )}
        </section>
      </section>
    </main>
  );
};

export default ProductDetails;
