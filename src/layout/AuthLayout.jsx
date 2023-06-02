import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto px-11 md:grid md:grid-cols-2 mt-5 gap-36 p-2 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;

/*Outlet es un componente que sirve para que cuando entremos a la pagina principal, carga ese componente
y lo que sea que haya en el otro component que seria el login, pero lo carga en el Outlet. clase 513*/
