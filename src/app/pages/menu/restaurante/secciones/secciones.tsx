import React, {useState, useEffect} from 'react'
import Pizza from '../../../dashboard/components/Secciones/Pizza/Pizza'
import './Secciones.css'
import Gaseosa from '../../../dashboard/components/Secciones/Gaseosa/Gaseosa'
import Bebida from '../../../dashboard/components/Secciones/Bebida/Bebida'

export default function Secciones() {
  const [pizza, setPizza] = useState({
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0,
  })

  useEffect(() => {
    calcularPrecio()
  }, [pizza])

  const showPizza = (pizzaChild: any) => {
    console.log('Pizza en secciones', pizzaChild)
    setPizza(pizzaChild)
  }

  // Calcula el precio de la pizza
  const calcularPrecio = () => {
    // Aquí debes realizar el cálculo del precio en base a las opciones seleccionadas en pizza.
    // Esto podría ser similar a la función calcularPrecioTotal en tu componente ArmaPizza.
    let precioCalculado = 0 // Calcula el precio aquí
    setPizza({...pizza, precio: precioCalculado})
  }

  return (
    <div className='main'>
      <div className='container-center'>
        <div className='secciones'>
          <Pizza />
          <Gaseosa />
          <Bebida />
        </div>
        <div className='orden'>
          <h3>Tu orden</h3>
          <span>{pizza.tamanio}</span>
          <span>{pizza.masa}</span>
          <span>{pizza.salsa}</span>
          <span>{pizza.vegetales.join(', ')}</span>
          <span>{pizza.carnes.join(', ')}</span>
          <span>{pizza.precio}</span>
        </div>
      </div>
    </div>
  )
}
