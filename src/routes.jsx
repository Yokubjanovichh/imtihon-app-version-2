import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/layout";
import Auth from "./pages/Auth/auth";
import Question from "./pages/Question/question";
import NotFound from "./pages/NotFound/notFound";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");
  return userData ? children : <Navigate to="/" />;
};

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Auth />} />
        <Route
          path="/question"
          element={
            <ProtectedRoute>
              <Question />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
