import axios from 'axios'
import {UserModel} from './_models'



const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/usr/login`
export const REQUEST_PASSWORD_URL = `${API_URL}/correo`
export const REQUEST_NEW_PASSWORD = `${API_URL}/correo/confirmar-password`
export const REQUEST_CONFIRMAR_CUENTA = `${API_URL}/correo/confirmar-cuenta`
export const REGISTER_URL = `${API_URL}/usuario`






// Server should return AuthModel
export function login(usuario: string, password: string) {
  console.log(usuario)
  return axios.post<any>(LOGIN_URL, {
    usuario: usuario,
    password,
    id: 1,
    rol: '',
  })
}

// Server should return AuthModel
export function register(
  nombres: string,
  apellidos: string,
  email: string,
  usuario: string,
  password: string,
  rol: string,
  usuario_creacion: string
) {


  return axios.post(REGISTER_URL, {
    id: 1,
    nombres: nombres,
    apellidos : apellidos,
    email : email,
    usuario: usuario,
    password: password,
    rol : rol,
    estatus: 'Activo',
    token: 'nullXD',
    confirmado: 0,
    usuario_creacion: usuario_creacion,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.get<{result: boolean}>(REQUEST_PASSWORD_URL+`/${email}`)
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}

export function New_Password(token: string, password:string) {
  return axios.post<any>(REQUEST_NEW_PASSWORD, {
    idUsuario:0,
    correoUsuario: 'null',
    token: token,
    contraseña :password,
    dato: 'null'
  })

}

export function Confirmar_Cuenta(token: string) {
  return axios.post<any>(REQUEST_CONFIRMAR_CUENTA, {
    idUsuario:0,
    correoUsuario: 'null',
    token: token,
    contraseña :'null',
    dato: 'null'
  })

}



