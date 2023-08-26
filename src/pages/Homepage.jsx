import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import clientAxios, { config } from "../utils/axiosClient";
import ModalLogin from "../components/ModalLogin";

const Homepage = () => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token")) || "";
  const role = JSON.parse(localStorage.getItem("role")) || "";

  const [services, setServices] = useState([]);

  const getServices = async () => {
    const res = await clientAxios.get("/services", config);

    setServices(res.data.allServices);
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleClick = (idService) => navigate(`/service/${idService}`);

  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="slider-1.jpg"
              className="d-block w-100 carr"
              alt="Slider-1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="slider-2.jpg"
              className="d-block w-100 carr"
              alt="Slider-2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="slider-3.jpg"
              className="d-block w-100 carr"
              alt="Slider-3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <Container className="mt-3 text-white">
        <h3 className="text-center">¿Quiénes somos?</h3>
        <hr />
        <p>
          Somos una pequeña empresa de Tucumán, Argentina dedicada a la estetica
          vehicular. Empezamos con este emprendimiento el 10/09/2021 y hasta el
          día de hoy no paramos todavía. Cuando dejen los vehículos como
          nosotros, nos etiquetan <i className="bi bi-emoji-wink-fill fs-4"></i>
        </p>
        <hr />
        <h3 className="text-center mb-4">Algunos de nuestros servicios</h3>
        <Row>
          {services?.slice(0, 3).map((service) => (
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
        <div className="text-center my-3">
          <Link className="btn btn-outline-light fs-5" to={"/services"}>
            <i className="bi bi-list-ul"></i> Ver todos
          </Link>
        </div>
        <hr />
      </Container>
    </>
  );
};

export default Homepage;
