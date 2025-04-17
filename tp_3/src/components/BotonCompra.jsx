import "../styles/BotonCompra.css";

const BotonCompra = ({ onClick, disabled }) => (
  <button className="boton-compra" onClick={onClick} disabled={disabled}>
    Comprar
  </button>
);

export default BotonCompra;
