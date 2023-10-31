import { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import clsx from 'clsx'
import { useFormik } from 'formik'
import CurrencyInput from 'react-currency-input-field';
import { toAbsoluteUrl } from '../../../_metronic/helpers';

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

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);
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
