import React from "react";
import AccountsList from "./componentes/AccountList";
import AddCardForm from "./componentes/AddCardForm";
import AccountForm from "./componentes/AddContaForm";
import AddLancamentoForm from "./componentes/AddLancamentoForm";
import { Login } from "./componentes/Login";
import { useAuthContext } from "./state/AuthContext";

function App() {


  const authContext = useAuthContext();
  const [src, setSrc] = React.useState('https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/250px-Google_Images_2015_logo.svg.png');

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((resposta) => resposta.json())
      .then((pokemonInfo) => {
        const imagem = pokemonInfo.sprites.front_shiny;
        setSrc(imagem)
        console.log({imagem})
      });
  });

  let nome = "";
  if (authContext.isLogado) {
    nome = " " + authContext.username;
  }
  // authContext.isLogado ? ` ${authContext.username}` : ""

  const renderLoginOrForm = () => {
    if (!authContext.isLogado) {
      return <Login />;
    }

    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Olá{nome}, bem-vindo ao Sistema
        </h2>
        <p>
          Aqui você pode controlar seus gastos, lançar transações e visualizar o
          saldo atualizado das suas contas.
        </p>
        <img src={src} />
        <AccountsList />
        <AccountForm account={null} />
        <AddCardForm />
        <AddLancamentoForm />
      </div>
    );
  };

  return (
    <>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Sistema de Controle de Gastos</h1>
        </div>
      </header>

      <div className="flex">
        <main className="flex-1">{renderLoginOrForm()}</main>
      </div>
    </>
  );
}

export default App;
