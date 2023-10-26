import axios from 'axios'
import {useEffect, useState} from 'react'
import SeccionesMenu from '../secciones/SeccionesMenu'
import SignoMas from '../../../dashboard/ImagenesMenu/SignoMas.png'
import SignoMenos from '../../../dashboard/ImagenesMenu/SignoMenos.png';
import mas from '../../../dashboard/ImagenesMenu/mas.png';

const Arma = (props: any) => {
  const {stateModalArmaPizza, setStateModalArmaPizza, hideScrollBodyArmaPizza} = props
  const [precioTotal, setPrecioTotal] = useState(0)
  const [pizza, setPizza] = useState({
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0,
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setPizza({...pizza, precio: precioTotal})

    console.log('Pizza:', pizza)
    props.enviarPizza(pizza)
  }

  const changeStateModal = () => {
    setStateModalArmaPizza(!stateModalArmaPizza)
    hideScrollBodyArmaPizza()
  }

  const CATALOGO_URL = 'http://3.22.100.138:4000/api/Menu/nombre/'
  
  const consumirCatalogos = (nombreCatalogo: string, funcionSet: any) => {
    // Realizar la llamada a la API con el nombre del catálogo
    axios
      .get(CATALOGO_URL + nombreCatalogo)
      .then((response) => {
        funcionSet(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API', error)
      })
  }

  const [tamaniosCatalogo, setTamaniosCatalogo] = useState([])
  const [masasCatalogo, setMasasCatalogo] = useState([])
  const [quesosCatalogo, setQuesosCatalogo] = useState([])
  const [vegetalesCatalogo, setVegetalesCatalogo] = useState([])
  const [carnesCatalogo, setCarnesCatalogo] = useState([])
  const [salsasCatalogo, setSalsasCatalogo] = useState([])

  useEffect(() => {
    consumirCatalogos('Tamanios', setTamaniosCatalogo)
    consumirCatalogos('Masas', setMasasCatalogo)
    consumirCatalogos('Salsas', setSalsasCatalogo)
    consumirCatalogos('Quesos', setQuesosCatalogo)
    consumirCatalogos('Vegetales', setVegetalesCatalogo)
    consumirCatalogos('Carnes', setCarnesCatalogo)
  }, [])

  const [selectedSalsa, setSelectedSalsa] = useState('')

  const handlePrecio = (precio: number) => {
    setPrecioTotal(precioTotal + precio);
  };

  return (
    <div className='modal-armar-pizza'>
      <div className='bg-modal-armar-pizza' onClick={changeStateModal}></div>
      <div className='sidebar-modal-pizza'>
        <div className='description-armar'>
          <div>
            <div className='description-armar'>
              <p>
                Debes elegir entre 1 y N ingredientes. Las opciones con * se consideran un
                ingrediente más.
              </p>
            </div>
            <form>
              {/*Tamaño*/}
              <SeccionesMenu setCatalogo={tamaniosCatalogo} handlePrecio={handlePrecio} setTitulo="Tamaño" />
              {/*Masas*/}
              <SeccionesMenu setCatalogo={masasCatalogo} handlePrecio={handlePrecio} setTitulo="Tipo de Masa" />
              {/*Salsa*/}
              <SeccionesMenu setCatalogo={salsasCatalogo} handlePrecio={handlePrecio} setTitulo="Salsa Base" />
              {/*Quesos*/}
              <SeccionesMenu setCatalogo={quesosCatalogo} handlePrecio={handlePrecio} setTitulo="Queso" />
              {/*Vegetales*/}
              <SeccionesMenu setCatalogo={vegetalesCatalogo} handlePrecio={handlePrecio} setTitulo="Vegetales" />
              {/*Carnes*/}
              <SeccionesMenu setCatalogo={carnesCatalogo} handlePrecio={handlePrecio} setTitulo="Carnes" />

              <div className='button-add-order-container'>
                <div className='add-remove'>
                  <span className='size-icon'>
                    <img className='icon-img' src={SignoMenos} alt='Disminuir cantidad' />
                  </span>
                  <span>1</span>
                  <span className='size-icon'>
                    <img className='icon-img' src={SignoMas} alt='Aumentar cantidad' />
                  </span>
                </div>
                <div className='add-to-order-container'>
                  <img className='add-icon' src={mas} alt='' />
                  <button type='submit' className='button-añadir-pedido'>
                    AÑADIR AL PEDIDO
                  </button>
                  <span className='min-price'>Q{0 + precioTotal}</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export {Arma}
