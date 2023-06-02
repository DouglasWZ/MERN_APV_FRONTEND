import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setCorreo(paciente.correo);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el Formulario
    if ([nombre, propietario, correo, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //Mostrar la funcion
    guardarPaciente({ nombre, propietario, correo, fecha, sintomas, id });

    //Eliminar Alerta en caso de que pase la validación
    setAlerta({
      msg: "Guardado Correctamente",
    });
    setNombre("");
    setPropietario("");
    setCorreo("");
    setFecha("");
    setSintomas("");
    setId("");
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadown-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 font-bold">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-gray-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="text-gray-700 font-bold">
            Nombre Propietario
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-gray-500"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 font-bold">
            Email Propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-gray-500"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 font-bold">
            Fecha Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-gray-500"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="text-gray-700 font-bold">
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-gray-500"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={
            id ? "Guardar Cambios" : "Agregar Paciente"
          } /* Importante aqui para saber si el boton es de guardar cambios o es para agregar paciente */
        />
      </form>
    </>
  );
};

export default Formulario;
