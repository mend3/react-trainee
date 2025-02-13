import React from "react";
import Input from "./componentes/Input";

function Form() {
  return (
    <form>
      <Input type="number" placeholder="Informe sua idade" />
      <Input type="text" placeholder="Informe seu nome" />
      <Input type="text" placeholder="Informe seu sobrenome" />
    </form>
  );
}

export default Form;
