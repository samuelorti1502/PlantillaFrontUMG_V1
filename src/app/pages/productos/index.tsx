import { Row, Col, Form } from 'react-bootstrap'
import Formulario from './form'
import Listado from './list'
import { ContentProvider } from './context'
import { useState } from 'react'

const Index = () => {

  const [modalTitle] = useState('Título Predeterminado');

  return (
    <ContentProvider>
      <Formulario modalTitle={modalTitle} />
      <Listado />
    </ContentProvider>
  )
}
export default Index
