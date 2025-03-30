import { useNavigate } from 'react-router-dom';
import './style.css';

export interface ProductCardProps {
  id?: number;
  image: string;
  name: string;
  owner: string;
  price: number;
  begeBackground: boolean;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const { id, image, name, owner, price, begeBackground } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };

  const getClassName = () => {
    if (begeBackground) {
      return ['furosChild', 'furosChild-1'];
    }
    return ['furosChild-loffWhite', 'furosChild-1-loffWhite'];
  };

  return (
    <div className="card-container">
      <div className="card-child" />
      <div className="card-item" />
      <div className="card-inner" />
      <div className="title">
        <div className="product-info-container">
          <p className="nome-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
            {name?.length > 40 ? `${name.substring(0, 30)}...` : name}
          </p>
          <p className="nome-sebo">{owner}</p>
        </div>
      </div>
      <div className="foto">
        <img className="foto-produto" src={image} alt="Imagem do Produto" />
        <div className="price-tag">
          <div className="money-text">R$ {price?.toFixed(2).replace('.', ',')}</div>
        </div>
      </div>
      <div className="furos">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={getClassName()[0]} />
        ))}
      </div>
      <div className="furos-1">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={getClassName()[1]} />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
