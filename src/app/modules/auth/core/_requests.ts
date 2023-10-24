import axios from 'axios'
import {AuthModel, UserModel} from './_models'



const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/usr/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/correo`
export const REQUEST_GET_TOKEN = `${API_URL}/correo/confirmar-password`

console.log(REQUEST_GET_TOKEN)
// Server should return AuthModel
export function login(usuario: string, password: string) {
  console.log(usuario)
  return axios.post<any>(LOGIN_URL, {
    usuario: usuario,
    password,
    id: 1,
    rol: ''
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
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
export function getTokenURL(token: string, password:string) {

  return axios.put(REQUEST_GET_TOKEN, {
      token: token,
      contraseña :password,
      idUsuario : 0,
      correoUsuario: 'dd',
      dato: 'dd'
  })

}



