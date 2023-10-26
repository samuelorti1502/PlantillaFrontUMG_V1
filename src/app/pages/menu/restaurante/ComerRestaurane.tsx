import React from 'react'
//import NavBar from '../dashboard/components/Navbar/Navbar'
import Secciones from './secciones/secciones'
import {ActivityDrawer} from './secciones/navbar'
import { KTSVG } from '../../../../_metronic/helpers'
import clsx from 'clsx'
import { Button } from 'react-bootstrap'
import NavBar from '../../dashboard/components/Navbar/Navbar'

const itemClass = 'ms-1 ms-lg-3'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

export default function ComerRestaurante() {
  return (
    <>
        <NavBar/>
        <Secciones />
    </>

  )
}