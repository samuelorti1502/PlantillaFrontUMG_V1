import React, {useState} from 'react'
import Pizza from '../../../dashboard/components/Secciones/Pizza/Pizza'
import './Secciones.css'
import Gaseosa from '../../../dashboard/components/Secciones/Gaseosa/Gaseosa'
import Bebida from '../../../dashboard/components/Secciones/Bebida/Bebida'

export default function Secciones() {
  const [informacionSeleccionada, setInformacionSeleccionada] = useState(null);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [pizza, setPizza] = useState({
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0,
  })

  const showPizza = (pizzaChild: any) => {
    setPizza(pizzaChild);
    setPrecioTotal(precioTotal + pizzaChild.precio);
  };


  return (
    <div className='main'>
      <div className='container-center'>
        <div className='secciones'>
          <Pizza enviarPizzaSeccion={showPizza}/>
          <br />
          <Gaseosa />
          <br />
          <Bebida />
          <br />
        </div>
        <div className="tu-orden-container">
          <div className="boton-container">
            <button className="boton-continuar-pago">
              CONTINUAR AL PAGO
              <span className="precio-total">{precioTotal > 0 && `Q${precioTotal}`}</span>
            </button>
          </div>
          <div className="titulo-orden">
            <h1 className="tu-orden">TU ORDEN</h1>
          </div>
          <span className="pedido">{pizza.tamanio}{pizza.tamanio && ','}</span>
            <span className="pedido">{pizza.masa}{pizza.masa && ','}</span>
            <span className="pedido">{pizza.salsa}{pizza.salsa && ','}</span>
            <span className="pedido">{pizza.queso}{pizza.queso && ','}</span>
            <span className="pedido">{pizza.vegetales.join(', ')}</span>
            <span className="pedido">{pizza.carnes.join(', ')}</span>
            <br />
            <span className="precio">{pizza.precio > 0 && `Q${pizza.precio}`}</span>
            <br />
        </div>
      </div>
    </div>
  )
}
