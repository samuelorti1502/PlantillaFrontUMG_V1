import React, { useState } from 'react'
import './Pizza.css'
import P3 from '../../../ImagenesMenu/P3.jpg'
import Mitad from '../../../ImagenesMenu/Mitad.png'
import ArmarPizza from '../../../ImagenesMenu/ArmarPizza.png'
import CrearPizza from '../../CrearPizza/CrearPizza'
import ArmaPizza from '../../ArmaPizza/ArmaPizza'

const pizzas = [
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 }
]



export default function Pizza(props) {

    const [ stateModalPizzaMitades, setStateModalPizzaMitades ] = useState(false)
    const [ stateModalArmaPizza, setStateModalArmaPizza ] = useState(false)

    const hideScrollBodyArmaPizza = () => {
        console.log('Llamando hideScrollBody')
        if (!stateModalArmaPizza) {
            window.document.body.classList.add('hidde-scroll')
        } else {
            window.document.body.classList.remove('hidde-scroll')
        }
    }

    const hideScrollBodyPizzaMitades = () => {
        console.log('Llamando hideScrollBody')
        if (!stateModalPizzaMitades) {
            window.document.body.classList.add('hidde-scroll')
        } else {
            window.document.body.classList.remove('hidde-scroll')
        }
    }

    const changeStateModalPizzaMitades = () => {
        setStateModalPizzaMitades(!stateModalPizzaMitades)
        hideScrollBodyPizzaMitades()
    }

    const changeStateModalArmaPizza = () => {
        setStateModalArmaPizza(!stateModalArmaPizza)
        hideScrollBodyArmaPizza()
    }

    const getPizza = (pizza) => {
        console.log('Entro en el padre ', pizza)
        props.enviarPizzaSeccion(pizza)
    }

  return (
    <div id="pizzas" className='seccion-pizza'>
        <div className='div-titulo'>
            <h3>Pizzas</h3>
        </div>
        <div className='opciones-pizza'>
            <div className='op-pizza-item bg-yellow-200'>
                <a className="bt-open-modal" onClick={changeStateModalArmaPizza}>
                    <img className='pizza-icon' src={ArmarPizza} alt="Arma tu pizza" />
                    <span className='bold-text'>Arma tu pizza</span>
                </a>
            
            </div>
            <div className='op-pizza-item bg-yellow-200'>
                <a className="bt-open-modal" onClick={changeStateModalPizzaMitades}>
                    <img className='pizza-icon' src={Mitad} alt="Pizza por mitades" />
                    <span className='bold-text'>Pizza por mitades</span>
                </a>
            </div>
        </div>

        { stateModalPizzaMitades && (
            <CrearPizza stateModalPizzaMitades={stateModalPizzaMitades} 
                        setStateModalPizzaMitades={setStateModalPizzaMitades} 
                        hideScrollBodyPizzaMitades={hideScrollBodyPizzaMitades}
                        />
        )}

        {
            stateModalArmaPizza && (
                <ArmaPizza stateModalArmaPizza={stateModalArmaPizza}
                            setStateModalArmaPizza={setStateModalArmaPizza}
                            hideScrollBodyArmaPizza={hideScrollBodyArmaPizza}
                            enviarPizza={getPizza}/>
            )
        }

        <div className='pizzas'>
            {
                pizzas.map((pizza, index) => (
                    <div key={index} className='pizza-item'>
                        <img src={pizza.img} />
                        <h4>{pizza.nombre}</h4>
                        <p>{pizza.descripcion}</p>
                        <button>{pizza.tamanio}</button>
                    </div>
                ))
            }
            
        </div>
    </div>
  )
}
