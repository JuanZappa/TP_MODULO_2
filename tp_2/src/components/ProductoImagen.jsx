import "../styles/ProductoImagen.css";

const ProductoImagen = ({ src, alt }) => (
  <img src={src} alt={alt} className="producto-imagen" />
);

export default ProductoImagen;
