import React, { useState } from 'react';

const FormaDePago = () => {
  const [selectedOption, setSelectedOption] = useState('efectivo');
  const [cupon, setCupon] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCuponChange = (event) => {
    setCupon(event.target.value);
  };

  const handlePagar = () => {
    alert('¡Pago realizado con éxito!');
  };

  return (
    <div className="container mt-5">
      <h2>Forma de Pago</h2>
      <div className="form-check">
        <input
          type="radio"
          id="efectivo"
          className="form-check-input"
          value="efectivo"
          checked={selectedOption === 'efectivo'}
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="efectivo">
          Pagar en Efectivo
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="tarjeta"
          className="form-check-input"
          value="tarjeta"
          checked={selectedOption === 'tarjeta'}
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="tarjeta">
          Pagar con Tarjeta
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="cupon">Código del Cupón</label>
        <input
          type="text"
          id="cupon"
          className="form-control"
          value={cupon}
          onChange={handleCuponChange}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handlePagar}
        disabled={!selectedOption || (selectedOption === 'cupon' && !cupon)}
      >
        Pagar
      </button>
    </div>
  );
};

export default FormaDePago;
