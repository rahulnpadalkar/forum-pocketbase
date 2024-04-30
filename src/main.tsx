import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Join from "./routes/Join";
import Home from "./routes/Home";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <Flex flexDirection="column" paddingX="80" paddingY="10" h="100%">
      <RouterProvider router={router} />
    </Flex>
  </ChakraProvider>
);
