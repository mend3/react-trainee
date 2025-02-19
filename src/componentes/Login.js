import React from "react";
import { useAuthContext } from "../state/AuthContext";

export const Login = () => {
  const authContext = useAuthContext();

  /**
   * @type {React.RefObject<HTMLInputElement|null>}
   */
  const usernameRef = React.useRef(null)
  /**
   * @type {React.RefObject<HTMLInputElement|null>}
   */
  const passwordRef = React.useRef(null)
  const [error, setError] = React.useState("");
  console.log("renderizei o login");

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    if(!username?.length || !password?.length){
      setError("Informe usuario e senha");
      return
    }

    const isUsuarioValido = username === "user";
    const isSenhaValida = password.length >= 8;

    const success = isUsuarioValido && isSenhaValida;
    authContext.setIsLogado(success);

    if (!success) {
      setError("Invalid credentials");
    } else {
      authContext.setUserName(username);
      setError("");
    }
  };

  // If already logged in, show a message.
  if (authContext.isLogado) {
    return <div>You are logged in as {authContext.username}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              ref={usernameRef}
              id="username"
              type="username"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
