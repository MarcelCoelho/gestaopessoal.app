import React from 'react';

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from '../Servicos/api';
import { CalcularTotalFatura, Compare, GravarDadosLocalStorage } from '../Servicos/utilidades';
import { ITotalFatura } from '../tipos';

//import Cookies from 'js-cookie';

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
  excluirTransacao: (idFatura: string, idTransacao: string) => void;
  faturasSelecionadas: ITotalFatura[];
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

      if (faturasSelecionadas.length === 0) {
        const faturasSelecionadasLocalStorage = localStorage.getItem('faturasSelecionadas');

        if (faturasSelecionadasLocalStorage) {
          const faturasSeleciondasConvertido: ITotalFatura[] = JSON.parse(faturasSelecionadasLocalStorage);
          setFaturasSelecionadas(faturasSeleciondasConvertido);
        }
      }
      else {

        const ids = faturasSelecionadas.map(fs => fs.id);
        const response = await api.post<ITotalFatura[]>("/api/transacao/TransacoesPorFaturas", ids);
        setTransacoesPorTotalFatura(response.data);
        setTransacoesPorTotalFaturaSnapshot(response.data);

        console.log(JSON.stringify(response.data));

        GravarDadosLocalStorage(response.data, 'totalFatura');

        setLoading(false);
      }
    }
    catch (error) {
      setLoading(false);
    }
  }

  function atualizarFaturasSelecionadas(totalFatura: ITotalFatura[], selecionarTodasFaturas: boolean) {
    if (selecionarTodasFaturas) {
      setFaturasSelecionadas(totalFatura);
      setValorTotalFaturasSelecionadas(CalcularTotalFaturasSelecionadas(totalFatura));
      GravarDadosLocalStorage(totalFatura, 'faturasSelecionadas');
    }
    else {
      setFaturasSelecionadas([]);
      setValorTotalFaturasSelecionadas(CalcularTotalFaturasSelecionadas([]));
      GravarDadosLocalStorage([], 'faturasSelecionadas');
    }
    setTodasFaturasSelecionadas(selecionarTodasFaturas);
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
    GravarDadosLocalStorage(array, 'faturasSelecionadas');
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

    arrayClonado.sort(Compare);

    GravarDadosLocalStorage(arrayClonado, 'totalFatura');
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

    arrayClonado.sort(Compare);

    setTransacoesPorTotalFatura(arrayClonado);
    GravarDadosLocalStorage(arrayClonado, 'totalFatura');
  }



  async function excluirTransacao(idFatura: string, idTransacao: string) {
    try {
      if (window.confirm('Tem certeza que deseja remover?')) {
        await api.delete<ITotalFatura[]>(`/api/transacao/${idTransacao}`);
        removerTransacaoDaListaTransacoesPorTotalFatura(idFatura, idTransacao);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  function removerTransacaoDaListaTransacoesPorTotalFatura(idFatura: string, idTransacao: string) {

    let totalFaturasClonado = Object.values(transacoesPorTotalFatura);
    const totalFaturaClonado = totalFaturasClonado.filter(t => t.id === idFatura)[0];
    if (totalFaturaClonado) {

      const transacao = totalFaturaClonado.transacoes.filter(t => t.id === idTransacao)[0];
      if (transacao) {

        const indiceTransacao = totalFaturaClonado.transacoes.indexOf(transacao);
        if (indiceTransacao > -1)
          totalFaturaClonado.transacoes.splice(indiceTransacao, 1);

        const indiceTotalFatura = totalFaturasClonado.indexOf(totalFaturaClonado);
        if (indiceTotalFatura > -1)
          totalFaturasClonado.splice(indiceTotalFatura, 1);

        totalFaturaClonado.quantidadeTransacoes = totalFaturaClonado.transacoes.length;
        totalFaturaClonado.valor = CalcularTotalFatura(totalFaturaClonado.transacoes);

        totalFaturasClonado.push(totalFaturaClonado);
        totalFaturasClonado.sort(Compare);

        GravarDadosLocalStorage(totalFaturasClonado, 'totalFatura');
        setTransacoesPorTotalFatura(totalFaturasClonado);

        removerTransacaoDaListaTransacoesPorTotalFaturaSnapshot(idFatura, idTransacao);

      }
    }
  }

  function removerTransacaoDaListaTransacoesPorTotalFaturaSnapshot(idFatura: string, idTransacao: string) {
    let totalFaturasClonado = Object.values(transacoesPorTotalFaturaSnapshot);
    const totalFaturaClonado = totalFaturasClonado.filter(t => t.id === idFatura)[0];
    if (totalFaturaClonado) {

      const transacao = totalFaturaClonado.transacoes.filter(t => t.id === idTransacao)[0];
      if (transacao) {

        const indiceTransacao = totalFaturaClonado.transacoes.indexOf(transacao);
        if (indiceTransacao > -1)
          totalFaturaClonado.transacoes.splice(indiceTransacao, 1);

        const indiceTotalFatura = totalFaturasClonado.indexOf(totalFaturaClonado);
        if (indiceTotalFatura > -1)
          totalFaturasClonado.splice(indiceTotalFatura, 1);

        totalFaturaClonado.quantidadeTransacoes = totalFaturaClonado.transacoes.length;
        totalFaturaClonado.valor = CalcularTotalFatura(totalFaturaClonado.transacoes);

        totalFaturasClonado.push(totalFaturaClonado);
        totalFaturasClonado.sort(Compare);
        setTransacoesPorTotalFaturaSnapshot(totalFaturasClonado);

      }
    }
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
        excluirTransacao,
        faturasSelecionadas,
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
