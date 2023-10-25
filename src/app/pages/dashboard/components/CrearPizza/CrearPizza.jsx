import React, { useState } from 'react';
import './CrearPizza.css';
import PizzaBlack from '../../ImagenesMenu/PizzaBlack.png';
import PizzaColor from '../../ImagenesMenu/PizzaColor.png';

const TAMANIOSCATALOGO = [
  { nombre: 'Mediana', precio: '70' },
  { nombre: 'Grande', precio: '90' },
  { nombre: 'Pequeña', precio: '50' },
];

const TIPOMASACATALOGO = [
  { nombre: 'Tradicional', precio: '10' },
  { nombre: 'Artesanal', precio: null },
];
const TIPOSSALSACATALOGO = [
  { nombre: 'Salsa de Tomate', precio: null },
  { nombre: 'Salsa Ranch', precio: null },
  { nombre: 'Salsa Alfredo', precio: null },
];

const TIPOQUESOCATALOGO = [
  { nombre: 'Queso', precio: null },
  { nombre: 'Extra Queso', precio: '5' },
];

const TIPOVEGETALESCATALOGO = [
  { nombre: 'Cebolla', precio: '5' },
  { nombre: 'Pimiento Verde', precio: '5' },
  { nombre: 'Hongos', precio: '5' },
  { nombre: 'Piña', precio: '5' },
  { nombre: 'Tomate', precio: '5' },
];

const TIPOCARNECATALOGO = [
  { nombre: 'Tocino', precio: '5' },
  { nombre: 'Jamón', precio: '5' },
  { nombre: 'Pepperoni', precio: '5' },
  { nombre: 'Carne de res', precio: '5' },
];

export default function CrearPizza(props) {
  const { stateModalPizzaMitades, setStateModalPizzaMitades, hideScrollBodyPizzaMitades } = props;

  const [stepPhase, setStepPhase] = useState(1);

  const changeStateModal = () => {
    setStateModalPizzaMitades(!stateModalPizzaMitades);
    hideScrollBodyPizzaMitades();
  };

  const changeUpStepPhase = () => {
    if (stepPhase === 2) {
      // Realiza validaciones o acciones adicionales si es necesario antes de cambiar de fase
    }
    setStepPhase(stepPhase + 1);
  };

  const changeDownStepPhase = () => {
    if (stepPhase === 1) {
      // Realiza validaciones o acciones adicionales si es necesario antes de cambiar de fase
    }
    setStepPhase(stepPhase - 1);
  };

  const handleTamanioChange = (selectedTamanio) => {
    // Realiza acciones cuando cambia el tamaño
  };

  const handleTipoMasaChange = (selectedMasa) => {
    // Realiza acciones cuando cambia el tipo de masa
  };

  return (
    <div className="modal-armar-pizza">
      <div className="bg-modal-armar-pizza" onClick={changeStateModal}></div>
      <div className="sidebar-modal-pizza">
        <div className="description-armar">
          <p className="style_title">PIZZA POR MITADES</p>
          <div>
            <button onClick={changeDownStepPhase}>X</button>
          </div>
          <p>
            Debes elegir entre 1 y N ingredientes. Las opciones con * se consideran un ingrediente más.
          </p>
        </div>
        <div className="steps-pizza">
          <div className="steps-pizza-item">
            <img src={PizzaColor} alt="Disminuir cantidad" />
            <p className="styles_step-label__tlwah styles_step-label-active__scVs9">Tamaño y masa</p>
          </div>

          <div className="steps-pizza-item">
            <img src={PizzaBlack} alt="Disminuir cantidad" />
            <p className="styles_step-label__tlwah">Mitad 1</p>
          </div>

          <div className="steps-pizza-item">
            <img src={PizzaBlack} alt="Disminuir cantidad" />
            <p className="styles_step-label__tlwah">Mitad 2</p>
          </div>
        </div>

        <form>
          <div className="section-scroll padding-fase">
            {/* Fase 1 */}
            {stepPhase === 1 && (
              <div>
                <div className="section-pizza">
                  <div className="title-item">
                    <h4>TAMAÑO</h4>
                    <span>Requerido</span>
                  </div>
                  {TAMANIOSCATALOGO.map((tamanio, index) => (
                    <label htmlFor={'tamanio' + index} key={index} className="section-pizza-item" id={'div-tamanio'+ index}>
                      <h5>{tamanio.nombre}</h5>
                      <div className='div-radio'>
                        <span>{tamanio.precio != null ? `+Q${tamanio.precio}` : ''}</span>
                        <input
                          type="radio"
                          name="tamanio"
                          id={'tamanio' + index}
                          value={tamanio.nombre}
                          onChange={(e) => {
                            handleTamanioChange(tamanio.nombre)
                          }}
                          required tamanio
                        />
                      </div>
                    </label>
                  ))}
                </div>

                <div className="section-pizza">
                  <div className="title-item">
                    <h4>TIPO DE MASA</h4>
                    <span>Requerido</span>
                  </div>
                  {TIPOMASACATALOGO.map((masa, index) => (
                    <label htmlFor={'masa' + index} key={index} className="section-pizza-item" id={'div-masa' + index}>
                      <h5>{masa.nombre}</h5>
                      <div className='div-radio'>
                        <span>{masa.precio != null ? `+Q${masa.precio}` : ''}</span>
                        <input
                          type="radio"
                          name='masa'
                          id={'masa' + index}
                          value={masa.nombre}
                          onChange={(e) => {
                            handleTipoMasaChange(masa.nombre)
                          }}
                          required masa
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Fase 2 */}
            {stepPhase === 2 && (
              <div>
                {/* Agrega los campos de la segunda fase aquí */}
                {/* Por ejemplo, para Salsa Base */}
                <div className="tipos-salsa">
                  <div className="title-item">
                    <h4>Salsa Base</h4>
                    <span>Requerido</span>
                  </div>
                  {TIPOSSALSACATALOGO.map((salsa, index) => (
                    <label htmlFor={'salsa' + index} key={index} className="tipos-salsa-item item-radio-none" id={'div-salsa' + index}>
                      <span>{salsa.nombre}</span>
                      <span>{salsa.precio != null ? `+Q${salsa.precio}` : ''}</span>
                      <input
                        type="radio"
                        name="salsa"
                        id={'salsa' + index}
                        value={salsa.nombre}
                        required salsa
                      />
                    </label>
                  ))}
                </div>
                <div className="opcion-queso padding-side">
                    <div className="title-item">
                        <h4>Quesos</h4>
                        <span>Requerido</span>
                    </div>
                    <div className="queso-container-item">
                        {TIPOQUESOCATALOGO.map((queso, index) => (
                            <label htmlFor={'queso' + index} key={index} className="queso-item item-radio-none" id={'div-queso' + index}>
                                <span>{queso.nombre}</span>
                                <span>{queso.precio != null ? `+Q${queso.precio}` : ''}</span>
                                <input
                                        type="radio"
                                        name="queso"
                                        id={'queso' + index}
                                        value={queso.nombre}
                                        onChange={(e) => {
                                          /*  handleInputChange(e)
                                            agregarSeleccionBotones(e, 'queso')*/
                                        }}
                                    />
                            </label>
                        ))}
                    </div>
                </div>
              </div>
            )}
          </div>

          <div className="container-next">
            {stepPhase === 1 || stepPhase === 2? (
              <button type="button" onClick={changeUpStepPhase} className="button-next">
                <span>SIGUIENTE PASO</span>
                <span>Q80</span>
              </button>
            ) : (
              <button type="submit" className="button-next">
                <span>SUBMIT</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
