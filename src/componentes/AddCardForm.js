import React, { useState } from "react";
import { useGlobalState, useGlobalDispatch } from "../state/GlobalStateContext";

function AddCardForm() {
  const { contas } = useGlobalState(); // Obtém as contas cadastradas
  const dispatch = useGlobalDispatch();

  // Estados locais para os campos do formulário
  const [selectedConta, setSelectedConta] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [nomeImpresso, setNomeImpresso] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples: verifica se todos os campos foram preenchidos
    if (
      !selectedConta ||
      !numero.trim() ||
      !validade.trim() ||
      !nomeImpresso.trim()
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Criação do objeto cartão
    // entidades
    const novoCartao = {
      id: Date.now(), // Pode ser substituído por um uuid ou outro identificador único
      contaId: selectedConta, // Associa o cartão à conta selecionada
      numero,
      validade,
      nomeImpresso,
    };

    // Dispara a ação para adicionar o cartão ao estado global
    dispatch({ type: "ADD_CARTAO", payload: novoCartao });

    // Limpa os campos do formulário após a submissão
    setNumero("");
    setValidade("");
    setNomeImpresso("");
  };

  return (
    <div className="mt-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Adicionar Cartão</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seleção de Conta */}
        <div>
          <label htmlFor="conta" className="block font-medium">
            Selecione a Conta:
          </label>
          <select
            id="conta"
            value={selectedConta}
            onChange={(e) => setSelectedConta(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded"
            required
          >
            <option value="">-- Selecione uma conta --</option>
            {contas.map((conta) => (
              <option key={conta.id} value={conta.id}>
                {conta.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Número do Cartão */}
        <div>
          <label htmlFor="numero" className="block font-medium">
            Número do Cartão:
          </label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Digite o número do cartão"
            className="mt-1 block w-full border-gray-300 rounded"
            required
          />
        </div>

        {/* Validade */}
        <div>
          <label htmlFor="validade" className="block font-medium">
            Validade (MM/AA):
          </label>
          <input
            type="text"
            id="validade"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            placeholder="MM/AA"
            className="mt-1 block w-full border-gray-300 rounded"
            required
          />
        </div>

        {/* Nome Impresso */}
        <div>
          <label htmlFor="nomeImpresso" className="block font-medium">
            Nome Impresso:
          </label>
          <input
            type="text"
            id="nomeImpresso"
            value={nomeImpresso}
            onChange={(e) => setNomeImpresso(e.target.value)}
            placeholder="Nome que aparece no cartão"
            className="mt-1 block w-full border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Adicionar Cartão
        </button>
      </form>
    </div>
  );
}

export default AddCardForm;
