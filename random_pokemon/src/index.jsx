import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./pages/mainPage/mainPage";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import "./index.scss";
import PokemonInfoLayout from "./components/pokemonInfoLayout/pokemonInfoLayout";
import ErrorPage from "./components/errorPage/errorPage";

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
