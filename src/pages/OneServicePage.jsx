import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios, { config } from "../utils/axiosClient";
import { Button, Col, Container, Row } from "react-bootstrap";

const OneServicePage = () => {
  const params = useParams();

  const [service, setService] = useState({});

  const getOneService = async () => {
    const res = await clientAxios.get(`/services/${params.id}`, config);

    if (res.status === 200) setService(res.data.oneService);
  };

  useEffect(() => {
    getOneService();
  }, []);

  return (
    <Container className="my-5 text-white">
      <Row>
        <Col lg={4} md={6} sm={12} className="mt-3">
          <img
            src={service.img}
            alt="Imagen del servicio"
            className="img-fluid rounded-4"
          />
        </Col>
        <Col lg={8} md={6} sm={12} className="mt-3">
          <h2>{service.nombre}</h2>
          <hr />
          <p>{service.descripcion}</p>
          <hr />
          <div className="text-end">
            <Button variant="light">
              <i className="bi bi-cart-plus fs-5"></i> Agregar al carrito
            </Button>
          </div>
        </Col>
      </Row>
      <hr />
      <div className="text-center">
        <Link className="btn btn-outline-light fs-5" to={"/services"}>
          <i className="bi bi-arrow-left-circle"></i> Volver a todos los
          servicios
        </Link>
      </div>
    </Container>
  );
};

export default OneServicePage;
