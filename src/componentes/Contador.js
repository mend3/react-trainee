import React from "react";

export function Contador() {
  const [contador, setContador] = React.useState(0);

  return (
    <>
      <h1>Contador {contador}</h1>
      <input
        type="button"
        onClick={() => {
          setContador(contador + 1);
        }}
        value={"Button"}
      />
    </>
  );
}
