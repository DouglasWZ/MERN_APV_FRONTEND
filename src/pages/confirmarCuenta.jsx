import { useEffect, useState } from "react"; // permite ejecutar un codigo una vez elc omponente este listo
import { useParams, Link } from "react-router-dom"; // permite ver los parametros de la URL en react Router DOM
import axios from "axios";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }

      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center">
          Confirma tu cuenta y Comienza a Adminsitrar{" "}
          {/* Las comidllas son para hacer el espacion entre Administra y Tus */}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadown-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
