import React from 'react'
import './Gaseosa.css'
import Coca from '../../../ImagenesMenu/Coca.jpg'

const gaseosas = [
    { nombre: 'Coca Cola', descripcion: 'Refrescante y Burbujeante', tamanio: 'AGREGAR POR Q15', img: Coca },
    { nombre: 'Coca Cola', descripcion: 'Refrescante y Burbujeante', tamanio: 'AGREGAR POR Q15', img: Coca },
    { nombre: 'Coca Cola', descripcion: 'Refrescante y Burbujeante', tamanio: 'AGREGAR POR Q15', img: Coca },
    { nombre: 'Coca Cola', descripcion: 'Refrescante y Burbujeante', tamanio: 'AGREGAR POR Q15', img: Coca },
    { nombre: 'Coca Cola', descripcion: 'Refrescante y Burbujeante', tamanio: 'AGREGAR POR Q15', img: Coca },
    { nombre: 'Coca Cola', descripcion: 'Refrescante y Burbujeante', tamanio: 'AGREGAR POR Q15', img: Coca }
]

export default function Gaseosa() {
  return (
    <section id="gaseosas" className='seccion-gaseosas'>
        <div className='div-titulo'>
            <h3>Gaseosas</h3>
        </div>
        <div className='gaseosas'>
            {
                gaseosas.map((gaseosa, index) => (
                    <div key={index} className='gaseosa-item'>
                        <img src={gaseosa.img} />
                        <h4>{gaseosa.nombre}</h4>
                        <p>{gaseosa.descripcion}</p>
                        <button>{gaseosa.tamanio}</button>
                    </div>
                ))
            }
            
        </div>
    </section>
  )
}
