import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ErrorPage from "../pages/ErrorPage";
import ServicesPage from "../pages/ServicesPage";
import ContactPage from "../pages/ContactPage";
import OneServicePage from "../pages/OneServicePage";
import AdminPage from "../pages/AdminPage";
import CartPage from "../pages/CartPage";
import PrivateRoute from "../components/PrivateRoute";

const RoutesView = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute role={"admin"}>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/service/:id"
        element={
          <PrivateRoute role={"user"}>
            <OneServicePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute role={"user"}>
            <CartPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesView;
