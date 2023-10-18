import { useContext } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { ContentContext } from './context'
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: '#',
    selector: (row: { id: any; }) => row.id,
  }/*,
  {
    name: 'Nombres',
    selector: (row: { nombres: any; }) => row.nombres,
  },
  {
    name: 'Apellidos',
    selector: (row: { apellidos: any; }) => row.apellidos,
  },
  {
    name: 'Apellidos',
    selector: 'email'
  },
  {
    name: 'Apellidos',
    selector: 'usuario'
  },
  {
    name: 'Apellidos',
    selector: 'password'
  },
  {
    name: 'Apellidos',
    selector: 'rol'
  },
  {
    name: 'Apellidos',
    selector: 'estatus'
  },
  {
    name: 'Apellidos',
    selector: 'token'
  },
  {
    name: 'Apellidos',
    selector: 'confirmado'
  },
  {
    name: 'Apellidos',
    selector: 'usuario_creacion'
  },*/
];
const Index = () => {
  const { allData, one, state } = useContext(ContentContext);
  return (
    <DataTable
      title="Tabla de Datos"
      columns={columns}
      data={allData}
    />
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
