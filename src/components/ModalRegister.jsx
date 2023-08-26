import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";
import clientAxios, { config } from "../utils/axiosClient";
import ModalLogin from "./ModalLogin";

const ModalRegister = () => {
  const [show, setShow] = useState(false);
  const [inputEmail, setInputEmail] = useState(false);
  const [inputPass, setInputPass] = useState(false);
  const [inputUsername, setInputUsername] = useState(false);

  const handleClose = () => {
    setFormValues({
      email: "",
      username: "",
      pass: "",
      repeatPass: "",
    });
    setInputEmail(false);
    setInputPass(false);
    setInputUsername(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    pass: "",
    repeatPass: "",
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormValues({ ...formValues, [name]: value });

    if (formValues.email) setInputEmail(false);
    if (formValues.pass) setInputPass(false);
    if (formValues.username) setInputUsername(false);
  };

  const handleClick = async () => {
    try {
      if (formValues.email && formValues.pass && formValues.username) {
        if (formValues.pass.length >= 8) {
          if (formValues.pass === formValues.repeatPass) {
            const res = await clientAxios.post(
              "/users",
              {
                email: formValues.email,
                username: formValues.username,
                pass: formValues.pass,
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
          } else {
            Swal.fire({
              icon: "error",
              title: "Las contraseñas no coinciden",
              text: "Revisa tus contraseñas",
              background: "#000000",
              color: "#FFFF",
              confirmButtonColor: "#595959",
            });
          }
        } else {
          setInputPass(true);
        }
      } else {
        setInputPass(true);
        setInputEmail(true);
        setInputUsername(true);
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
      <button className="jaiNavLinkButton my-1" onClick={handleShow}>
        Registrarse
      </button>

      <Modal show={show} onHide={handleClose}>
        <div className="fondo text-white sombra">
          <Modal.Header>
            <Modal.Title>Crea tu cuenta aquí</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                    onChange={handleChange}
                    className={
                      inputEmail ? "form-control is-invalid" : "form-control"
                    }
                  />
                </InputGroup>
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
                    onChange={handleChange}
                    className={
                      inputUsername ? "form-control is-invalid" : "form-control"
                    }
                  />
                </InputGroup>
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
                    onChange={handleChange}
                    className={
                      inputPass ? "form-control is-invalid" : "form-control"
                    }
                  />
                </InputGroup>
                {inputPass && (
                  <p className="text-danger">
                    Min: 8 caracteres | Max: 50 caracteres
                  </p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="repeatPassId">
                <Form.Label>Repetir contraseña</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupRepeatPass">
                    <i className="bi bi-key-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="***********"
                    type="password"
                    name="repeatPass"
                    onChange={handleChange}
                    className={
                      inputPass ? "form-control is-invalid" : "form-control"
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-light" onClick={handleClick}>
              Registrarse
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default ModalRegister;
