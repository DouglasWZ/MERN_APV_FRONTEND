import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/** 
* El compoentne que pordefecto traer React, generaba error a la hora de confirmar la cuenta,
* Esto sucede porque en react en la ultima versión esta usando el modo estricto por eso renderiza dos veces el componente.
* para corregir el error hay que quitar el StrictMode y dejarlo tal cual esta en el codigo

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
);
*/

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
