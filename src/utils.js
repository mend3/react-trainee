export function nameToPascalCase(textoPraCorrigir) {
  const novoNome = textoPraCorrigir //"victor mendonça"
    .split(" ") // ["victor", "mendonça"]
    .map((qualquercoisa) => {
      //"victor"
      return (
        qualquercoisa[0]?.toUpperCase() +
        qualquercoisa.substring(1, qualquercoisa.length)
      );
    }) // ["Victor", "Mendonça"]
    .join(" "); //Victor Mendonça

  return novoNome;
}
