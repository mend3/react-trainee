import React, { useState } from "react";
import { useGlobalDispatch } from "../state/GlobalStateContext";

// Função para gerar uma cor aleatória no formato hexadecimal
function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

/**
 * Componente AccountForm
 *
 * @param {Object} props
 * @param {Object|null} props.account - Se fornecido, significa que estamos editando a conta; caso contrário, cria uma nova.
 * @param {Function} [props.onSuccess] - Callback executada após a submissão com sucesso.
 */
function AccountForm({ account = null, onSuccess }) {
  const dispatch = useGlobalDispatch();

  // Estados iniciais: se estiver editando, utiliza os valores da conta; se não, inicia com valores vazios
  const [nome, setNome] = useState(account ? account.nome : "");
  const [dataNascimento, setDataNascimento] = useState(
    account ? account.dataNascimento : ""
  );
  const [cor, setCor] = useState(account ? account.cor : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Se o usuário não escolher uma cor, gera uma aleatória
    const selectedColor = cor || getRandomColor();

    // Validação simples
    if (!nome || !dataNascimento) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Cria o objeto conta
    const contaData = {
      id: account ? account.id : Date.now(), // Em produção, considere usar um UUID
      nome,
      dataNascimento,
      cor: selectedColor,
    };

    // Verifica se é edição ou criação
    if (account) {
      dispatch({ type: "UPDATE_CONTA", payload: contaData });
    } else {
      dispatch({ type: "ADD_CONTA", payload: contaData });
    }

    // Se existir callback de sucesso, chama-o
    if (onSuccess) {
      onSuccess(contaData);
    }

    // Se for criação, limpa os campos
    if (!account) {
      setNome("");
      setDataNascimento("");
      setCor("");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {account ? "Editar Conta" : "Criar Conta"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label htmlFor="nome" className="block font-medium">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
            className="mt-1 block w-full border-gray-300 rounded"
            required
          />
        </div>

        {/* Data de Nascimento */}
        <div>
          <label htmlFor="dataNascimento" className="block font-medium">
            Data de Nascimento:
          </label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded"
            required
          />
        </div>

        {/* Color Picker */}
        <div>
          <label htmlFor="cor" className="block font-medium">
            Cor:
          </label>
          <input
            type="color"
            id="cor"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="mt-1 block w-16 h-10 p-0 border-none"
          />
          <p className="text-gray-500 text-sm">
            Se não escolher, será utilizada uma cor aleatória.
          </p>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {account ? "Atualizar Conta" : "Criar Conta"}
        </button>
      </form>
    </div>
  );
}

export default AccountForm;
