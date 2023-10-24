import axios from 'axios'
import {UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/usr/login`
export const REGISTER_URL = `${API_URL}/usuario`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

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
    nombres,
    apellidos,
    email,
    usuario,
    password,
    rol,
    estatus: 'Activo',
    token: '',
    confirmado: 0,
    usuario_creacion,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
