import React from 'react'
import './Bebida.css'
import Horchata from '../../../ImagenesMenu/Horchata.jpg'

const bebidas = [
    { nombre: 'HORCHATA', descripcion: 'Refrescante', tamanio: 'AGREGAR POR Q20', img: Horchata },
    { nombre: 'HORCHATA', descripcion: 'Refrescante', tamanio: 'AGREGAR POR Q20', img: Horchata },
    { nombre: 'HORCHATA', descripcion: 'Refrescante', tamanio: 'AGREGAR POR Q20', img: Horchata },
    { nombre: 'HORCHATA', descripcion: 'Refrescante', tamanio: 'AGREGAR POR Q20', img: Horchata },
    { nombre: 'HORCHATA', descripcion: 'Refrescante', tamanio: 'AGREGAR POR Q20', img: Horchata },
    { nombre: 'HORCHATA', descripcion: 'Refrescante', tamanio: 'AGREGAR POR Q20', img: Horchata }
]

export default function Bebida() {
  return (
    <div id="bebidas" className='seccion-bebidas'>
        <div className='div-titulo'>
            <h3>Bebidas</h3>
        </div>
        <div className='bebidas'>
            {
                bebidas.map((bebida, index) => (
                    <div key={index} className='bebida-item'>
                        <img src={bebida.img} />
                        <h4>{bebida.nombre}</h4>
                        <p>{bebida.descripcion}</p>
                        <button>{bebida.tamanio}</button>
                    </div>
                ))
            }
            
        </div>
    </div>
  )
}
