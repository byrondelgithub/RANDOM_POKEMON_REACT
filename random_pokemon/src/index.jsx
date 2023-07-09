import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/mainPage/mainPage';
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import theme from './theme'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
);
