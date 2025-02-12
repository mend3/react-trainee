import React from "react";
import { nameToPascalCase } from "./utils";

function App() {
  const [inputValue, setInputValor] = React.useState("");

  return (
    <form>
      <input
        type="text"
        placeholder="Digite seu nome"
        onChange={(event) => {
          setInputValor(event.target.value);
        }}
        defaultValue={inputValue}
      ></input>

      <br />
      {nameToPascalCase(inputValue)}
    </form>
  );
}

export default App;
