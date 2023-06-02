import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      /* Revisar Token */
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        /* Clase 536 min. 4:19 explicacion del bearer token  */
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        /* Cunado enviamos las peticiones post que tienen que ser autenticadas primero va ala URL, despues a los datos y por ultimo la configuracion como la que tenemos abajo*/
        const { data } = await clienteAxios("/veterinarios/perfil", config);

        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  // Cerrar Sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  // Actualizar Perfil
  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      /* Clase 536 min. 4:19 explicacion del bearer token  */
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      await clienteAxios.put(url, datos, config);
      return {
        msg: "Almacenado Correctamente",
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      /* Clase 536 min. 4:19 explicacion del bearer token  */
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "/veterinarios/actualizar-password";
      const { data } = await clienteAxios.put(url, datos, config);
      console.log(data)
      return {
        msg: data.msg
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
