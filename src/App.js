import React from "react";
import { Contador } from "./componentes/Contador";
import Form from "./Form";
import AccountsList from "./componentes/AccountList";
import AccountForm from "./componentes/AddContaForm";
import AddCardForm from "./componentes/AddCardForm";
import AddLancamentoForm from "./componentes/AddLancamentoForm";
import {
  GlobalStateProvider,
  useGlobalState,
} from "./state/GlobalStateContext";

function App() {
  const state = useGlobalState();
  return (
    <>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Sistema de Controle de Gastos</h1>
        </div>
      </header>

      <div className="flex">
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Sistema</h2>
          <p>
            Aqui você pode controlar seus gastos, lançar transações e visualizar
            o saldo atualizado das suas contas.
          </p>
          <AccountsList />
          <AccountForm account={null} />
          <AddCardForm />
          <AddLancamentoForm />
        </main>
      </div>
    </>
  );
}

export default App;
