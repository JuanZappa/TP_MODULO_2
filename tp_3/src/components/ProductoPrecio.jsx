import "../styles/ProductoPrecio.css";

const ProductoPrecio = ({ precioReal, precioFinal }) => {
  const porcentajeOferta = Math.round(
    ((precioReal - precioFinal) / precioReal) * 100
  );

  return (
    <div className="producto-precio">
      <p className="precio-real">Precio Real: ${precioReal}</p>
      <p className="precio-final">Precio Final: ${precioFinal}</p>
      <p className="porcentaje-oferta">Descuento: {porcentajeOferta}%</p>
    </div>
  );
};

export default ProductoPrecio;
