import {useContext, useState} from 'react'
import {Button} from 'react-bootstrap'
import {ContentContext} from './context'
import DataTable from 'react-data-table-component'
import {FormProd} from './form'

const Index = () => {
  const {allData, eliminar} = useContext(ContentContext)

  const handleDelete = (usuario: any) => {
    eliminar(usuario)
    //allData()
  }

  const [mostrar, setMostrar] = useState(false)
  const [tipo, setTipo] = useState(0)

  const handleShowM = () => {
    setMostrar(true)
  }

  const formatter = new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
  })

  const columns = [
    {
      name: '#',
      selector: (row: any) => row.id_prod_menu,
    },
    {
      name: 'Categoria',
      selector: (row: any) => row.categoria,
      //selector: (row: { nombres: any; }) => row.nombres,
    },
    {
      name: 'Producto',
      selector: (row: any) => row.nombre,
    },
    {
      name: 'Descripcion',
      selector: (row: any) => row.descripcion,
    },
    {
      name: 'Precio',
      cell: (row: any) => formatter.format(row.precio),
    },
    {
      name: 'Estatus',
      selector: (row: any) => row.estatus,
    },
    {
      name: 'Imagen',
      cell: (row: any) => (
        // row.imagen,
        <img
          src={`http://3.22.100.138/images/${row.imagen}`}
          alt='Imagen'
          style={{width: '50px', height: '50px'}}
        />
      ),
    },
    {
      name: 'Acciones',
      cell: (row: any) => (
        <div>
          <Button
            variant={'danger'}
            className='btn-sm btn-icon'
            onClick={() => handleDelete(row.usuario)}
          >
            <i className='bi bi-trash' />
          </Button>
          <Button
            variant='warning'
            className='ms-3 btn-sm btn-icon'
            onClick={() => {
              handleShowM()
              setTipo(1)
            }}
          >
            <i className='bi bi-pencil' />
          </Button>
          <FormProd mostrar={mostrar} setMostrar={setMostrar} tipo={tipo} />
        </div>
      ),
    },
  ]

  const tableCustomStyles = {
    table: {
      style: {
        //color: theme.text.primary,
        //justifyContent: 'center',
        backgroundColor: '#FFA500',
      },
    },
    tableWrapper: {
      style: {
        display: 'table',
      },
    },
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        //justifyContent: 'center',
        justifyTitle: 'center',
        backgroundColor: '#FFA500',
      },
    },
  }

  return (
    <div>
      <DataTable
        className='form w-100'
        title='Productos'
        columns={columns}
        data={allData}
        pagination
        customStyles={tableCustomStyles}
      />
    </div>
  )
}

export default Index
