import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, correo, password, repetirPassword].includes("")) {
      /* includes es el metodo para poder tener acceso a las propiedades del arreglo */

      setAlerta({ msg: "Hay Campos Vacios", error: true });
      return;
    }

    /* Validar los Password */
    if (password != repetirPassword) {
      setAlerta({ msg: "Los Passwords no son iguales", error: true });
      return;
    }

    /* Validar el Tamaño de la contraseña */
    if (password.length < 6) {
      setAlerta({
        msg: "El Password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({}); // En caso de que las validaciones pasen, dejamos el objeto como un arreglo vacio

    //Crear el usuario en la API

    try {
      await clienteAxios.post("/veterinarios", { nombre, correo, password });
      setAlerta({
        msg: "Creado Correctamente, revisa tu email",
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center">
          Crea tu Cuenta y Administra{" "}
          {/* Las comidllas son para hacer el espacion entre Administra y Tus */}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadown-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}{" "}
        {/* sI en el mensaje hay algo, entonces muestra el componente de Alerta */}
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="my-5">
            <label className="text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          {/* Email */}
          <div className="my-5">
            <label className="text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="my-5">
            <label className="text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Repetir Password */}
          <div className="my-5">
            <label className="text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-10/12 py-3 px-10 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvidé mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
