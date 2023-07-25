/**
 * @file File with models the main page composed by a Header and an Outlet brought by a router.
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports MainPage
 */

import React from "react";
import Header from "../../components/header/header";
import { Outlet } from "react-router-dom";

/**
 * MainPage hook that renders an Header with an Outlet given by a router. This page should be only used in index.jsx
 */
function MainPage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainPage;
