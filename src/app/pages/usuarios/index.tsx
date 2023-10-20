import { Row, Col, Form } from 'react-bootstrap'
import Formulario from './form'
import Listado from './list'
import { ContentProvider } from './context'

const Index = () => {
  return (
    <ContentProvider>
      <Formulario/>
      <Listado />
    </ContentProvider>
  )
}
export default Index
