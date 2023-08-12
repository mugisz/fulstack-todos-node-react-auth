import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import AuthPage from "../pages/AuthPage/AuthPage";

export const MainRoutes = ({ isLogin }) => {
  if (isLogin) {
    return (
      <>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    );
  } else
    return (
      <>
        <AuthPage />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    );
};
