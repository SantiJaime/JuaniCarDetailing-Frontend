import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ErrorPage from "../pages/ErrorPage";
import ServicesPage from "../pages/ServicesPage";
import ContactPage from "../pages/ContactPage";
import OneServicePage from "../pages/OneServicePage";
import AdminPage from "../pages/AdminPage";
import CartPage from "../pages/CartPage";
import PrivateRouteUser from "../components/PrivateRouteUser";
import PrivateRouteAdmin from "../components/PrivateRouteAdmin";

const RoutesView = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/admin"
        element={
          <PrivateRouteAdmin>
            <AdminPage />
          </PrivateRouteAdmin>
        }
      />
      <Route
        path="/service/:id"
        element={
          <PrivateRouteUser>
            <OneServicePage />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRouteUser>
            <CartPage />
          </PrivateRouteUser>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesView;
