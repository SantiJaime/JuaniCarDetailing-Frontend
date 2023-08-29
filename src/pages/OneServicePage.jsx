import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios, { config } from "../utils/axiosClient";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";

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

  const addCart = async (id) => {
    try {
      const idUser = JSON.parse(localStorage.getItem("idUser"));
      const resUser = await clientAxios.get(`/users/${idUser}`, config);

      const { idCart } = resUser.data.oneUser;

      const resCart = await clientAxios.post(
        `/cart/${idCart}/${id}`,
        {},
        config
      );
      if (resCart.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Servicio cargado correctamente al carrito",
          showConfirmButton: false,
          timer: 1500,
          background: "#000000",
          color: "#FFFF",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.msg,
        background: "#000000",
        color: "#FFFF",
      });
    }
  };
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
            <Button variant="light" onClick={() => addCart(service._id)}>
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
