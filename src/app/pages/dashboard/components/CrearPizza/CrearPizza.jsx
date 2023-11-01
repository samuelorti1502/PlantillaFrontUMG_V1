import React, { useState, useEffect } from 'react';
import './CrearPizza.css';
import PizzaColor from '../../ImagenesMenu/PizzaColor.png';
import PizzaWhite from '../../ImagenesMenu/pizza_white.png'
import Check from '../../ImagenesMenu/correcto.png'

const CATTAMANIOSCATALOGO = 'TAMANIOSCATALOGO'
const CATTIPOMASACATALOGO = 'TIPOMASACATALOGO'
const CATTIPOQUESOCATALOGO = 'TIPOQUESOCATALOGO'
const CATTIPOVEGETALESCATALOGO = 'TIPOVEGETALESCATALOGO'
const CATTIPOCARNECATALOGO = 'TIPOCARNECATALOGO'
const CATTIPOSSALSACATALOGO = 'TIPOSSALSACATALOGO'

const CATALOGO_URL = 'http://3.22.100.138:4000/api/Menu/nombre/';

export default function CrearPizza(props) {
  const { pizzaPorMitades, setPizzaPorMitades, addPizzaPorMitadesToOrden  } = props;

  const [stepPhase, setStepPhase] = useState(1);
  const [tamaniosCatalogo, setTamaniosCatalogo] = useState([]);
  const [masasCatalogo, setMasasCatalogo] = useState([]);
  const [quesosCatalogo, setQuesosCatalogo] = useState([]);
  const [vegetalesCatalogo, setVegetalesCatalogo] = useState([]);
  const [carnesCatalogo, setCarnesCatalogo] = useState([]);
  const [salsasCatalogo, setSalsasCatalogo] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);


  

  useEffect(
    () => {
        cargarCatalogos()
    }, []
  )

  useEffect(() => {
    calcularPrecioTotal()
  }, [pizzaPorMitades])

  const agregarSeleccionBotones = (e, nombre) => {
    const div = document.querySelectorAll(`input[name="${nombre}"]`)
    console.log('Div clic ', div)
    div.forEach(inputHijo => {
        if (inputHijo.checked) {
            document.getElementById(`div-${inputHijo.id}`).classList.add('item-focus')
        } else {
            document.getElementById(`div-${inputHijo.id}`).classList.remove('item-focus')
        }
    })
  }


  const consumirCatalogos = (nombreCatalogo, funcionSet) => {
    fetch(CATALOGO_URL + nombreCatalogo)
        .then((response) => response.json())
        .then((data) => {
            const catalogoReducido = data.map((item) => ({
                nombre: item.nombre,
                precio: item.precio,
            }));
            funcionSet(catalogoReducido);
        })
        .catch((error) => {
            console.error('Error al cargar el catálogo: ' + nombreCatalogo, error);
        });
};

  const cargarCatalogos = () => {
      consumirCatalogos('Masas', setMasasCatalogo);
      consumirCatalogos('Quesos', setQuesosCatalogo);
      consumirCatalogos('Vegetales', setVegetalesCatalogo);
      consumirCatalogos('Salsas', setSalsasCatalogo);
      consumirCatalogos('Carnes', setCarnesCatalogo);
      consumirCatalogos('Tamanios', setTamaniosCatalogo);
  };

  const changeUpStepPhase = () => {
    if (stepPhase === 3) {
      return
    }
    setStepPhase(stepPhase + 1);
  };

  const changeDownStepPhase = () => {
    if (stepPhase === 1) {
      return
    }
    setStepPhase(stepPhase - 1);
  };

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;

    setPizzaPorMitades({ ...pizzaPorMitades, [name]: value })
    console.log('handleInputChange ', pizzaPorMitades)
    calcularPrecioTotal()
  };

  const handleInputChangeMitad1 = e => {
    const { name, value } = e.target;
    setPizzaPorMitades({ ...pizzaPorMitades, mitad1 : { ...pizzaPorMitades.mitad1, [name] : value} })
    calcularPrecioTotal()
  }

  const handleInputChangeMitad2 = e => {
    const { name, value } = e.target;
    setPizzaPorMitades({ ...pizzaPorMitades, mitad2 : { ...pizzaPorMitades.mitad2, [name] : value} })
    calcularPrecioTotal()
  }



  const handleMultipleInputChangeMitad1 = e => {
    const { name, value, checked } = e.target
    console.log(pizzaPorMitades.mitad1[name])
    if (checked) {
        pizzaPorMitades.mitad1[name] = [...pizzaPorMitades.mitad1[name], value]
    } else {
        const index = pizzaPorMitades.mitad1[name].indexOf(value)
        pizzaPorMitades.mitad1[name].splice(index, 1)
    }
    setPizzaPorMitades({...pizzaPorMitades})
    calcularPrecioTotal()
  }

  const handleMultipleInputChangeMitad2 = e => {
    const { name, value, checked } = e.target
    console.log(pizzaPorMitades.mitad2[name])
    if (checked) {
        pizzaPorMitades.mitad2[name] = [...pizzaPorMitades.mitad2[name], value]
    } else {
        const index = pizzaPorMitades.mitad2[name].indexOf(value)
        pizzaPorMitades.mitad2[name].splice(index, 1)
    }
    setPizzaPorMitades({...pizzaPorMitades})
    calcularPrecioTotal()
  }

  const calcularPrecioTotal = () => {

    let [ precioTamanio, precioMasa, mitad1PrecioQueso, mitad1PrecioSalsa, mitad1PrecioVegetales, mitad1PrecioCarnes,
        mitad2PrecioSalsa, mitad2PrecioQueso, mitad2PrecioVegetales, mitad2PrecioCarnes] = Array(10).fill(0)

    if (pizzaPorMitades.tamanio !== '') {
        precioTamanio = getPrecioCatalogo(CATTAMANIOSCATALOGO, pizzaPorMitades.tamanio)
    }

    if (pizzaPorMitades.masa !== '') precioMasa = getPrecioCatalogo(CATTIPOMASACATALOGO, pizzaPorMitades.masa)

    if (pizzaPorMitades.mitad1.queso !== '') mitad1PrecioQueso = getPrecioCatalogo(CATTIPOQUESOCATALOGO, pizzaPorMitades.mitad1.queso)

    if (pizzaPorMitades.mitad1.salsa !== '') mitad1PrecioSalsa = getPrecioCatalogo(CATTIPOSSALSACATALOGO, pizzaPorMitades.mitad1.salsa)

    if (pizzaPorMitades.mitad1.vegetales.length > 0) {
        pizzaPorMitades.mitad1.vegetales.forEach((vegetal) => {
            mitad1PrecioVegetales += getPrecioCatalogo(CATTIPOVEGETALESCATALOGO, vegetal)
        })
    }

    if (pizzaPorMitades.mitad1.carnes.length > 0) {
        pizzaPorMitades.mitad1.carnes.forEach((carne) => {
            mitad1PrecioCarnes += getPrecioCatalogo(CATTIPOCARNECATALOGO, carne)
        })
    }

    if (pizzaPorMitades.mitad2.queso !== '') mitad2PrecioQueso = getPrecioCatalogo(CATTIPOQUESOCATALOGO, pizzaPorMitades.mitad2.queso)

    if (pizzaPorMitades.mitad2.salsa !== '') mitad2PrecioSalsa = getPrecioCatalogo(CATTIPOSSALSACATALOGO, pizzaPorMitades.mitad2.salsa)

    if (pizzaPorMitades.mitad2.vegetales.length > 0) {
        pizzaPorMitades.mitad2.vegetales.forEach((vegetal) => {
            mitad2PrecioVegetales += getPrecioCatalogo(CATTIPOVEGETALESCATALOGO, vegetal)
        })
    }

    if (pizzaPorMitades.mitad2.carnes.length > 0) {
        pizzaPorMitades.mitad2.carnes.forEach((carne) => {
            mitad2PrecioCarnes += getPrecioCatalogo(CATTIPOCARNECATALOGO, carne)
        })
    }


    console.log('Precios', precioTamanio, precioMasa, mitad1PrecioQueso, mitad1PrecioSalsa, mitad1PrecioVegetales, mitad1PrecioCarnes,
                    mitad2PrecioSalsa, mitad2PrecioQueso, mitad2PrecioVegetales, mitad2PrecioCarnes)
    setPrecioTotal(precioTamanio + precioMasa + mitad1PrecioQueso + mitad1PrecioSalsa + mitad1PrecioVegetales + mitad1PrecioCarnes +
        mitad2PrecioSalsa + mitad2PrecioQueso + mitad2PrecioVegetales + mitad2PrecioCarnes)
    
    console.log('Total pizza por mitades ', precioTotal)


}

const handleSubmit = (e) => {
    e.preventDefault();
    calcularPrecioTotal()
    setPizzaPorMitades({ ...pizzaPorMitades, precio: precioTotal });

    console.log('Pizza mitra:', pizzaPorMitades);
    addPizzaPorMitadesToOrden()
    //document.getElementById('formPizzaMitades').reset()
    setStepPhase(1)
};

  const getPrecioCatalogo = (catalogo, nombre) => {

      switch (catalogo) {
          case 'TAMANIOSCATALOGO':
              return getValue(tamaniosCatalogo.find((elemento) => elemento.nombre === nombre).precio);
          case 'TIPOMASACATALOGO':
              return getValue(masasCatalogo.find((elemento) => elemento.nombre === nombre).precio);
          case 'TIPOQUESOCATALOGO':
              return getValue(quesosCatalogo.find((elemento) => elemento.nombre === nombre).precio);
          case 'TIPOVEGETALESCATALOGO':
              return getValue(vegetalesCatalogo.find((elemento) => elemento.nombre === nombre).precio);
          case 'TIPOCARNECATALOGO':
              return getValue(carnesCatalogo.find((elemento) => elemento.nombre === nombre).precio);
          case 'TIPOSSALSACATALOGO':
              return getValue(salsasCatalogo.find((elemento) => elemento.nombre === nombre).precio);
          default:
              return 'NA';
      }

  }

  const getValue = (value) => {
      return value == null ? 0 : value
  }
  return (
    <div className="">
      <div className="bg-modal-armar-pizza"></div>
      <div className="sidebar-modal-pizza">
        <div className="description-armar">
          <p className="style_title">PIZZA POR MITADES</p>
          <div>
            { stepPhase !== 1 && (
              <button onClick={changeDownStepPhase}>Regresar</button>
            )}
            
          </div>
          <p>
            Debes elegir entre 1 y N ingredientes. Las opciones con * se consideran un ingrediente más.
          </p>
        </div>
        <div className="steps-pizza">
          <div className="steps-pizza-item">
            <img src={ stepPhase === 1 ? PizzaColor : Check } alt="Disminuir cantidad" />
            <p className="styles_step-label__tlwah styles_step-label-active__scVs9">Tamaño y masa</p>
          </div>

          <div className="steps-pizza-item">
            <img src={ stepPhase === 1 ? PizzaWhite : stepPhase === 2 ? PizzaColor :  Check } alt="Disminuir cantidad" />
            <p className="styles_step-label__tlwah">Mitad 1</p>
          </div>

          <div className="steps-pizza-item">
            <img src={ stepPhase === 1 || stepPhase === 2 ? PizzaWhite : stepPhase === 3 ? PizzaColor : Check} alt="Disminuir cantidad" />
            <p className="styles_step-label__tlwah">Mitad 2</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} id='formPizzaMitades'>
          <div className="section-scroll padding-fase">
            {/* Fase 1 */}
            {stepPhase === 1 && (
              <div>
                <div className="section-pizza">
                  <div className="title-item">
                    <h4>TAMAÑO</h4>
                    <span>Requerido</span>
                  </div>
                  {tamaniosCatalogo.map((tamanio, index) => (
                      <label htmlFor={'tamanio' + index} key={index} className="section-pizza-item" id={'div-tamanio' + index}>
                          <h5>{tamanio.nombre}</h5>
                          <div className='div-radio'>
                              <span>{tamanio.precio != null ? `+Q${tamanio.precio}` : ''}</span>
                              <input
                                  type="radio"
                                  name="tamanio"
                                  id={'tamanio' + index}
                                  value={tamanio.nombre}
                                  onChange={(e) => {
                                      handleInputChange(e)
                                      agregarSeleccionBotones(e, 'tamanio')

                                  }}
                                  required={true}
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
                  {masasCatalogo.map((masa, index) => (
                      <label htmlFor={'masa' + index} key={index} className="section-pizza-item" id={'div-masa' + index}>
                          <h5>{masa.nombre}</h5>
                          <div className='div-radio'>
                              <span>{masa.precio > 0 ? `+Q${masa.precio}` : ''}</span>
                              <input
                                  type="radio"
                                  name='masa'
                                  id={'masa' + index}
                                  value={masa.nombre}
                                  onChange={(e) => {
                                      handleInputChange(e)
                                      agregarSeleccionBotones(e, 'masa')
                                  }}
                                  required={true}
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
                <div className="tipos-salsa padding-side">
                    <div className="title-item">
                        <h4>Salsa Base</h4>
                        <span>Requerido</span>
                    </div>
                    <div className="tipos-salsa-container-item">
                        {salsasCatalogo.map((salsa, index) => (
                            <label htmlFor={'salsa' + index} key={index} className="tipos-salsa-item item-radio-none" id={'div-salsa' + index}>
                                <span>{salsa.nombre}</span>
                                <span>{salsa.precio > 0 ? `+Q${salsa.precio}` : ''}</span>
                                <input
                                    type="radio"
                                    name="salsa"
                                    id={'salsa' + index}
                                    value={salsa.nombre}
                                    onChange={(e) => {
                                        handleInputChangeMitad1(e)
                                        agregarSeleccionBotones(e, 'salsa')
                                    }}
                                    required={true}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="opcion-queso padding-side">
                    <div className="title-item">
                        <h4>Quesos</h4>
                        <span>Requerido</span>
                    </div>
                    <div className="queso-container-item">
                        {quesosCatalogo.map((queso, index) => (
                            <label htmlFor={'queso' + index} key={index} className="queso-item item-radio-none" id={'div-queso' + index}>
                                <span>{queso.nombre}</span>
                                <span>{queso.precio > 0 ? `+Q${queso.precio}` : ''}</span>
                                <input
                                    type="radio"
                                    name="queso"
                                    id={'queso' + index}
                                    value={queso.nombre}
                                    onChange={(e) => {
                                        handleInputChangeMitad1(e)
                                        agregarSeleccionBotones(e, 'queso')
                                    }}
                                    required={true}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="tipos-vegetales padding-side">
                    <div className="title-item">
                        <h4>Vegetales</h4>
                        <span>Opcional</span>
                    </div>
                    <div className="tipos-vegetales-container-item">
                        {vegetalesCatalogo.map((vegetal, index) => (
                            <label htmlFor={'vegetales' + index} key={index} className="tipos-vegetales-item item-radio-none" id={'div-vegetales' + index}>
                                <span>{vegetal.nombre}</span>
                                <span>{vegetal.precio != null ? `+Q${vegetal.precio}` : ''}</span>
                                <input
                                    type="checkbox"
                                    name="vegetales"
                                    id={'vegetales' + index}
                                    value={vegetal.nombre}
                                    onChange={(e) => {
                                        handleMultipleInputChangeMitad1(e)
                                        agregarSeleccionBotones(e, 'vegetales')
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="tipos-carne padding-side">
                    <div className="title-item">
                        <h4>Carnes</h4>
                        <span>Opcional</span>
                    </div>
                    <div className="tipos-carne-container-item">
                        {carnesCatalogo.map((carne, index) => (
                            <label htmlFor={'carnes' + index} key={index} className="tipos-carne-item item-radio-none" id={'div-carnes' + index}>
                                <span>{carne.nombre}</span>
                                <span>{carne.precio != null ? `+Q${carne.precio}` : ''}</span>
                                <input
                                    type="checkbox"
                                    name="carnes"
                                    id={'carnes' + index}
                                    value={carne.nombre}
                                    onChange={(e) => {
                                        handleMultipleInputChangeMitad1(e)
                                        agregarSeleccionBotones(e, 'carnes')
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>
              </div>
            )}

            {/* Fase 3 */}
            {stepPhase === 3 && (
              <div>
                {/* Agrega los campos de la segunda fase aquí */}
                {/* Por ejemplo, para Salsa Base */}
                <div className="tipos-salsa padding-side">
                    <div className="title-item">
                        <h4>Salsa Base</h4>
                        <span>Requerido</span>
                    </div>
                    <div className="tipos-salsa-container-item">
                        {salsasCatalogo.map((salsa, index) => (
                            <label htmlFor={'salsa' + index} key={index} className="tipos-salsa-item item-radio-none" id={'div-salsa' + index}>
                                <span>{salsa.nombre}</span>
                                <span>{salsa.precio > 0 ? `+Q${salsa.precio}` : ''}</span>
                                <input
                                    type="radio"
                                    name="salsa"
                                    id={'salsa' + index}
                                    value={salsa.nombre}
                                    onChange={(e) => {
                                        handleInputChangeMitad2(e)
                                        agregarSeleccionBotones(e, 'salsa')
                                    }}
                                    required={true}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="opcion-queso padding-side">
                    <div className="title-item">
                        <h4>Quesos</h4>
                        <span>Requerido</span>
                    </div>
                    <div className="queso-container-item">
                        {quesosCatalogo.map((queso, index) => (
                            <label htmlFor={'queso' + index} key={index} className="queso-item item-radio-none" id={'div-queso' + index}>
                                <span>{queso.nombre}</span>
                                <span>{queso.precio > 0 ? `+Q${queso.precio}` : ''}</span>
                                <input
                                    type="radio"
                                    name="queso"
                                    id={'queso' + index}
                                    value={queso.nombre}
                                    onChange={(e) => {
                                        handleInputChangeMitad2(e)
                                        agregarSeleccionBotones(e, 'queso')
                                    }}
                                    required={true}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="tipos-vegetales padding-side">
                    <div className="title-item">
                        <h4>Vegetales</h4>
                        <span>Opcional</span>
                    </div>
                    <div className="tipos-vegetales-container-item">
                        {vegetalesCatalogo.map((vegetal, index) => (
                            <label htmlFor={'vegetales' + index} key={index} className="tipos-vegetales-item item-radio-none" id={'div-vegetales' + index}>
                                <span>{vegetal.nombre}</span>
                                <span>{vegetal.precio != null ? `+Q${vegetal.precio}` : ''}</span>
                                <input
                                    type="checkbox"
                                    name="vegetales"
                                    id={'vegetales' + index}
                                    value={vegetal.nombre}
                                    onChange={(e) => {
                                        handleMultipleInputChangeMitad2(e)
                                        agregarSeleccionBotones(e, 'vegetales')
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="tipos-carne padding-side">
                    <div className="title-item">
                        <h4>Carnes</h4>
                        <span>Opcional</span>
                    </div>
                    <div className="tipos-carne-container-item">
                        {carnesCatalogo.map((carne, index) => (
                            <label htmlFor={'carnes' + index} key={index} className="tipos-carne-item item-radio-none" id={'div-carnes' + index}>
                                <span>{carne.nombre}</span>
                                <span>{carne.precio != null ? `+Q${carne.precio}` : ''}</span>
                                <input
                                    type="checkbox"
                                    name="carnes"
                                    id={'carnes' + index}
                                    value={carne.nombre}
                                    onChange={(e) => {
                                        handleMultipleInputChangeMitad2(e)
                                        agregarSeleccionBotones(e, 'carnes')
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
            {stepPhase === 1 || stepPhase === 2 ? (
              <button type="button" onClick={changeUpStepPhase} className="button-next">
                <span>SIGUIENTE PASO</span>
                <span className='min-price'>Q{0 + precioTotal}</span>
              </button>
            ) : (
              <button type="submit" className="button-next">
                <span>AGREGAR A LA ORDEN</span>
                <span className='min-price'>Q{0 + precioTotal}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

