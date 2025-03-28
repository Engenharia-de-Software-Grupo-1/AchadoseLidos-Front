import './style.css';

export interface ProductCardProps {
  image: string;
  name: string;
  owner: string;
  price: number;
  backgroundBege?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const { image, name, owner, price, backgroundBege } = props;

  return (
    <div className="card-container">
      <div className="card-child" />
      <div className="card-item" />
      <div className="card-inner" />
        <div className="title">
          <div className="product-info-container">
            <p className="nome-item">
              {name.length > 40 ? `${name.substring(0, 30)}...` : name}
            </p>
            <p className="nome-sebo">{owner}</p>
          </div>
        </div>
        <div className="foto">
          <img className="foto-produto" src={image} alt="Imagem do Produto" />
          <div className="price-tag">
            <div className="money-text">R$ {price.toFixed(2).replace('.', ',')}</div>
          </div>
        </div>
      <div className="furos">
        {[...Array(12)].map((_, i) => (  
          <div key={i} className={backgroundBege ? 'furos-child-b': 'furos-child'} />  
        ))}  
      </div>
      <div className="furos-1">
        {[...Array(12)].map((_, i) => (  
          <div key={i} className={backgroundBege ? 'furos-child-1b':'furos-child-1'} />  
        ))}  
      </div>
    </div>
  );
};

export default ProductCard;