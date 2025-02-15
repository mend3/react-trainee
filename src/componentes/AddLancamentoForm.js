import React, { useState } from "react";
import { useGlobalDispatch, useGlobalState } from "../state/GlobalStateContext";

// Função para verificar se o cartão é válido (baseada na validade "MM/AA")
function isCardValid(cartao) {
  if (!cartao.validade) return false;
  const [mesStr, anoStr] = cartao.validade.split("/");
  const mes = parseInt(mesStr, 10);
  const ano = parseInt(anoStr, 10);
  if (isNaN(mes) || isNaN(ano)) return false;
  // Considera o ano no formato 20XX
  const fullYear = ano + 2000;
  // Data de expiração: último dia do mês informado
  const expiryDate = new Date(fullYear, mes, 0);
  const today = new Date();
  return expiryDate >= today;
}

function AddLancamentoForm() {
  const { cartoes } = useGlobalState(); // Obtém os cartões cadastrados
  const dispatch = useGlobalDispatch();

  // Filtra apenas os cartões válidos
  const validCards = cartoes.filter(isCardValid);

  // Estados locais para o formulário
  const [selectedCartao, setSelectedCartao] = useState("");
  const [tipoLancamento, setTipoLancamento] = useState("entrada");
  const [dataLancamento, setDataLancamento] = useState("");
  const [valor, setValor] = useState("");
  const [centroCusto, setCentroCusto] = useState("");
  const [detalhes, setDetalhes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida se um cartão foi selecionado
    if (!selectedCartao) {
      alert("Selecione um cartão válido.");
      return;
    }

    // Valida o valor
    if (!valor) {
      alert("Informe um valor para o lançamento.");
      return;
    }

    // Se a data não for informada, usa a data atual (no formato YYYY-MM-DD)
    // valor padrão ou fallback
    const lancamentoData =
      dataLancamento || new Date().toISOString().split("T")[0];

    // Cria o objeto do lançamento
    const novoLancamento = {
      id: Date.now(), // identificador único (pode usar uuid, se preferir)
      cartaoId: selectedCartao,
      tipo: tipoLancamento,
      data: lancamentoData,
      valor: parseFloat(valor),
      centroCusto: centroCusto || null,
      detalhes: detalhes || null,
    };

    // Dispara a ação para adicionar o lançamento
    dispatch({ type: "ADD_LANCAMENTO", payload: novoLancamento });

    // Limpa os campos do formulário
    setSelectedCartao("");
    setTipoLancamento("entrada");
    setDataLancamento("");
    setValor("");
    setCentroCusto("");
    setDetalhes("");
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Efetuar Lançamento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seleção do cartão */}
        <div>
          <label htmlFor="cartao" className="block font-medium">
            Selecione o Cartão:
          </label>
          <select
            id="cartao"
            value={selectedCartao}
            onChange={(e) => setSelectedCartao(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded"
            required
          >
            <option value="">-- Selecione um cartão válido --</option>
            {validCards.map((cartao) => (
              <option key={cartao.id} value={cartao.id}>
                {cartao.numero} - {cartao.nomeImpresso} (Válido até{" "}
                {cartao.validade})
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de lançamento */}
        <div>
          <span className="block font-medium">Tipo de Lançamento:</span>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="tipoLancamento"
              value="entrada"
              checked={tipoLancamento === "entrada"}
              onChange={() => setTipoLancamento("entrada")}
              className="mr-2"
            />
            Entrada
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="tipoLancamento"
              value="saida"
              checked={tipoLancamento === "saida"}
              onChange={() => setTipoLancamento("saida")}
              className="mr-2"
            />
            Saída
          </label>
        </div>

        {/* Data do lançamento */}
        <div>
          <label htmlFor="dataLancamento" className="block font-medium">
            Data do Lançamento:
          </label>
          <input
            type="date"
            id="dataLancamento"
            value={dataLancamento}
            onChange={(e) => setDataLancamento(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded"
          />
          <small className="text-gray-500">
            Se não informar, será utilizada a data atual.
          </small>
        </div>

        {/* Valor */}
        <div>
          <label htmlFor="valor" className="block font-medium">
            Valor:
          </label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Digite o valor"
            className="mt-1 block w-full border-gray-300 rounded"
            step="0.01"
            required
          />
        </div>

        {/* Centro de Custo (opcional) */}
        <div>
          <label htmlFor="centroCusto" className="block font-medium">
            Centro de Custo (opcional):
          </label>
          <input
            type="text"
            id="centroCusto"
            value={centroCusto}
            onChange={(e) => setCentroCusto(e.target.value)}
            placeholder="Centro de custo"
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </div>

        {/* Detalhes (opcional) */}
        <div>
          <label htmlFor="detalhes" className="block font-medium">
            Detalhes (opcional):
          </label>
          <textarea
            id="detalhes"
            value={detalhes}
            onChange={(e) => setDetalhes(e.target.value)}
            placeholder="Adicione detalhes sobre o lançamento"
            className="mt-1 block w-full border-gray-300 rounded"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Adicionar Lançamento
        </button>
      </form>
    </div>
  );
}

export default AddLancamentoForm;
