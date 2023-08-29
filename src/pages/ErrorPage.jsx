import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container className="text-center text-white">
      <img src="/error404.png" alt="Error 404" />
      <hr />
      <h4>Parece que no hay nada por aquí...</h4>
      <Link className="btn btn-light mt-2 fs-5" to={"/"}>
        <i className="bi bi-house"></i> Volver a inicio
      </Link>
    </Container>
  );
};

export default ErrorPage;
