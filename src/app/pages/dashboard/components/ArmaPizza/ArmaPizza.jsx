import React, { useState, useEffect } from 'react';
import './ArmaPizza.css';
import SignoMas from '../../ImagenesMenu/SignoMas.png'
import SignoMenos from '../../ImagenesMenu/SignoMenos.png';
import mas from '../../ImagenesMenu/mas.png';

const TAMANIOSCATALOGO = [
    { nombre: 'Mediana', precio: 70 },
    { nombre: 'Grande', precio: 90 },
    { nombre: 'Pequeña', precio: 50 }
];

const TIPOMASACATALOGO = [
    { nombre: 'Tradicional', precio: 10 },
    { nombre: 'Artesanal', precio: null }
];

const TIPOQUESOCATALOGO = [
    { nombre: 'Queso', precio: null },
    { nombre: 'Extra Queso', precio: 5 }
];

const TIPOVEGETALESCATALOGO = [
    { nombre: 'Cebolla', precio: 5 },
    { nombre: 'Pimiento Verde', precio: 5 },
    { nombre: 'Hongos', precio: 5 },
    { nombre: 'Piña', precio: 5 },
    { nombre: 'Tomate', precio: 5 }
];

const TIPOCARNECATALOGO = [
    { nombre: 'Tocino', precio: 5 },
    { nombre: 'Jamón', precio: 5 },
    { nombre: 'Pepperoni', precio: 5 },
    { nombre: 'Carne de res', precio: 5 }
];

const TIPOSSALSACATALOGO = [
    { nombre: 'Salsa de Tomate', precio: null },
    { nombre: 'Salsa Ranch', precio: null },
    { nombre: 'Salsa Alfredo', precio: null }
];


const CATTAMANIOSCATALOGO = 'TAMANIOSCATALOGO'
const CATTIPOMASACATALOGO = 'TIPOMASACATALOGO'
const CATTIPOQUESOCATALOGO = 'TIPOQUESOCATALOGO'
const CATTIPOVEGETALESCATALOGO = 'TIPOVEGETALESCATALOGO'
const CATTIPOCARNECATALOGO = 'TIPOCARNECATALOGO'
const CATTIPOSSALSACATALOGO = 'TIPOSSALSACATALOGO'


const CATALOGO_URL = 'http://3.22.100.138:4000/api/Menu/nombre/';

export default function ArmaPizza(props) {
    const [tamaniosCatalogo, setTamaniosCatalogo] = useState([]);
    const [masasCatalogo, setMasasCatalogo] = useState([]);
    const [quesosCatalogo, setQuesosCatalogo] = useState([]);
    const [vegetalesCatalogo, setVegetalesCatalogo] = useState([]);
    const [carnesCatalogo, setCarnesCatalogo] = useState([]);
    const [salsasCatalogo, setSalsasCatalogo] = useState([]);

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



    const { stateModalArmaPizza, setStateModalArmaPizza, hideScrollBodyArmaPizza } = props;
    const [precioTotal, setPrecioTotal] = useState(0);
    const [pizza, setPizza] = useState({
        tamanio: '',
        masa: '',
        salsa: '',
        queso: '',
        vegetales: [],
        carnes: [],
        precio: 0
    })

    useEffect(() => {
        calcularPrecioTotal()
        console.log('Pizza actualizada ', pizza)
    }, [pizza])

    const changeStateModal = () => {
        setStateModalArmaPizza(!stateModalArmaPizza);
        hideScrollBodyArmaPizza();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setPizza({ ...pizza, [name]: value, precio: precioTotal })
        calcularPrecioTotal()
    };

    const handleMultipleInputChange = (e) => {

        const { name, value, checked } = e.target
        if (checked) {
            pizza[name] = [...pizza[name], value]
        } else {
            const index = pizza[name].indexOf(value)
            pizza[name].splice(index, 1)
        }
        console.log(pizza)
        calcularPrecioTotal()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPizza({ ...pizza, precio: precioTotal });

        console.log('Pizza:', pizza);
        props.enviarPizza(pizza);

    };

    const agregarSeleccionBotones = (e, nombre) => {
        const div = document.querySelectorAll(`input[name="${nombre}"]`)
        div.forEach(inputHijo => {
            if (inputHijo.checked) {
                document.getElementById(`div-${inputHijo.id}`).classList.add('item-focus')
            } else {
                document.getElementById(`div-${inputHijo.id}`).classList.remove('item-focus')
            }
        })
    }

    const calcularPrecioTotal = () => {

        let [precioTamanio, precioMasa, precioQueso, precioSalsa, precioVegetales, precioCarnes] = [0, 0, 0, 0, 0, 0]

        if (pizza.tamanio !== '') {
            precioTamanio = getPrecioCatalogo(CATTAMANIOSCATALOGO, pizza.tamanio)
        }

        if (pizza.masa !== '') precioMasa = getPrecioCatalogo(CATTIPOMASACATALOGO, pizza.masa)

        if (pizza.queso !== '') precioQueso = getPrecioCatalogo(CATTIPOQUESOCATALOGO, pizza.queso)

        if (pizza.salsa !== '') precioSalsa = getPrecioCatalogo(CATTIPOSSALSACATALOGO, pizza.salsa)

        if (pizza.vegetales.length > 0) {
            pizza.vegetales.forEach((vegetal) => {
                precioVegetales += getPrecioCatalogo(CATTIPOVEGETALESCATALOGO, vegetal)
            })
        }

        if (pizza.carnes.length > 0) {
            pizza.carnes.forEach((carne) => {
                precioCarnes += getPrecioCatalogo(CATTIPOCARNECATALOGO, carne)
            })
        }
        console.log('Precios', precioTamanio, precioMasa, precioQueso, precioSalsa, precioVegetales, precioCarnes)
        setPrecioTotal(precioTamanio + precioMasa + precioQueso + precioSalsa + precioVegetales + precioCarnes)

    }

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

        <div className="modal-armar-pizza">
            <button onClick={cargarCatalogos}>Cargar Catálogos</button>
            <div className="bg-modal-armar-pizza" onClick={changeStateModal}></div>
            <div className="sidebar-modal-pizza">
                <div className="description-armar">
                    <p>
                        Debes elegir entre 1 y N ingredientes. Las opciones con * se consideran un ingrediente más.
                    </p>
                </div>
                <div className="section-scroll">
                    <form onSubmit={handleSubmit}>
                        <div className="section-pizza padding-side">
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

                        <div className="section-pizza padding-side">
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
                                                handleInputChange(e)
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
                                                handleInputChange(e)
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
                                                handleMultipleInputChange(e)
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
                                                handleMultipleInputChange(e)
                                                agregarSeleccionBotones(e, 'carnes')
                                            }}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="button-add-order-container">
                            <div className="add-remove">
                                <span className="size-icon">
                                    <img className="icon-img" src={SignoMenos} alt="Disminuir cantidad" />
                                </span>
                                <span>1</span>
                                <span className="size-icon">
                                    <img className="icon-img" src={SignoMas} alt="Aumentar cantidad" />
                                </span>
                            </div>
                            <div className="add-to-order-container">
                                <img className="add-icon" src={mas} alt="" />
                                <button type="submit" className="button-añadir-pedido">
                                    AÑADIR AL PEDIDO
                                </button>
                                <span className='min-price'>Q{0 + precioTotal}</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
