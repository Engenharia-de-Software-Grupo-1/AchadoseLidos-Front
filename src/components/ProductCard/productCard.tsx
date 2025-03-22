import { FunctionComponent } from 'react';
import './style.css';

const productCard:FunctionComponent = () => {
    return (
        <div className="card-1">
            <div className="cardChild" />
            <div className="cardItem" />
            <div className="cardInner" />
            <div className="title">
                <div className="itemTalSeboTalContainer">
                    <p className="itemTal">
                        <b className="itemTal1">Item Tal</b>
                    </p>
                    <p className="seboTal">Sebo tal</p>
                </div>
            </div>
            <div className="foto">
                <div className="fotoChild" />
                <div className="priceTag">
                    <div className="money-text">R$ 00,00</div>
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

export default productCard;
