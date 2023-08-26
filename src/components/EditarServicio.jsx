import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";

const EditarServicio = ({ setServices, idServ, service }) => {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
    img: "",
  });

  const handleClose = () => {
    setFormValues({
      nombre: "",
      descripcion: "",
      img: "",
    });

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormValues({ ...formValues, [name]: value });
  };
  const getServices = async () => {
    const res = await clientAxios("/services");

    setServices(res.data.allServices);
  };

  const editService = async (id) => {
    try {
        if(!formValues.nombre) formValues.nombre = service.nombre
        if(!formValues.descripcion) formValues.descripcion = service.descripcion
        if(!formValues.img) formValues.img = service.img

        const res = await clientAxios.put(
          `/services/${id}`,
          {
            nombre: formValues.nombre,
            descripcion: formValues.descripcion,
            img: formValues.img,
          },
          config
        );
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Servicio editado correctamente",
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
          title: "No se pudo editar el servicio",
          text: error.response.data.msg,
          background: "#000000",
          color: "#FFFF",
        });
      }
    }
  };

  return (
    <>
      <Button variant="success" className="my-1" onClick={handleShow}>
      <i className="bi bi-pencil"></i> Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="fondo text-white sombra">
          <Modal.Header>
            <Modal.Title>Edita el servicio seleccionado</Modal.Title>
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
                    placeholder={service.nombre}
                    type="text"
                    name="nombre"
                    onChange={handleChange}
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
                    placeholder={service.descripcion}
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    onChange={handleChange}
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
                    placeholder={service.img}
                    type="text"
                    name="img"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-light" onClick={() => editService(idServ)}>
              Guardar cambios
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default EditarServicio;
