import React, { useEffect, useState } from "react";
import clientAxios, { config } from "../utils/axiosClient";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../components/ModalLogin";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const ServicesPage = () => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token")) || ""
  const role = JSON.parse(localStorage.getItem("role")) || ""

  const [services, setServices] = useState([]);
  const [servicesAux, setServicesAux] = useState([]);

  const getServices = async () => {
    const res = await clientAxios.get("/services", config);

    setServices(res.data.allServices);
    setServicesAux(res.data.allServices);
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleClick = (idService) => navigate(`/service/${idService}`);

  const buscador = (ev) => {
    const { value } = ev.target;

    let busqueda = value.toLowerCase();

    const filtro = services.filter((service) => {
      let nombre = service.nombre.toLowerCase();

      return nombre.includes(busqueda);
    });

    if (busqueda.length > 0) setServices(filtro);
    else setServices(servicesAux);
  };

  return (
    <Container className="my-3">
      <div className="d-flex justify-content-center">
        <InputGroup className="mb-3 w-75">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Busca tu servicio aquí"
            type="search"
            onChange={buscador}
          />
        </InputGroup>
      </div>
      <Row>
        {services.map((service) => (
          <Col key={service._id} lg={4} md={12} sm={12} className="my-2">
            <Card className="fondo text-white">
              <Card.Img variant="top" src={service.img} />
              <Card.Body>
                <Card.Title>{service.nombre}</Card.Title>
                <hr />
                {role === "user" || !role ? (
                  token ? (
                    <button
                      className="btn btn-light"
                      onClick={() => handleClick(service._id)}
                    >
                      Ver más
                    </button>
                  ) : (
                    <ModalLogin type="card" />
                  )
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServicesPage;
