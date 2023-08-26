import React from "react";

const FooterComp = () => {
  return (
    <footer className="py-3">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-12 margenLogo">
            <div className="img-fluid text-center">
              <img
                src="logo-juan-modified.png"
                alt="Logo"
                width="100px"
              />
            </div>
          </div>
          <hr className="text-white displayNone" />
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="text-white">Horarios de atención</h5>
            <ul className="text-white">
              <li>Lunes a Viernes: 08:00 a 18:00.</li>
              <li>Sábados: 08:00 a 14:00.</li>
              <li>Domingos y feriados cerrado.</li>
            </ul>
          </div>
          <hr className="text-white displayNone" />
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="text-white text-center">Buscanos en nuestras redes</h5>
            <div className="d-flex justify-content-center">
              <a
                className="mx-3"
                href="https://wa.me/message/55LEFSBJK4K6K1"
                target="_blank"
              >
                <i className="bi bi-whatsapp fs-1 wp"></i>
              </a>
              <a
                className="mx-3"
                href="https://instagram.com/juanicardetailing"
                target="_blank"
              >
                <i className="bi bi-instagram fs-1 ig"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;
