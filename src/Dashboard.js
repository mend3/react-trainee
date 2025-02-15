import React from "react";
import AccountsList from "./componentes/AccountList";
import AddCardForm from "./componentes/AddCardForm";
import AccountForm from "./componentes/AddContaForm";
import AddLancamentoForm from "./componentes/AddLancamentoForm";

function Dashboard() {
  return (
    <>
      <AccountsList />
      <AccountForm account={null} />
      <AddCardForm />
      <AddLancamentoForm />
    </>
  );
}

export default Dashboard;
