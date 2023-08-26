import React, { useEffect, useState } from "react";
import clientAxios, { config } from "../utils/axiosClient";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CrearServicio from "../components/CrearServicio";
import CrearUsuario from "../components/CrearUsuario";
import Swal from "sweetalert2";
import EditarServicio from "../components/EditarServicio";

const AdminPage = () => {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  const getServices = async () => {
    const res = await clientAxios("/services");

    setServices(res.data.allServices);
  };

  const getUsers = async () => {
    const res = await clientAxios("/users", config);

    setUsers(res.data.allUsers);
  };

  useEffect(() => {
    getServices();
    getUsers();
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
          const res = await clientAxios.delete(`/services/${id}`, config);
          if (res.status === 200) {
            Swal.fire({
              title: "Servicio eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              background: "#000000",
              color: "#FFFF",
            });
            getServices();
          }
        } catch (error) {
          if (error.response.status === 422) {
            Swal.fire({
              title: "No se pudo eliminar el servicio",
              text: error.response.data.msg,
              icon: "error",
            });
          }
        }
      }
    });
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este usuario?",
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
          const res = await clientAxios.delete(`/users/${id}`, config);
          if (res.status === 200) {
            Swal.fire({
              title: "Usuario eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              background: "#000000",
              color: "#FFFF",
            });
            getUsers();
          }
        } catch (error) {
          if (error.response.status === 422) {
            Swal.fire({
              title: "No se pudo eliminar el usuario",
              text: error.response.data.msg,
              icon: "error",
            });
          }
        }
      }
    });
  };
  return (
    <Container className="my-3">
      <div className="d-flex justify-content-between">
        <h3 className="text-white">Servicios</h3>
        <CrearServicio setServices={setServices} />
      </div>
      <hr className="text-white" />
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Descripción</th>
            <th className="text-center">URL de Imagen</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service._id}</td>
              <td>{service.nombre}</td>
              <td>{service.descripcion}</td>
              <td>{service.img}</td>
              <td className="text-center">
                <EditarServicio
                  setServices={setServices}
                  idServ={service._id}
                  service={service}
                />
                <Button
                  variant="danger"
                  className="my-1"
                  onClick={() => deleteService(service._id)}
                >
                  <i className="bi bi-trash"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between mt-3">
        <h3 className="text-white">Usuarios</h3>
        <CrearUsuario setUsers={setUsers} />
      </div>
      <hr className="text-white" />
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Email</th>
            <th className="text-center">Nombre de usuario</th>
            <th className="text-center">Rol</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td className="text-center">
                <Button
                  variant="danger"
                  className="my-1"
                  onClick={() => deleteUser(user._id)}
                >
                  <i className="bi bi-trash"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPage;
