import { useContext } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { ContentContext } from './context'
import DataTable from 'react-data-table-component';

const Index = () => {
  const { allData, one, state, eliminar } = useContext(ContentContext);

  const handleDelete = (usuario: any) => {
    //console.log(id);
    eliminar(usuario); // Llama a la función 'eliminar' pasando el ID del elemento a eliminar
    allData(); 
  };
  
  const columns = [
    {
      name: '#',
      selector: (row: any) => row.id,
    },
    {
      name: 'Nombres',
      selector: (row: any) => row.nombres,
      //selector: (row: { nombres: any; }) => row.nombres,
    },
    {
      name: 'Apellidos',
      selector: (row: any) => row.apellidos,
    },
    {
      name: 'Usuario',
      selector: (row: any) => row.usuario,
    },
    /*{
      name: 'Email',
      selector: (row: any) => row.email,
    },*/
    {
      name: 'Rol',
      selector: (row: any) => row.rol,
    },
    {
      name: 'Estatus',
      selector: (row: any) => row.estatus,
    },
    {
      name: 'Confirmado',
      selector: (row: any) => row.confirmado,
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
          //onClick={() => one(item)}
          >
            <i className='bi bi-pencil' />
          </Button>
        </div>)
    },
    {
      button: true,
      cell: () => (
        <div className="App">
          <div className="openbtn text-center">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Open modal
            </button>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Modal body text goes here.</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const customStyles = {
    headRow: {
      style: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  };
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
        backgroundColor: '#FFA500'
      },
    },
  }

  return (
    <div>
      <DataTable className='form w-100'
        title="Usuarios"
        columns={columns}
        data={allData}
        pagination
        customStyles={tableCustomStyles}
      />
    </div>
  )
};



export default Index

/*const Index = () => {
  const {allData, one, state} = useContext(ContentContext)
  return (
    <>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='fw-bolder'>#</th>
                <th className='fw-bolder'>Nombres</th>
                <th className='fw-bolder'>Apellidos</th>
                <th className='fw-bolder'>Usuario</th>
                <th className='fw-bolder'>Rol</th>
                <th className='fw-bolder'>Estatus</th>
                <th className='fw-bolder'>Estado</th>
                <th className='fw-bolder'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nombres}</td>
                  <td>{item.apellidos}</td>
                  <td>{item.usuario}</td>
                  <td>{item.rol}</td>
                  <td>{item.estatus}</td>
                  <td>
                    <Button
                      variant={item.estado === 0 ? 'success' : 'danger'}
                      className='btn-sm btn-icon'
                      onClick={() => state(item)}
                    >
                      {item.estado === 1 ? (
                        <i className='bi bi-trash' />
                      ) : (
                        <i className='bi bi-check' />
                      )}
                    </Button>
                    <Button
                      variant='warning'
                      className='ms-3 btn-sm btn-icon'
                      onClick={() => one(item)}
                    >
                      <i className='bi bi-pencil' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}
export default Index*/
