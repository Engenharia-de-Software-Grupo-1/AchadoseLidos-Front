import './style.css';

export interface ProductCardProps {
  name: string;
  image: string;
  owner: string;
  price: number;
  colorFrills: string;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const { image, name, owner, price, colorFrills } = props;
  
  const getClassName = () => {
    if (colorFrills == '1') {
      return ['furosChild', 'furosChild-1'];
    } else if (colorFrills == '2') {
      return ['furosChild-loffWhite', 'furosChild-1-loffWhite'];
    }
    return ['furosChild-White', 'furosChild-1-White'];
  };

  return (
    <div className="card-container">
      <div className="cardChild" />
      <div className="cardItem" />
      <div className="cardInner" />
        <div className="title">
          <div className="itemTalSeboTalContainer">
            <p className="itemTal">
              {name.length > 40 ? `${name.substring(0, 30)}...` : name}
            </p>
            <p className="seboTal">{owner}</p>
          </div>
        </div>
        <div className="foto">
          <img className="fotoChild" src={image} alt="Imagem do Produto" />
          <div className="priceTag">
            <div className="money-text">R$ {price.toFixed(2).replace('.', ',')}</div>
          </div>
        </div>
      <div className="furos">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={getClassName()[0]} />
        ))}
      </div>
      <div className="furos-1">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={getClassName()[1]} />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
