import {createContext, FC, ReactNode, useState, useEffect} from 'react'
import {GetRoute, PostRoute, DeleteRoute} from '../../services/private'
type Props = {
  children?: ReactNode
}

export const ContentContext = createContext<any | null>(null)

export const ContentProvider: FC<Props> = ({children}) => {
  const texto: String = 'Bienvenido Context'
  const [show, setShow] = useState(false)
  const [allData, setAllData] = useState<any>([])

  const all = async () => {
    const response = await GetRoute('categorias/listar')
    setAllData(response.length > 0 ? response : [])
    console.log(allData)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const value = {
    show,
    texto,
    allData,
    handleClose,
    handleShow,
  }

  useEffect(() => {
    all()
  }, [])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
