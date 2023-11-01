import React, {useState, useEffect} from 'react'
import Pizza from '../../../dashboard/components/Secciones/Pizza/Pizza'
import './Secciones.css'
import Gaseosa from '../../../dashboard/components/Secciones/Gaseosa/Gaseosa'
import Bebida from '../../../dashboard/components/Secciones/Bebida/Bebida'

export default function Secciones() {
  const [informacionSeleccionada, setInformacionSeleccionada] = useState(null);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [pizzaArmar, setPizzaArmar] = useState({
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0,
  })

  const [ pizzaPorMitades, setPizzaPorMitades ] = useState({
    tamanio: '',
    masa: '',
    mitad1: {
      salsa: '',
      queso: '',
      vegetales: [],
      carnes: []
    },
    mitad2: {
      salsa: '',
      queso: '',
      vegetales: [],
      carnes: []
    },
    precio: 0
  })


  const [ orden, setOrden ] = useState({
    listPizzaPorMitades: [],
    listArmaPizza: [],
    total: 0,
    mesa: 0
  })

  
  useEffect(() => {
    let total = 0;

    orden.listArmaPizza.forEach((pizza) => {
      total += pizza.precio;
    });

    orden.listPizzaPorMitades.forEach((pizza) => {
      total += pizza.precio;
    });


    setPrecioTotal(total);
  }, [orden.listArmaPizza, orden.listPizzaPorMitades]);
  const handleAddPizzaPorMitadesToOrden = () => {
  
    setOrden({...orden, listPizzaPorMitades: [...orden.listPizzaPorMitades, {...pizzaPorMitades}]})
    setPizzaPorMitades({...getEmptyValuesPizzaPorMitades()})
    console.log(orden)
  
  }

  const handleAddPizzaArmar= () => {
  
    setOrden({...orden, listArmaPizza: [...orden.listArmaPizza, {...pizzaArmar}]})
    setPizzaArmar({...getEmptyValuesPizzaArmar()})
    console.log(orden)
  
  }


  return (
    <div className='main'>
      <div className='container-center'>
        <div className='secciones'>
          <Pizza 
                  pizzaArmar={pizzaArmar}
                  setPizzaArmar={setPizzaArmar}
                  pizzaPorMitades={pizzaPorMitades} 
                  setPizzaPorMitades={setPizzaPorMitades}
                  addPizzaPorMitadesToOrden={handleAddPizzaPorMitadesToOrden}
                  addPizzaArmar={handleAddPizzaArmar}/>
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
          <div className="cuerpo-orden">
            
            <br />
            <div>
              {orden.listArmaPizza.map((pizza, index) => (
                <div key={index}>
                <h3>ARMA PIZZA</h3>
                <span className="pedido">{pizza.tamanio}{pizza.tamanio && ','}</span>
                <span className="pedido">{pizza.masa}{pizza.masa && ','}</span>
                <span className="pedido">{pizza.salsa}{pizza.salsa && ','}</span>
                <span className="pedido">{pizza.queso}{pizza.queso && ','}</span>
                <span className="pedido">{pizza.vegetales.join(', ')}</span>
                <span className="pedido">{pizza.carnes.join(', ')}</span>
                <br />
                <span className="precio">{pizza.precio > 0 && `Q${pizza.precio}`}</span>
                <br />
                <br />
                </div>
              ))}
            </div>
            <br />
            <br />
            <div>
              {orden.listPizzaPorMitades.map((pizza, index) => (
                <div key={index}>
                  <h3>PIZZA POR MITADES</h3>
                <span className="pedido">{pizza.tamanio}{pizza.tamanio && ','}</span>
                <span className="pedido">{pizza.masa}</span>
                <div>
                  <h4>Mitad 1:</h4>
                  <span className="pedido">{pizza.mitad1.salsa}{pizza.mitad1.salsa && ','}</span>
                  <span className="pedido">{pizza.mitad1.queso}{pizza.mitad1.queso && ','}</span>
                  <span className="pedido">{pizza.mitad1.vegetales.join(', ')}</span>
                  <span className="pedido">{pizza.mitad1.carnes.join(', ')}</span>
                </div>
                <div>
                  <h4>Mitad 2:</h4>
                  <span className="pedido">{pizza.mitad2.salsa}{pizza.mitad2.salsa && ','}</span>
                  <span className="pedido">{pizza.mitad2.queso}{pizza.mitad2.queso && ','}</span>
                  <span className="pedido">{pizza.mitad2.vegetales.join(', ')}</span>
                  <span className="pedido">{pizza.mitad2.carnes.join(', ')}</span>
                </div>
                <br />
                <span className="precio">{pizza.precio > 0 && `Q${pizza.precio}`}</span>
                <br />
                </div>
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}

function getEmptyValuesPizzaPorMitades() {
  return {
      tamanio: '',
      masa: '',
      mitad1: {
        salsa: '',
        queso: '',
        vegetales: [],
        carnes: []
      },
      mitad2: {
        salsa: '',
        queso: '',
        vegetales: [],
        carnes: []
      },
      precio: 0
    }
}

function getEmptyValuesPizzaArmar() {
  return {
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0,
  }
}