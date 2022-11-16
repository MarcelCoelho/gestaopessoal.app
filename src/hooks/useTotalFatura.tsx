import React from 'react';

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from '../Servicos/api';
import { ITotalFatura } from '../tipos';

interface TotalFaturaProviderProps {
  children: ReactNode;
}

interface TotalFaturaContextData {
  atualizarFaturaAtivada: (totalFatura: ITotalFatura, adicionarTotalFatura: boolean) => void;
  atualizarTotalFatura: (totalFaturas: ITotalFatura[]) => void;
  atualizarTransacoesPorTotalFatura: (totalFatura: ITotalFatura) => void;
  atualizarTransacoesPorTotalFaturaSnapshot: (idTotalFatura: string) => void;
  buscarTransacoesPorFaturas: () => void;
  atualizarFaturasSelecionadas: (totalFaturas: ITotalFatura[], selecionarTodasFaturas: boolean) => void;
  faturasSelecionadas: ITotalFatura[];
  faturasNaoSelecionadas: ITotalFatura[];
  transacoesPorTotalFatura: ITotalFatura[];
  valorTotalFaturasSelecionadas: number;
  todasFaturasSelecionadas: boolean;
  loading: boolean;
}

const TotalFaturaContext = createContext<TotalFaturaContextData>(
  {} as TotalFaturaContextData
);

export function TotalFaturaProvider({ children }: TotalFaturaProviderProps) {

  const [faturasSelecionadas, setFaturasSelecionadas] = useState<ITotalFatura[]>([]);
  const [faturasNaoSelecionadas, setFaturasNaoSelecionadas] = useState<ITotalFatura[]>([]);
  const [todasFaturasSelecionadas, setTodasFaturasSelecionadas] = useState(false);

  const [transacoesPorTotalFatura, setTransacoesPorTotalFatura] = useState<ITotalFatura[]>([]);
  const [transacoesPorTotalFaturaSnapshot, setTransacoesPorTotalFaturaSnapshot] = useState<ITotalFatura[]>([]);

  const [valorTotalFaturasSelecionadas, setValorTotalFaturasSelecionadas] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarTransacoesPorFaturas()
  }, [faturasSelecionadas]);

  async function buscarTransacoesPorFaturas() {
    try {
      setLoading(true);
      const ids = faturasSelecionadas.map(fs => fs.id);
      const response = await api.post<ITotalFatura[]>("/api/transacao/TransacoesPorFaturas", ids);
      setTransacoesPorTotalFatura(response.data);
      setTransacoesPorTotalFaturaSnapshot(response.data);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  }

  function atualizarFaturasSelecionadas(totalFatura: ITotalFatura[], selecionarTodasFaturas: boolean) {
    if (selecionarTodasFaturas) {
      setFaturasSelecionadas(totalFatura);
      setValorTotalFaturasSelecionadas(CalcularTotalFaturasSelecionadas(totalFatura));
    }
    else {
      setFaturasSelecionadas([]);
      setValorTotalFaturasSelecionadas(CalcularTotalFaturasSelecionadas([]));
    }
    setTodasFaturasSelecionadas(selecionarTodasFaturas);
    atualizarFaturasNaoSelecionadas();
  }

  function atualizarFaturaAtivada(totalFatura: ITotalFatura, adicionarTotalFatura: boolean) {

    let array: ITotalFatura[];

    if (adicionarTotalFatura) {
      array = Object.values(faturasSelecionadas);
      array.push(totalFatura);
      setFaturasSelecionadas([...faturasSelecionadas, totalFatura]);
    }
    else {
      array = faturasSelecionadas.filter(fs => fs.id !== totalFatura.id);
      setFaturasSelecionadas(array);
    }
    setValorTotalFaturasSelecionadas(CalcularTotalFaturasSelecionadas(array));
    atualizarFaturasNaoSelecionadas();
  }

  function atualizarFaturasNaoSelecionadas() {
    if (faturasSelecionadas.length > 0) {
      let novoArrayFaturasNaoSelecionadas: ITotalFatura[] = [];

      for (var idx = 0; transacoesPorTotalFatura.length - 1; idx++) {
        const transacaoFatura = faturasSelecionadas.filter(tf => tf.id !== transacoesPorTotalFatura[idx].id)[0];
        if (transacaoFatura)
          novoArrayFaturasNaoSelecionadas.push(transacaoFatura);
      }
      setFaturasNaoSelecionadas(novoArrayFaturasNaoSelecionadas);
    }
    else
      setFaturasNaoSelecionadas([]);
  }

  function CalcularTotalFaturasSelecionadas(array: ITotalFatura[]) {
    let valorTotal = 0;
    if (array != null && array != undefined && array.length > 0) {
      for (var idx = 0; idx <= array.length - 1; idx++) {
        valorTotal += array[idx].valor;
      }
    }
    return valorTotal;
  }

  function atualizarTotalFatura(totalFaturas: ITotalFatura[]) {
    setTransacoesPorTotalFatura(totalFaturas);
  }
  function atualizarTransacoesPorTotalFatura(totalFatura: ITotalFatura) {
    // remove item que foi alterado da lista original e depois atualiza a lista original com novo item alterado
    let arrayClonado = Object.values(transacoesPorTotalFatura);
    arrayClonado = arrayClonado.filter(ac => ac.id !== totalFatura.id);

    arrayClonado.push(totalFatura);

    arrayClonado.sort(compare);

    setTransacoesPorTotalFatura(arrayClonado);
  }

  function atualizarTransacoesPorTotalFaturaSnapshot(idTotalFatura: string) {

    // logica para manter o campo pesquisa visivel depois de recarregar os dados com transacoes originais
    const totalFaturaFiltrado = transacoesPorTotalFaturaSnapshot.filter(tfs => tfs.id === idTotalFatura)[0];
    totalFaturaFiltrado.transacoesVisiveis = true;

    const arrayClonado = Object.values(transacoesPorTotalFatura);

    const totalFaturaParaRemover = transacoesPorTotalFatura.filter(tfs => tfs.id === idTotalFatura)[0];
    const indiceObjeto = arrayClonado.indexOf(totalFaturaParaRemover);
    if (indiceObjeto > -1) {
      arrayClonado.splice(indiceObjeto, 1);
    }

    arrayClonado.push(totalFaturaFiltrado);

    arrayClonado.sort(compare);

    setTransacoesPorTotalFatura(arrayClonado);
  }

  function compare(array1, array2) {
    if (array1.ordem < array2.ordem) {
      return -1;
    }
    if (array1.ordem > array2.ordem) {
      return 1;
    }
    return 0;
  }

  return (
    <TotalFaturaContext.Provider
      value={{
        atualizarFaturaAtivada,
        atualizarTransacoesPorTotalFatura,
        atualizarTransacoesPorTotalFaturaSnapshot,
        atualizarTotalFatura,
        buscarTransacoesPorFaturas,
        atualizarFaturasSelecionadas,
        faturasSelecionadas,
        faturasNaoSelecionadas,
        transacoesPorTotalFatura,
        valorTotalFaturasSelecionadas,
        todasFaturasSelecionadas,
        loading
      }}
    >
      {children}
    </TotalFaturaContext.Provider>
  );
}

export function useTotalFatura() {
  const context = useContext(TotalFaturaContext);
  return context;
}
