import React from "react";
import { useGlobalState } from "../state/GlobalStateContext";

// Função auxiliar para calcular a idade a partir da data de nascimento (formato "YYYY-MM-DD")
function calculateAge(birthDateStr) {
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

function AccountsList() {
  const { contas, cartoes, lancamentos } = useGlobalState();

  // Filtra os cartões vinculados à conta
  const getCardsForAccount = React.useCallback(
    (accountId) => cartoes.filter((cartao) => String(cartao.contaId) === String(accountId.id)),
    [cartoes]
  );

  // Calcula o saldo atual para a conta a partir dos lançamentos de seus cartões
  const getBalanceForAccount = React.useCallback((accountId) => {
    const accountCards = getCardsForAccount(accountId);
    let balance = 0;
    console.log({accountCards})
    accountCards.forEach((cartao) => {
      // Lança os lançamentos vinculados a este cartão
      const cardLancamentos = lancamentos.filter(
        (lancamento) => String(lancamento.cartaoId) === String(cartao.id)
      );
      cardLancamentos.forEach((lancamento) => {
        if (lancamento.tipo === "entrada") {
          balance += lancamento.valor;
        } else if (lancamento.tipo === "saida") {
          balance -= lancamento.valor;
        }
      });
    });
    return balance;
  }, [getCardsForAccount, lancamentos]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contas</h2>
      {contas.length === 0 ? (
        <p>Nenhuma conta cadastrada.</p>
      ) : (
        <div className="space-y-4">
          {contas.map((conta, i) => {
            const age = calculateAge(conta.dataNascimento);
            const cards = getCardsForAccount(conta);
            const balance = getBalanceForAccount(conta);
            return (
              <div
                key={conta.id}
                className="p-4 border rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: conta.cor }}
                  >
                    {conta.nome}
                  </h3>
                  <p>Idade: {age} anos</p>
                  <p>Cartões: {cards.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    Saldo: R$ {balance.toFixed(2)}
                  </p>
                  {balance >= 0 ? (
                    <p className="text-green-600 font-semibold">Positiva</p>
                  ) : (
                    <p className="text-red-600 font-semibold">Negativa</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AccountsList;
