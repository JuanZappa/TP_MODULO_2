import "../styles/ProductoStock.css";

const ProductoStock = ({ cantidadDisponible }) => (
  <p className="producto-stock">Disponibles: {cantidadDisponible}</p>
);

export default ProductoStock;
