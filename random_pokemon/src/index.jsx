/**
 * @file File with the hook of the main page composed by a Header and an Outlet brought by a router
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 */

import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./pages/mainPage/mainPage";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import "./index.scss";
import PokemonInfoLayout from "./components/pokemonInfoLayout/pokemonInfoLayout";
import ErrorPage from "./pages/errorPage/errorPage";

/**
 * Router for the entire app. Random Pokemon Generator is pretty simple, please
 * check the source code to check the router configuration.
 * @constant
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PokemonInfoLayout />,
      },
      {
        path: "/:pokemonId",
        element: <PokemonInfoLayout />,
      },
      {
        path: "/:pokemonId/:isShiny",
        element: <PokemonInfoLayout />,
      },
    ],
  },
  {
    path: "/error_page",
    element: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
