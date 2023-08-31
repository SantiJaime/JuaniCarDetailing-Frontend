import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { errorServiceSchema } from "../utils/validationSchemaErrors";

const CrearServicio = ({ setServices }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const getServices = async () => {
    const res = await clientAxios("/services");

    setServices(res.data.allServices);
  };

  const createService = async (values) => {
    try {
      const res = await clientAxios.post(
        "/services",
        {
          nombre: values.nombre,
          descripcion: values.descripcion,
          img: values.img,
        },
        config
      );
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Servicio creado correctamente",
          showConfirmButton: false,
          timer: 2000,
          background: "#000000",
          color: "#FFFF",
        });
        handleClose();
        getServices();
      }
    } catch (error) {
      if (error.response.status === 422) {
        Swal.fire({
          icon: "error",
          title: "No se pudo crear el servicio",
          text: error.response.data.msg,
          background: "#000000",
          color: "#FFFF",
        });
      }
    }
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Crear servicio
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="fondo text-white sombra">
          <Modal.Header>
            <Modal.Title>Crea un nuevo servicio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                nombre: "",
                descripcion: "",
                img: "",
              }}
              validationSchema={errorServiceSchema}
              onSubmit={(values) => createService(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form>
                  <Form.Group className="mb-3" controlId="nameId">
                    <Form.Label>Nombre del servicio</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupName">
                        <i className="bi bi-tag-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="nombre"
                        onChange={handleChange}
                        value={values.nombre}
                        placeholder="Ej: Lavado premium"
                        className={
                          errors.nombre && touched.nombre && "is-invalid"
                        }
                      />
                    </InputGroup>
                    <small className="text-danger">
                      {errors.nombre && touched.nombre && errors.nombre}
                    </small>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="descriptionId">
                    <Form.Label>Descripción del servicio</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupDesc">
                        <i className="bi bi-file-text-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="descripcion"
                        value={values.descripcion}
                        onChange={handleChange}
                        placeholder="Pequeña descripción del servicio"
                        className={
                          errors.descripcion &&
                          touched.descripcion &&
                          "is-invalid"
                        }
                      />
                    </InputGroup>
                    <small className="text-danger">
                      {errors.descripcion &&
                        touched.descripcion &&
                        errors.descripcion}
                    </small>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="imgId">
                    <Form.Label>Imagen del servicio</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupDesc">
                        <i className="bi bi-card-image"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="img"
                        onChange={handleChange}
                        value={values.img}
                        placeholder="URL de Imagen"
                        className={errors.img && touched.img && "is-invalid"}
                      />
                    </InputGroup>
                    <small className="text-danger">
                      {errors.img && touched.img && errors.img}
                    </small>
                  </Form.Group>

                  <hr />
                  <div className="text-end">
                    <Button
                      variant="outline-light"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Crear servicio
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default CrearServicio;
