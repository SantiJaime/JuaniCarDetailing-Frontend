import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import clientAxios, { config } from "../utils/axiosClient";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CartPage = () => {
  const [services, setServices] = useState([]);

  const getCartservices = async () => {
    const idUser = JSON.parse(localStorage.getItem("idUser"));
    const resUser = await clientAxios.get(`/users/${idUser}`, config);

    const { idCart } = resUser.data.oneUser;

    const resCart = await clientAxios.get(`/cart/${idCart}`, config);

    setServices(resCart.data.cart.services);
  };

  useEffect(() => {
    getCartservices();
  }, []);

  const deleteService = (id) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este servicio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#595959",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
      background: "#000000",
      color: "#FFFF",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const idUser = JSON.parse(localStorage.getItem("idUser"));
          const resUser = await clientAxios.get(`/users/${idUser}`, config);

          const { idCart } = resUser.data.oneUser;

          const resCart = await clientAxios.delete(
            `/cart/${idCart}/${id}`,
            config
          );
          if (resCart.status === 200) {
            Swal.fire({
              title: "Servicio eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              background: "#000000",
              color: "#FFFF",
            });
            getCartservices();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.response.data.msg,
            icon: "error",
            background: "#000000",
            color: "#FFFF",
          });
          console.log(error);
        }
      }
    });
  };

  const agregarCantidad = (id) => {
    const filtro = services.find((serv) => serv._id === id);
    if (filtro) {
      filtro.cantidad++;

      setServices((prevServices) =>
        prevServices.map((serv) =>
          serv._id === id ? { ...serv, ...filtro } : serv
        )
      );
    }
  };
  const restarCantidad = (id) => {
    const filtro = services.find((serv) => serv._id === id);
    if (filtro && filtro.cantidad > 1) {
      filtro.cantidad--;

      setServices((prevServices) =>
        prevServices.map((serv) =>
          serv._id === id ? { ...serv, ...filtro } : serv
        )
      );
    }
  };

  return (
    <Container className="text-white my-3">
      <h3>Mi carrito</h3>
      <hr />
      {services.length > 0 ? (
        <>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th className="text-center">Nombre del servicio</th>
                <th className="text-center">Cantidad de vehículos</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services.map((serv) => (
                <tr key={serv._id}>
                  <td>{serv.nombre}</td>
                  <td className="text-center">
                    <Button
                      className="mx-2"
                      variant="danger"
                      onClick={() => restarCantidad(serv._id)}
                    >
                      <i className="bi bi-dash-lg"></i>
                    </Button>
                    {serv.cantidad}
                    <Button
                      className="mx-2"
                      variant="success"
                      onClick={() => agregarCantidad(serv._id)}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      className="my-1"
                      onClick={() => deleteService(serv._id)}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <div className="text-center my-3">
            <Link className="btn btn-outline-light fs-5" to={"/services"}>
              <i className="bi bi-cart-plus-fill"></i> Seguir comprando
            </Link>

          </div>
          <div className="text-center my-3">
          <i className="bi bi-circle"></i>
          </div>
          <div className="text-center my-3">

            <Link className="btn btn-outline-light fs-5" to={"*"}>
              <i className="bi bi-cart-check-fill"></i> Confirmar pedido
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h5>Aún no agregaste servicios a tu carrito</h5>
          <Link className="btn btn-outline-light fs-5 mt-3" to={"/services"}>
            <i className="bi bi-list-ul"></i> Ir a servicios
          </Link>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
