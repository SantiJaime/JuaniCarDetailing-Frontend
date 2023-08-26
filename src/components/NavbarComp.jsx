import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";
import Swal from "sweetalert2";

const NavbarComp = () => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token")) || "";
  const role = JSON.parse(localStorage.getItem("role")) || "";

  const logOut = () => {
    Swal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#595959",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
      background: "#000000",
      color: "#FFFF",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("idUser")
        
        navigate("/");
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img
            src="/src/img/logo-juan-modified.png"
            alt="Logo JuaniCarDetailing"
            width={"70px"}
          />
        </Link>
        <button
          className="navbar-toggler border-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list text-white fs-1"></i>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between ms-3 displayBlock"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {token && role === "admin" ? (
              <>
                <NavLink className="jaiNavLink my-1" to={"/"}>
                  Inicio
                </NavLink>
                <NavLink className="jaiNavLink my-1" to={"/services"}>
                  Servicios
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="jaiNavLink my-1" to={"/"}>
                  Inicio
                </NavLink>
                <NavLink className="jaiNavLink my-1" to={"/services"}>
                  Servicios
                </NavLink>
                <NavLink className="jaiNavLink my-1" to={"/contact"}>
                  Contacto
                </NavLink>
              </>
            )}
          </div>
          <div className="navbar-nav">
            {token &&
              (role === "admin" ? (
                <>
                  <NavLink className="jaiNavLink my-1" to={"/admin"}>
                    <i className="bi bi-person-fill-gear"></i> Administrador
                  </NavLink>
                  <button className="jaiNavLinkButton my-1" onClick={logOut}>
                    <i className="bi bi-door-open-fill"></i> Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <NavLink className="jaiNavLink my-1" to={"/cart"}>
                    <i className="bi bi-cart"></i> Mi carrito
                  </NavLink>
                  <button className="jaiNavLinkButton my-1" onClick={logOut}>
                    <i className="bi bi-door-open-fill"></i> Cerrar sesión
                  </button>
                </>
              ))}
            {!token && (
              <>
                <ModalLogin type="nav" />
                <ModalRegister />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComp;
