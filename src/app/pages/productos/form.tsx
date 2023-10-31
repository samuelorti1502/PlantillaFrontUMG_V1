import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import clsx from 'clsx'
import { useFormik } from 'formik'
import CurrencyInput from 'react-currency-input-field';
import { toAbsoluteUrl } from '../../../_metronic/helpers';
import axios from 'axios';

const initialValues = {
  id: 1,
  producto: '',
  descripcion: '',
  categoria: '',
  precio: '',
  estatus: '',
  usuario_creacion: '',
  imagen: '',
}

const FormProd = ({ mostrar, setMostrar, tipo }: any) => {

  const handleClose = () => {
    setMostrar(false);
  }

  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const [image, setImage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleImage = (event: any) => {
    const file = event.target.files[0];
    console.log(file)
    setImage(file)
  }

  const [roles, setRoles] = useState([])
  const [rol, setRol] = useState('')
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://3.22.100.138:4000/api/estatus/listar') // Reemplaza 'API_URL_AQUI' con tu URL de la API
        setRoles(response.data) // Suponiendo que la respuesta de la API sea un array de roles
        //console.log(response.data)
      } catch (error) {
        console.error('Error al obtener roles de la API', error)
      }
    }
    fetchRoles()
  }, [])

  return (

    <Modal show={mostrar} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tipo === 0 ? 'Nuevo Producto' : 'Editar Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div className='fv-row mb-8'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label className='form-label fw-bolder text-dark fs-6'>Producto</label>
              <input
                placeholder='Nombre'
                type='text'
                autoComplete='off'
                className={clsx(
                  'form-control bg-transparent'
                )} />
            </div>
            <div style={{ flex: 1, marginLeft: '15px' }}>
              <label className='form-label fw-bolder text-dark fs-6'>Descripción</label>
              <textarea
                placeholder='Descripción'
                autoComplete='off'
                className={clsx('form-control bg-transparent')}
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className='fv-row mb-8'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label className='form-label fw-bolder text-dark fs-6'>Categoria</label>
              <input
                placeholder='Categoria'
                type='text'
                autoComplete='off'
                className={clsx(
                  'form-control bg-transparent'
                )} />
            </div>
            <div style={{ flex: 1, marginLeft: '15px' }}>
              <label className='form-label fw-bolder text-dark fs-6'>Precio</label>
              <CurrencyInput
                prefix="Q"
                id="input-example"
                name="input-name"
                placeholder="Precio"
                // defaultValue={0.00}
                decimalsLimit={2}
                className={clsx(
                  'form-control bg-transparent'
                )}
                onValueChange={(value, name) => console.log(value, name)}
              />
            </div>
          </div>


        </div>

        <div className='fv-row mb-8'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label className='form-label fw-bolder text-dark fs-6'>Imagen</label>
              <div className="image-input image-input-outline" data-kt-image-input="true">

                {image ?
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl(image)}
                    className='image-input-wrapper w-125px h-125px'
                  // onChange={handleImage}
                  />
                  :
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/LogoPizza.png')}
                    className='image-input-wrapper w-125px h-125px'
                  // onChange={handleImage}
                  />
                }


                <label className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  data-bs-dismiss="click"
                  title="Change avatar">
                  <i className="bi-duotone bi-pencil fs-6"><span className="path1"></span><span className="path2"></span></i>

                  {/* begin::Inputs */}
                  <input type="file" name="avatar" accept=".png, .jpg, .jpeg" ref={inputRef} onChange={handleImage} />
                  <input type="hidden" name="avatar_remove" />
                  {/* end::Inputs */}
                </label>
                {/* end::Edit button */}

                {/* begin::Remove button */}
                <span className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  data-bs-dismiss="click"
                  title="Remove avatar">
                  <i className="bi-outline bi-trash fs-3"></i>
                </span>
                {/* end::Remove button */}
              </div>
              {/* <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/LogoPizza.png')}
                className='h-100px app-sidebar-logo-default'
              />
              <input type="file" /> */}
            </div>
            <div style={{ flex: 1, marginLeft: '15px' }}>
              <label className='form-label fw-bolder text-dark fs-6'>Estatus</label>
              <div className='fv-row mb-8'>
                <Form.Group controlId='exampleForm.SelectCustom'>
                  <Form.Label>Rol</Form.Label>
                  <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                    {roles.map((role: { id: number; nombre_estatus: string }) => (
                      <option key={role.id} value={role.nombre_estatus}>
                        {role.nombre_estatus}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <input
                placeholder='Estatus'
                autoComplete='off'
                className={clsx('form-control bg-transparent')}
              />
            </div>
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { FormProd };
