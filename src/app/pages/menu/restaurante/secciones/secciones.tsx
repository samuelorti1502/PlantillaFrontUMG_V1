import React, {useState, useEffect} from 'react'
import Pizza from '../../../dashboard/components/Secciones/Pizza/Pizza'
import './Secciones.css'
import Gaseosa from '../../../dashboard/components/Secciones/Gaseosa/Gaseosa'
import Bebida from '../../../dashboard/components/Secciones/Bebida/Bebida'

export default function Secciones() {
  const [informacionSeleccionada, setInformacionSeleccionada] = useState(null);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [pizzaArmar, setPizzaArmar] = useState([])
  const [gaseosasSeleccionadas, setGaseosasSeleccionadas] = useState([]);
  const [bebidasSeleccionadas, setBebidasSeleccionadas] = useState([]);
  // const [pizzaArmar, setPizzaArmar] = useState({
  //   tamanio: '',
  //   masa: '',
  //   salsa: '',
  //   queso: '',
  //   vegetales: [],
  //   carnes: [],
  //   precio: 0,
  // })

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
    calcularPrecioTotal();
    });
  
    const calcularPrecioTotal = () => {
      let total = 0;
      for (const pizza of pizzaArmar) {
        total += pizza.total;
      }
      setPrecioTotal(total);
    };

  const handleAddPizzaArmar= () => {
  
    setOrden({...orden, listArmaPizza: [...orden.listArmaPizza, {...pizzaArmar}]})
    // setPizzaArmar({...getEmptyValuesPizzaArmar()})
    console.log(orden)
  
  }

  const showGaseosa = (gaseosaChild) => {
    setGaseosasSeleccionadas([...gaseosasSeleccionadas, gaseosaChild]);
    setPrecioTotal(precioTotal + gaseosaChild.precio);
  };
  const showBebida = (bebidaChild) => {
    setBebidasSeleccionadas([...bebidasSeleccionadas, bebidaChild]);
    setPrecioTotal(precioTotal + bebidaChild.precio);
  };
 
  return (
    <div className='main'>
      <div className='container-center'>
        <div className='secciones'>
          <Pizza 
                  pizzaArmar={pizzaArmar}
                  setPizzaArmar={setPizzaArmar}
                  pizzaPorMitades={pizzaPorMitades} 
                  setPizzaPorMitades={setPizzaPorMitades}
                  //addPizzaPorMitadesToOrden={handleAddPizzaPorMitadesToOrden}
                  addPizzaArmar={handleAddPizzaArmar}/>
          <br />
          <Gaseosa enviarGaseosa={showGaseosa}/>
          <br />
          <Bebida enviarBebida={showBebida}/>
          <br />
        </div>
        <div className="tu-orden-container">
          <div className="boton-container">
            <button className="boton-continuar-pago" onClick={calcularPrecioTotal}>
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
              {/* {orden.listArmaPizza.map((pizza, index) => (
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
              ))} */}
              
                {pizzaArmar.map((pizza, index) => (
                <div key={index}>
                  <h3>ARMA PIZZA</h3>
                  {pizza.items.map((item, index) => ( <span key={index} className="pedido">{item.nombre}, </span> ) ) }
                  <p className="precio mt-5">{`Q${pizza.total}`}</p>
                </div>
              ))}
            </div>
            <br />
            <br />
            <div>
              {gaseosasSeleccionadas.map((gaseosa, index) => (
                  <h3 className="gaseosa">
                    {`${gaseosa.nombre} Q${gaseosa.precio}`}
                  </h3>
              ))}
            </div>
            <br />
            <br />
            <div>
              {bebidasSeleccionadas.map((bebida, index) => (
                  <h3 className="bebida">
                    {`${bebida.nombre} Q${bebida.precio}`}
                  </h3>
              ))}
          </div>
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