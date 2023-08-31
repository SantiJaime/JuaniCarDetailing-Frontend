import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import errorUsersSchema, { errorLoginSchema } from "../utils/validationSchemaErrors";

const ModalLogin = ({ type }) => {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = () => {
    if (type !== "nav") {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión primero",
        background: "#000000",
        color: "#FFFF",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => setShow(true), 1500);
    } else setShow(true);
  };

  const handleClick = async (values) => {
    try {
      const res = await clientAxios.post(
        "/users/login",
        {
          email: values.email,
          pass: values.pass,
        },
        config
      );
      if (res?.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("role", JSON.stringify(res.data.userExist.role));
        localStorage.setItem("idUser", JSON.stringify(res.data.userExist._id));

        res.data.userExist.role === "admin"
          ? navigate("/admin")
          : navigate("/");
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        Swal.fire({
          icon: "error",
          title: "No se pudo iniciar sesión",
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
      {type === "nav" ? (
        <button className="jaiNavLinkButton my-1" onClick={handleShow}>
          Iniciar sesión
        </button>
      ) : (
        <button className="btn btn-light" onClick={handleShow}>
          Ver más
        </button>
      )}

      <Modal show={show} onHide={handleClose}>
        <div className="fondo text-white sombra">
          <Modal.Header>
            <Modal.Title>Inicia sesión aquí</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                email: "",
                pass: "",
              }}
              validationSchema={errorLoginSchema}
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
                      // type="submit"
                      onClick={handleSubmit}
                    >
                      Iniciar sesión
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

export default ModalLogin;
