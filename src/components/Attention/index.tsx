import './style.css';

const Atention = () => {
  return (
    <div className="form-product-atention">
      <div className="border-left-atention" />
      <div className="form-product-atention-message">
        <span className="atention-message">
          <i className="pi pi-exclamation-triangle"></i>
          Atenção
        </span>
        <span className="text-atention-message">
          Seu produto estará disponível apenas para visualização, caso deseje vender via plataforma, selecione a opção
          de confirmação na edição de seu perfil.
        </span>
      </div>
    </div>
  );
};

export default Atention;
