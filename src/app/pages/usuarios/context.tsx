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
  const [oneData, setOneData] = useState<any>([])
  const [allRoles, setAllRoles] = useState<any>([])

  const all = async () => {
    const response = await GetRoute('usuario/listar')
    setAllData(response.length > 0 ? response : [])
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const creaetUpdate = async (data: any) => {
    const response = await PostRoute(`rol/${!data?.id ? 'store' : 'update'}`, data)
    all()
    handleClose()
    console.log(response.message)
  }

  const eliminar = async (data: any) => {
    //console.log(data);
    const response = await DeleteRoute(`usuario`, data)
    setOneData(response.length > 0 ? response[0] : [])
    all()
    handleShow()
  }

  const ActualizarTabla = async (data: any) => {
    //console.log(data);
    all()
    handleShow()
  }

  const one = async (data: any) => {
    const response = await PostRoute(`rol/one`, data)
    setOneData(response.length > 0 ? response[0] : [])
    handleShow()
  }

  const roles =async (data: any) => {
    /*console.log("hola")
    const response = await GetRoute('rol/listar')
    console.log(response.message)*/
    //setAllRoles(response.length > 0 ? response : [])
    setAllRoles("hola")
    handleShow()
  }

  const state = async (data: any) => {
    const response = await PostRoute(`usuario/${data?.estado === 1 ? 'destroy' : 'active'}`, data)
    console.log(response.message)
    all()
  }

  const value = {
    show,
    texto,
    allData,
    oneData,
    allRoles,
    handleClose,
    creaetUpdate,
    handleShow,
    state,
    one,
    eliminar,
    roles,
    ActualizarTabla
  }

  useEffect(() => {
    all()
  }, [])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
