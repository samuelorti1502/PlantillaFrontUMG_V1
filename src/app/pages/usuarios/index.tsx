import {Row, Col} from 'react-bootstrap'
import Listado from './list'
import {ContentProvider} from './context'

const Index = () => {
  return (
    <ContentProvider>
      <Row>
        <Col className='d-flex justify-content-center'>Usuarios</Col>
      </Row>
      <Listado />
    </ContentProvider>
  )
}
export default Index
