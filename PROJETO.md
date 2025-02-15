# Dia 4 - Aplicação de Controle de Gastos

## Objetivo do Dia

Desenvolver uma aplicação que permita lançar valores pagos e recebidos, possibilitando o acompanhamento do saldo atual de uma ou mais contas, cartões ou pessoas.

---

## Tópicos do Dia

### 1. Apresentação do Projeto

- **Visão Geral:**  
  Introdução à aplicação de controle de gastos e seus requisitos.
- **Especificações:**  
  - Lançar valores pagos (despesas) e recebidos (receitas).  
  - Gerenciar múltiplas contas/cartões/pessoas.  
  - Calcular e exibir o saldo atual de cada conta.

---

### 2. Estruturação da Aplicação e Componentes

- **Divisão em Componentes:**  
  - **Header:** Título e breve descrição da aplicação.  
  - **Formulário de Lançamento:** Inputs para informar o valor, tipo (pago ou recebido) e a conta associada.  
  - **Lista de Transações:** Exibição das transações realizadas.  
  - **Resumo/Saldo:** Cálculo e exibição do saldo atual de cada conta.
- **Organização do Projeto:**  
  Estruturação de pastas e arquivos para manter o código modular e organizado.

---

### 3. Gerenciamento de Estado com React

- **Uso do `useState`:**  
  - Armazenar a lista de transações.  
  - Gerenciar os saldos e informações de cada conta.
- **Estratégia para Múltiplas Contas:**  
  - Utilizar um objeto ou array para representar cada conta e seus respectivos saldos.  
  - Atualizar o estado ao adicionar novas transações, recalculando os saldos.

---

### 4. Manipulação de Eventos e Atualização Dinâmica

- **Criação do Formulário de Lançamento:**  
  - Captura dos inputs do usuário (valor, tipo e conta) e submissão do formulário.
- **Funções de Atualização:**  
  - Lógica para identificar se a transação é uma receita ou despesa e atualizar o saldo da conta correspondente.  
  - Utilização de funções para calcular o novo saldo: somar receitas e subtrair despesas.
- **Validação e Feedback:**  
  - Implementação de validações para entradas inválidas.  
  - Exibição de mensagens de erro ou confirmação após a submissão.

---

### 5. Integração e Testes da Aplicação

- **Integração dos Componentes:**  
  - Montar a aplicação combinando os componentes desenvolvidos.
- **Testes Manuais:**  
  - Adicionar diversas transações para verificar se o saldo é atualizado corretamente.  
  - Revisar a interface e a experiência do usuário.
- **Debugar e Refinar:**  
  - Revisar a lógica de atualização e corrigir eventuais problemas ou inconsistências.

---
