import {useState, useContext, useEffect} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useAuth} from '../../modules/auth/core/Auth'
import {getUserByToken, register,CorreoConfirmarCuenta} from '../../modules/auth/core/_requests'
import {PasswordMeterComponent} from '../../../_metronic/assets/ts/components'
import {ContentContext} from './context'
import axios from 'axios'
//import Modal from 'react-bootstrap/Modal';


type FormProps = {
  modalTitle: string // Prop para el título del modal
}

const initialValues = {
  id: 1,
  nombres: '',
  apellidos: '',
  email: '',
  usuario: '',
  password: '',
  rol: '',
  estatus: '',
  token: '',
  confirmado: '',
  usuario_creacion: '',
  changepassword: '',
}

const registrationSchema = Yup.object().shape({
  nombres: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Nombres son requeridos'),
  apellidos: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Apellidos son requeridos'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email es requerido'),
  usuario: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Usuario es requerido'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Contraseña es requerida'),
  changepassword: Yup.string()
    .required('Confirmación de contraseña es reaquerida')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Las contraseñas no coinciden"),
    }),
})
let Mensaje = ''
const Example: React.FC<FormProps> = ({modalTitle}) => {
  //const {show} = useContext(ContentContext)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [show, setShow] = useState(false)
  
  const handleShow = () => setShow(true)
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const {allRoles} = useContext(ContentContext)
  const [rol, setRol] = useState('');
  const storedUsername = localStorage.getItem('User');
  const handleClose = () => {
    // Restablecer el formulario
    formik.resetForm();
    setHasErrors(undefined);
    setShow(false);
    Mensaje ='' // Cerrar la ventana modal
  };


  if (storedUsername) {
    // El nombre de usuario se encontró en el Local Storage
    initialValues.usuario_creacion = storedUsername
  } else {
    // El nombre de usuario no se encontró en el Local Storage

  }

  useEffect(() => {
    initialValues.rol = rol
    console.log('Valor seleccionado en el ComboBox (rol):',  initialValues.rol );
    console.log('Usuario Creación:',  initialValues.usuario_creacion);
    console.log('Usuario Creación:',  initialValues.usuario_creacion);
  }, [rol]);
  



  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting,resetForm}) => {
      setLoading(true)
      try {
        const {data: auth} = await register(
          values.nombres,
          values.apellidos,
          values.email,
          values.usuario,
          values.password,
          initialValues.rol,
          initialValues.usuario_creacion
        )
    
        //const {data: user} = await getUserByToken(auth.api_token)
        console.log(auth.mensaje)
          if(auth.mensaje ==='El usuario ha sido creado con éxito, revisa tu correo para confirmar tu cuenta.')
          { 
            Mensaje = auth.mensaje  
           console.log(CorreoConfirmarCuenta(values.email))
              
            resetForm();
        }else{
          setHasErrors(true)
          Mensaje = auth.mensaje
        }
        setStatus(auth.mensaje)
        saveAuth(undefined)
        setHasErrors(false)
        setLoading(false)
        //setCurrentUser(user)
      } catch (error) {
        console.error(error)
        setHasErrors(true)
        Mensaje = 'Lo sentimos, parece que se han detectado algunos errores. Inténtalo de nuevo.'
        saveAuth(undefined)
        setStatus('Lo sentimos, parece que se han detectado algunos errores. Inténtalo de nuevo.')
        setSubmitting(false)
        setLoading(false)
        setHasErrors(true)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://3.22.100.138:4000/api/rol/listar') // Reemplaza 'API_URL_AQUI' con tu URL de la API
        setRoles(response.data) // Suponiendo que la respuesta de la API sea un array de roles
        //console.log(response.data)
      } catch (error) {
        console.error('Error al obtener roles de la API', error)
      }
    }
    fetchRoles()
  }, [])

  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
        style={{background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white'}}
      >
        Nuevo Usuario
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title> {/* Utiliza el título pasado como prop */}
        </Modal.Header>
        <Modal.Body>

        {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
          {Mensaje}
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info text-center'>
         {Mensaje} </div>
        </div>
      )}

          <div className='fv-row mb-8'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <label className='form-label fw-bolder text-dark fs-6'>Nombre</label>
                <input
                  placeholder='Nombre'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('nombres')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.nombres && formik.errors.nombres,
                    },
                    {
                      'is-valid': formik.touched.nombres && !formik.errors.nombres,
                    }
                  )}
                />
                {formik.touched.nombres && formik.errors.nombres && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.nombres}</span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{flex: 1, marginLeft: '15px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Apellidos</label>
                <input
                  placeholder='Apellidos'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('apellidos')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.apellidos && formik.errors.apellidos,
                    },
                    {
                      'is-valid': formik.touched.apellidos && !formik.errors.apellidos,
                    }
                  )}
                />
                {formik.touched.apellidos && formik.errors.apellidos && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.apellidos}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* begin::Form group Email */}
          <div className='fv-row mb-8'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <label className='form-label fw-bolder text-dark fs-6'>Correo electrónico</label>
                <input
                  placeholder='Correo electrónico'
                  type='email'
                  autoComplete='off'
                  {...formik.getFieldProps('email')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.email && formik.errors.email,
                    },
                    {
                      'is-valid': formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{flex: 1, marginLeft: '15px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Usuario</label>
                <input
                  placeholder='Usuario'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('usuario')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.usuario && formik.errors.usuario,
                    },
                    {
                      'is-valid': formik.touched.usuario && !formik.errors.usuario,
                    }
                  )}
                />
                {formik.touched.usuario && formik.errors.usuario && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.usuario}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* begin::Form group Password */}
          <div className='fv-row mb-8' data-kt-password-meter='true'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <label className='form-label fw-bolder text-dark fs-6'>Contraseña</label>
                <div className='position-relative mb-3'>
                  <input
                    type='password'
                    placeholder='Contraseña'
                    autoComplete='off'
                    {...formik.getFieldProps('password')}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.password && formik.errors.password,
                      },
                      {
                        'is-valid': formik.touched.password && !formik.errors.password,
                      }
                    )}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.password}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* begin::Meter */}
                <div
                  className='d-flex align-items-center mb-3'
                  data-kt-password-meter-control='highlight'
                >
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
                </div>
                {/* end::Meter */}
              </div>
              <div style={{flex: 1, marginLeft: '10px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Confirmar contraseña</label>
                <input
                  type='password'
                  placeholder='Confirmación de contraseña'
                  autoComplete='off'
                  {...formik.getFieldProps('changepassword')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
                    },
                    {
                      'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
                    }
                  )}
                />
                <div className='text-muted'>{'-----------------------------------'}</div>
                {formik.touched.changepassword && formik.errors.changepassword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.changepassword}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* begin::Form group Rol */}
          <div className='fv-row mb-8'>
            <Form.Group controlId='exampleForm.SelectCustom'>
              <Form.Label>Rol</Form.Label>
              <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
  {roles.map((role: { id: number; rol: string }) => (
    <option key={role.id} value={role.rol}>
      {role.rol}
    </option>
  ))}
</Form.Select>


            </Form.Group>
          </div>



        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button
            variant='primary'
            onClick={handleClose} 
            style={{background: 'linear-gradient(to right, #260101, #FF5733)', color: 'white'}}
         
          >
            Cerrar
          </Button>
          <Button
            variant='secondary'
            onClick={formik.submitForm}
            style={{background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white'}}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Crear Usuario</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Espere por favor...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Example
