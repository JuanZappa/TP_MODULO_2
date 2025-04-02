import { useState } from "react";
import ProductoImagen from "./ProductoImagen";
import ProductoPrecio from "./ProductoPrecio";
import ProductoStock from "./ProductoStock";
import BotonCompra from "./BotonCompra";
import CantidadSelector from "./CantidadSelector";
import "./../styles/ProductoDetalle.css";

const ProductoDetalle = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState({});
  const [stockDisponible, setStockDisponible] = useState({});

  const cargarProductos = async () => {
    try {
      const response = await fetch("/productos.json");
      const data = await response.json();
      setProductos(data);
      const stockInicial = {};
      const cantidadInicial = {};
      data.forEach((producto) => {
        stockInicial[producto.id] = producto.cantidadDisponible;
        cantidadInicial[producto.id] = 1;
      });
      setStockDisponible(stockInicial);
      setCantidadSeleccionada(cantidadInicial);
    } catch (error) {
      console.error("Error cargando los productos:", error);
    }
  };

  const handleCompra = (id) => {
    if (stockDisponible[id] >= cantidadSeleccionada[id]) {
      setStockDisponible((prevStock) => ({
        ...prevStock,
        [id]: prevStock[id] - cantidadSeleccionada[id],
      }));
      setMensaje("¡Gracias por su compra!");
    }
  };

  return (
    <div className="productos-lista">
      <button onClick={cargarProductos} className="cargar-productos">Cargar Productos</button>
      {productos.map((producto) => (
        <div key={producto.id} className="producto-detalle">
          <h2 className="producto-nombre">{producto.nombre}</h2>
          <ProductoImagen src={producto.imagen} alt={producto.nombre} />
          <ProductoPrecio precioReal={producto.precioReal} precioFinal={producto.precioFinal} />
          <ProductoStock cantidadDisponible={stockDisponible[producto.id]} />
          <CantidadSelector
            cantidad={cantidadSeleccionada[producto.id]}
            setCantidad={(cantidad) =>
              setCantidadSeleccionada((prev) => ({ ...prev, [producto.id]: cantidad }))
            }
            max={stockDisponible[producto.id]}
          />
          <BotonCompra onClick={() => handleCompra(producto.id)} disabled={stockDisponible[producto.id] === 0} />
        </div>
      ))}
      {mensaje && <p className="mensaje-compra">{mensaje}</p>}
    </div>
  );
};

export default ProductoDetalle;
