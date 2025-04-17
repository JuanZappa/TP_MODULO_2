import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductoImagen from "./ProductoImagen";
import ProductoPrecio from "./ProductoPrecio";
import ProductoStock from "./ProductoStock";
import BotonCompra from "./BotonCompra";
import CantidadSelector from "./CantidadSelector";
import "./../styles/ProductoDetalle.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [stock, setStock] = useState(0);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const response = await fetch("/productos.json");
        const data = await response.json();
        const prod = data.find((p) => p.id.toString() === id);
        if (prod) {
          setProducto(prod);
          setStock(prod.cantidadDisponible);
        }
      } catch (error) {
        console.error("Error cargando el producto:", error);
      }
    };

    cargarProducto();
  }, [id]);

  const handleCompra = () => {
    if (stock >= cantidad) {
      setStock((prev) => prev - cantidad);
      setMensaje("¡Gracias por su compra!");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  const handleVolver = () => {
    navigate("/productos"); // Redirige a la lista de productos
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="producto-detalle">
      <h2 className="producto-nombre">{producto.nombre}</h2>
      <ProductoImagen src={producto.imagen} alt={producto.nombre} />
      <ProductoPrecio precioReal={producto.precioReal} precioFinal={producto.precioFinal} />
      <ProductoStock cantidadDisponible={stock} />
      <CantidadSelector cantidad={cantidad} setCantidad={setCantidad} max={stock} />
      {cantidad > stock && (
        <p className="mensaje-error">No hay suficiente stock para la cantidad seleccionada.</p>
      )}
      
      
      <BotonCompra onClick={handleCompra} disabled={stock === 0 || cantidad > stock} />
      {mensaje && <p className="mensaje-compra">{mensaje}</p>}
      <button className="boton-volver" onClick={handleVolver}>Volver a la lista</button>
    </div>
  );
};

export default ProductoDetalle;
