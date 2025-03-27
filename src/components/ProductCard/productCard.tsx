import './style.css';

export interface ProductCardProps {
  name: string;
  image: string;
  owner: string;
  price: number;
  createdAt: Date;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const { image, name, owner, price } = props;

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
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
        <div className="furosChild" />
      </div>
      <div className="furos-1">
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
        <div className="furosChild-1" />
      </div>
    </div>
  );
};

export default ProductCard;
