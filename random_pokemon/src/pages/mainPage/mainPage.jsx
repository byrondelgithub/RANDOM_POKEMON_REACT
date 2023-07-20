import React from "react";
import Header from "../../components/header/header";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainPage;
