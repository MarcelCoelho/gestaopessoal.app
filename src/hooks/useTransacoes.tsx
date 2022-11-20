import React from 'react';

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

import { api } from "../Servicos/api";

import { ITotalFatura, ITransacao } from '../tipos';

interface TransacaoProviderProps {
  children: ReactNode;
}

interface TransacoesContextData {
  transacoes: ITransacao[];
}

const TransacoesContext = createContext<TransacoesContextData>(
  {} as TransacoesContextData
);

export function TransacoesProvider({ children }: TransacaoProviderProps) {

  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);

  useEffect(() => {
    buscarTransacoes();
  }, []);

  async function buscarTransacoes() {

    try {

      const response = await api.get<ITransacao[]>(`/api/transacao/PorUsuario/${'marcelcoelho'}`);
      setTransacoes(response.data);
    }
    catch (error) {

    }
  }

  return (
    <TransacoesContext.Provider
      value={{
        transacoes
      }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}

export function useTransacoes() {
  const context = useContext(TransacoesContext);
  return context;
}
