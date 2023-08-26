import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";

const CrearServicio = ({ setServices }) => {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
    img: "",
  });
  const [inputName, setInputName] = useState(false);
  const [inputDesc, setInputDesc] = useState(false);
  const [inputImg, setInputImg] = useState(false);

  const handleClose = () => {
    setFormValues({
        nombre: "",
        descripcion: "",
        img: "",
    })
    setInputName(false);
    setInputDesc(false);
    setInputImg(false);

    setShow(false);
    }
  const handleShow = () => setShow(true);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormValues({ ...formValues, [name]: value });

    if (formValues.nombre) setInputName(false);
    if (formValues.descripcion) setInputDesc(false);
    if (formValues.img) setInputImg(false);
  };
  const getServices = async () => {
    const res = await clientAxios("/services");

    setServices(res.data.allServices);
  };

  const createService = async () => {
    try {
      if (formValues.nombre && formValues.descripcion && formValues.img) {
        const res = await clientAxios.post(
          "/services",
          {
            nombre: formValues.nombre,
            descripcion: formValues.descripcion,
            img: formValues.img,
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
          handleClose()
          getServices();
        }
      } else {
        setInputName(true);
        setInputDesc(true);
        setInputImg(true);
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
                    className={
                      inputName ? "form-control is-invalid" : "form-control"
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="descriptionId">
                <Form.Label>Descripción del servicio</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupDesc">
                    <i className="bi bi-file-text-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    onChange={handleChange}
                    className={
                      inputDesc ? "form-control is-invalid" : "form-control"
                    }
                  />
                </InputGroup>
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
                    className={
                      inputImg ? "form-control is-invalid" : "form-control"
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-light" onClick={createService}>
              Crear servicio
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default CrearServicio;
