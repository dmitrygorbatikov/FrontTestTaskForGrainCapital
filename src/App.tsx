import React from 'react';
import {BrowserRouter} from "react-router-dom";
import useRoutes from "./core/routes";

function App() {
    const routes = useRoutes()
  return (
      <BrowserRouter>
          {routes}
      </BrowserRouter>
  );
}

export default App;
