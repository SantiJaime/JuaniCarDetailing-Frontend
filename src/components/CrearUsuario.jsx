import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";

const CrearUsuario = ({ setUsers }) => {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    pass: "",
    role: "",
  });
  const [inputEmail, setInputEmail] = useState(false);
  const [inputUsername, setInputUsername] = useState(false);
  const [inputPass, setInputPass] = useState(false);
  const [inputRole, setInputRole] = useState(false);

  const handleClose = () => {
    setFormValues({
      email: "",
      username: "",
      pass: "",
      role: "",
    });
    setInputEmail(false);
    setInputPass(false);
    setInputUsername(false);
    setInputRole(false);

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const getUsers = async () => {
    const res = await clientAxios("/users", config);

    setUsers(res.data.allUsers);
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormValues({ ...formValues, [name]: value });

    if (formValues.email) setInputEmail(false);
    if (formValues.pass) setInputPass(false);
    if (formValues.username) setInputUsername(false);
    if (formValues.role) setInputRole(false);
  };
  const createUser = async () => {
    try {
      if (
        formValues.email &&
        formValues.username &&
        formValues.pass &&
        formValues.role
      ) {
        if (formValues.pass.length >= 8) {
          if (formValues.role !== "user" || formValues.role !== "admin") {
            const res = await clientAxios.post(
              "/users",
              {
                email: formValues.email,
                username: formValues.username,
                pass: formValues.pass,
                role: formValues.role,
              },
              config
            );

            if (res.status === 201) {
              Swal.fire({
                icon: "success",
                title: "Usuario creado correctamente",
                showConfirmButton: false,
                timer: 1500,
                background: "#000000",
                color: "#FFFF",
              });
              handleClose();
              getUsers();
            }
          } else setInputRole(true);
        } else setInputPass(true);
      } else {
        setInputPass(true);
        setInputEmail(true);
        setInputUsername(true);
        setInputRole(true);
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
            <Modal.Title>Crea un nuevo usuario</Modal.Title>
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
                    type="email"
                    name="email"
                    placeholder="name@example.com"
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
                    type="text"
                    name="username"
                    placeholder="Ej: Juan"
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
                    type="password"
                    name="pass"
                    placeholder="************"
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
              <Form.Group className="mb-3" controlId="roleId">
                <Form.Label>Rol del usuario</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupRole">
                    <i className="bi bi-tag-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="role"
                    placeholder="'user' | 'admin'"
                    onChange={handleChange}
                    className={
                      inputRole ? "form-control is-invalid" : "form-control"
                    }
                  />
                </InputGroup>
                {inputRole && (
                  <p className="text-danger">
                    El rol del usuario debe ser "user" o "admin"
                  </p>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-light" onClick={createUser}>
              Crear usuario
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default CrearUsuario;
