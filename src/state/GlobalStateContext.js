// GlobalStateContext.js
import React from "react";

// Estado inicial com os cadastros
/**
 * @type {{contas: Array<{id:number,cor:string,nome:string,dataNascimento:string}>,cartoes: Array<{id:number,numero:string,nomeImpresso:string,validade:string,contaId:number}>,lancamentos: Array<{id:number,cartaoId:number,valor:number,tipo:'entrada'|'saida'}>}}
 */
const initialState = {
  contas: [],
  cartoes: [],
  lancamentos: [],
  // Adicione outras categorias conforme necessário
};

// Cria os contexts
const GlobalStateContext = React.createContext(initialState);
/**
 * @type {React.Context<React.ActionDispatch<[{type:string, payload:any}]>>}
 */
const GlobalDispatchContext = React.createContext((args) => {});

// Reducer para atualizar o estado global com base na ação
/**
 *
 * @param {typeof initialState} state
 * @param {{type:string, payload: any}} action
 * @returns {typeof initialState}
 */
function globalReducer(state, action) {
  switch (action.type) {
    case "ADD_CONTA":
      return { ...state, contas: [...state.contas, action.payload] };
    case "ADD_CARTAO":
      return { ...state, cartoes: [...state.cartoes, action.payload] };
    case "ADD_LANCAMENTO":
      return { ...state, lancamentos: [...state.lancamentos, action.payload] };
    case "REMOVE_CONTA":
      return {
        ...state,
        contas: state.contas.filter((conta) => conta.id !== action.payload),
      };
    case "REMOVE_CARTAO":
      return {
        ...state,
        cartoes: state.cartoes.filter((cartao) => cartao.id !== action.payload),
      };
    case "REMOVE_LANCAMENTO":
      return {
        ...state,
        lancamentos: state.lancamentos.filter(
          (lancamento) => lancamento.id !== action.payload
        ),
      };
    // Caso queira implementar ações de atualização, adicione os cases aqui
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}

// Provider que encapsula a aplicação e fornece o estado e a função dispatch
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

// Hooks para facilitar o consumo do estado e dispatch
export const useGlobalState = () => React.useContext(GlobalStateContext);
export const useGlobalDispatch = () => React.useContext(GlobalDispatchContext);
