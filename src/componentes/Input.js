import React from "react";

function Input(props) {
  const valoresPermitidos = ["text", "number", "password"];

  if (!valoresPermitidos.includes(props.type)) {
    return (
      <>
        <br />
        <span>
          Tipo de componente inválido. Era esperado{" "}
          {valoresPermitidos.join(",")} mas foi enviado {props.type}
        </span>
        <br />
      </>
    );
  }

  if (!props.type)
    return (
      <>
        <br />
        <span>Informe o tipo de componente</span>
        <br />
      </>
    );

  const style = {
    color: props.type === "text" ? "green" : "red", // ternário
  };

  return (
    <input
      type={props.type}
      style={style}
      onChange={props.onChange}
      placeholder={props.placeholder}
    ></input>
  );
}

// memoize = memorizar
export default React.memo(Input)

// ao encontrar um return;
// ao chegar ao fim da execução
// se ocorrer um erro

// parametros ou argumentos
// props
