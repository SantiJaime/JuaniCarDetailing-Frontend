import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";
import clientAxios, { config } from "../utils/axiosClient";
import { Formik } from "formik";
import errorUsersSchema, { errorUsersOnAdminSchema } from "../utils/validationSchemaErrors";

const CrearUsuario = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleClick = async (values) => {
    try {
        const res = await clientAxios.post(
          "/users",
          {
            email: values.email,
            username: values.username,
            pass: values.pass,
          },
          config
        );
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Usuario creado correctamente",
            text: "Ya puedes iniciar sesión",
            showConfirmButton: false,
            timer: 2000,
            background: "#000000",
            color: "#FFFF",
          });
          handleClose();
        }

    } catch (error) {
      if (error.response.status === 422) {
        Swal.fire({
          icon: "error",
          title: "No se pudo crear el usuario",
          text: error.response.data.msg,
          background: "#000000",
          color: "#FFFF",
          confirmButtonColor: "#595959",
        });
      }
    }
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Crear usuario
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="fondo text-white sombra">
          <Modal.Header>
            <Modal.Title>Crea una nueva cuenta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                email: "",
                username: "",
                pass: "",
              }}
              validationSchema={errorUsersOnAdminSchema}
              onSubmit={(values) => handleClick(values)}
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
                  <Form.Group className="mb-3" controlId="emailId">
                    <Form.Label>Correo electrónico</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupEmail">
                        <i className="bi bi-envelope-at-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="name@example.com"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className={
                          errors.email && touched.email && "is-invalid"
                        }
                      />
                    </InputGroup>
                    <small className="text-danger">
                      {errors.email && touched.email && errors.email}
                    </small>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="usernameId">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupUsername">
                        <i className="bi bi-person-circle"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Ejemplo: Juan"
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        className={
                          errors.username && touched.username && "is-invalid"
                        }
                      />
                    </InputGroup>
                    <small className="text-danger">
                      {errors.username && touched.username && errors.username}
                    </small>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="passId">
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupPass">
                        <i className="bi bi-key-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="***********"
                        type="password"
                        name="pass"
                        value={values.pass}
                        onChange={handleChange}
                        className={errors.pass && touched.pass && "is-invalid"}
                      />
                    </InputGroup>
                    <small className="text-danger">
                      {errors.pass && touched.pass && errors.pass}
                    </small>
                  </Form.Group>
                  <hr />
                  <div className="text-end">
                    <Button
                      variant="outline-light"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Crear usuario
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

export default CrearUsuario;
