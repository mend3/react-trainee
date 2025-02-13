import React from "react";
import { nameToPascalCase } from "./utils";
import Input from "./componentes/Input";

function App() {
  const [inputValue, setInputValor] = React.useState("");
  const [sobrenomeValue, setSobrenomeValor] = React.useState("");
  const [idadeAtual, setIdadeAtual] = React.useState(0);

  return (
    <form>
      <Input
        type="number"
        onChange={(event) => {
          setIdadeAtual(event.target.value);
        }}
        placeholder="Informe sua idade"
      />
      <Input
        type="text"
        onChange={(event) => {
          setInputValor(event.target.value);
        }}
        placeholder="Informe seu nome"
      />
      <Input
        type="text"
        onChange={(event) => {
          setSobrenomeValor(event.target.value);
        }}
        placeholder="Informe seu sobrenome"
      />

      <br />
      {idadeAtual}
      <br />
      {nameToPascalCase(inputValue)}
      <br />
      {nameToPascalCase(sobrenomeValue)}
      <br />
    </form>
  );
}

export default App;
