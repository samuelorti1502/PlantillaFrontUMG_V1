import {useContext} from 'react'
import {Button, Modal, Row, Col} from 'react-bootstrap'
import {ContentContext} from './context'
import DataTable from 'react-data-table-component'
import {useAuth} from '../../modules/auth'

const Index = () => {
  const {allData, eliminar, show, handleShow, handleClose} = useContext(ContentContext)
  const {currentUser} = useAuth()

  const handleDelete = (usuario: any) => {
    eliminar(usuario)
    //allData()
  }

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
      selector: (row: any) => row.precio,
    },
    {
      name: 'Estatus',
      selector: (row: any) => row.estatus,
    },
    {
      name: 'Imagen',
      selector: (row: any) => row.imagen,
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
          <Button variant='warning' className='ms-3 btn-sm btn-icon' onClick={handleShow}>
            <i className='bi bi-pencil' />
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>{currentUser?.usuario || ''}</Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
              <Button variant='secondary' onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant='primary' onClick={handleClose}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
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
