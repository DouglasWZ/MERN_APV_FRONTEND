import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./pages/login";
import Registrar from "./pages/registrar";
import OlvidePassword from "./pages/olvidePassword";
import ConfirmarCuenta from "./pages/confirmarCuenta";
import NuevoPassword from "./pages/nuevoPassword";
import AdministrarPacientes from "./pages/AdministrarPacientes";
import EditarPerfil from "./pages/EditarPerfil";
import CambiarPassword from "./pages/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";

function App() {
  /** De esta forma se leen las variables de entorno en React VITE */
  console.log(import.meta.env.VITE_BACKEND_URL);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas Publicas */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            {/* {<Route path="confirmar-cuenta" element={<ConfirmarCuenta />}></Route>} */}
          </Route>

          {/* Rutas Privadas */}
          <Route path="/admin" element={<RutaProtegida />}>
            <Route index element={<AdministrarPacientes />} />
            <Route path="perfil" element={<EditarPerfil />}></Route>
            <Route path="cambiar-password" element={<CambiarPassword />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// el prop index se encarga de decirle que ese será el primer componente
// Index es como la pagina principal 1:55 video 514

export default App;
