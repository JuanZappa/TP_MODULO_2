import "./../styles/CantidadSelector.css";

const CantidadSelector = ({ cantidad, setCantidad, max }) => {
    return (
      <div>
        <label>Cantidad: </label>
        <input
          type="number"
          min="1"
          max={max}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="cantidad-input"
        />
      </div>
    );
  };
  
  export default CantidadSelector;
  