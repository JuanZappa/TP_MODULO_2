import { useState } from "react";
import ProductoImagen from "./ProductoImagen";
import ProductoPrecio from "./ProductoPrecio";
import ProductoStock from "./ProductoStock";
import BotonCompra from "./BotonCompra";
import CantidadSelector from "./CantidadSelector";
import "./../styles/ProductoDetalle.css";

const ProductoDetalle = () => {
  const [mensaje, setMensaje] = useState("");
  const [cantidadDisponible, setCantidadDisponible] = useState(5);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const producto = {
    nombre: "Laptop Gamer",
    imagen: "./laptop.jpg",
    precioReal: 1500,
    precioFinal: 1200,
  };

  const handleCompra = () => {
    if (cantidadDisponible >= cantidadSeleccionada) {
      setCantidadDisponible(cantidadDisponible - cantidadSeleccionada);
      setMensaje("¡Gracias por su compra!");
    }
  };

  return (
    <div className="producto-detalle">
      <h2 className="producto-nombre">{producto.nombre}</h2>
      <ProductoImagen src={producto.imagen} alt={producto.nombre} />
      <ProductoPrecio precioReal={producto.precioReal} precioFinal={producto.precioFinal} />
      <ProductoStock cantidadDisponible={cantidadDisponible} />
      <CantidadSelector cantidad={cantidadSeleccionada} setCantidad={setCantidadSeleccionada} max={cantidadDisponible} />
      <BotonCompra onClick={handleCompra} disabled={cantidadDisponible === 0} />
      {mensaje && <p className="mensaje-compra">{mensaje}</p>}
    </div>
  );
};

export default ProductoDetalle;
