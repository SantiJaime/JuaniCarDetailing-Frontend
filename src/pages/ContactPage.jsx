import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ContactPage = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col className="text-white fondo p-3 rounded-4 my-1" lg={6} md={6} sm={12}>
          <h3>Contactanos</h3>
          <hr />
          <div className="text-center">
            <p className="mb-0">¡Buscanos en nuestro Instagram!</p>
            <a href="https://instagram.com/juanicardetailing" target="_blank">
              <i className="bi bi-instagram fs-1 ig"></i>
            </a>
            <hr />
            <p>
              Para solicitar turnos, a través de MD de Instagram o en nuestro
              Whatsapp:
            </p>
            <a href="https://wa.me/message/55LEFSBJK4K6K1" target="_blank">
              <i className="bi bi-whatsapp fs-1 wp"></i>
            </a>
            <p>O</p>
            <h5>Teléfono directo: 3816048019</h5>
            <hr />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} className="my-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9781805939065!2d-65.20241458814844!3d-26.84064629010092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c07af14ce8b%3A0x6fe7fda9a272601f!2sLavalle%2052%2C%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1sen!2sar!4v1692722971516!5m2!1sen!2sar"
            className="rounded-4 w-100 h-100"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
