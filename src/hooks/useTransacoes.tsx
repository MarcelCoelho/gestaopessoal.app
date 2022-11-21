
import {
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";

import { api } from "../Servicos/api";
import { CalcularTotalFatura, GravarDadosLocalStorage, Ordenar } from '../Servicos/utilidades';

import { ITotalFatura, ITransacao } from '../tipos';
import { useTotalFatura } from "./useTotalFatura";

interface TransacaoProviderProps {
  children: ReactNode;
}

interface TransacoesContextData {
  buscarTransacoesTotalFatura: () => Promise<ITotalFatura[] | undefined>;
  atualizarTransacoesTotalFatura: (transacoesTotalFatura: ITotalFatura[]) => void;
  atualizarTransacoesPorTotalFatura: (transacaoPorTotalFatura: ITotalFatura) => void;
  atualizarTransacoesPorTotalFaturaSnapshot: (totalFaturaID: string) => void;
  excluirTransacao: (idFatura: string, idTransacao: string) => void;
  modoEdicao: (transacao: ITransacao) => void;
  atualizarTransacao: (transacao: ITransacao) => void;
  transacoesTotalFatura: ITotalFatura[];
  loading: boolean;
}

const TransacoesContext = createContext<TransacoesContextData>(
  {} as TransacoesContextData
);

export function TransacoesProvider({ children }: TransacaoProviderProps) {

  const { faturasSelecionadas } = useTotalFatura();
  const [transacoesTotalFatura, setTransacoesTotalFatura] = useState<ITotalFatura[]>([]);
  const [transacoesTotalFaturaSnapshot, setTransacoesTotalFaturaSnapshot] = useState<ITotalFatura[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarTransacoesTotalFatura = async () => {

    try {
      setLoading(true);
      const ids = faturasSelecionadas.map(fs => fs.id);
      const response = await api.post<ITotalFatura[]>("/api/transacao/TransacoesPorFaturas", ids);
      //setTransacoesTotalFatura(response.data);
      setTransacoesTotalFaturaSnapshot(response.data);
      setLoading(false);

      return response.data;
    }
    catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const atualizarTransacoesTotalFatura = (transacoesTotalFaturas: ITotalFatura[]) => {
    setTransacoesTotalFatura(transacoesTotalFaturas);
  }

  const atualizarTransacoesPorTotalFatura = (transacaoPorTotalFatura: ITotalFatura) => {
    // remove item que foi alterado da lista original e depois atualiza a lista original com novo item alterado
    let arrayClonado = Object.values(transacoesTotalFatura);
    arrayClonado = arrayClonado.filter(ac => ac.id !== transacaoPorTotalFatura.id);

    arrayClonado.push(transacaoPorTotalFatura);

    arrayClonado.sort(Ordenar);

    GravarDadosLocalStorage(arrayClonado, 'totalFatura');
    setTransacoesTotalFatura(arrayClonado);
  }

  const atualizarTransacoesPorTotalFaturaSnapshot = (totalFaturaID: string) => {

    // logica para manter o campo pesquisa visivel depois de recarregar os dados com transacoes originais
    const totalFaturaFiltrado = transacoesTotalFaturaSnapshot.filter(tfs => tfs.id === totalFaturaID)[0];
    totalFaturaFiltrado.transacoesVisiveis = true;

    const arrayClonado = Object.values(transacoesTotalFatura);

    const totalFaturaParaRemover = transacoesTotalFatura.filter(tfs => tfs.id === totalFaturaID)[0];
    const indiceObjeto = arrayClonado.indexOf(totalFaturaParaRemover);
    if (indiceObjeto > -1) {
      arrayClonado.splice(indiceObjeto, 1);
    }

    arrayClonado.push(totalFaturaFiltrado);

    arrayClonado.sort(Ordenar);

    setTransacoesTotalFatura(arrayClonado);
    GravarDadosLocalStorage(arrayClonado, 'totalFatura');
  }

  const excluirTransacao = async (idFatura: string, idTransacao: string) => {
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

    let totalFaturasClonado = Object.values(transacoesTotalFatura);
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
        totalFaturasClonado.sort(Ordenar);

        GravarDadosLocalStorage(totalFaturasClonado, 'totalFatura');
        setTransacoesTotalFatura(totalFaturasClonado);

        removerTransacaoDaListaTransacoesPorTotalFaturaSnapshot(idFatura, idTransacao);

      }
    }
  }

  function removerTransacaoDaListaTransacoesPorTotalFaturaSnapshot(idFatura: string, idTransacao: string) {
    let totalFaturasClonado = Object.values(transacoesTotalFaturaSnapshot);
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
        totalFaturasClonado.sort(Ordenar);
        setTransacoesTotalFaturaSnapshot(totalFaturasClonado);

      }
    }
  }

  const modoEdicao = (transacao: ITransacao) => {
    transacao.editando = !transacao.editando;

    const totalFaturaClonado = substituirTransacao(transacao);
    const totalFaturasClonado = substituirTotalFatura(totalFaturaClonado);

    GravarDadosLocalStorage(totalFaturasClonado, 'totalFatura');
    setTransacoesTotalFatura(totalFaturasClonado);
  }

  function substituirTransacao(transacao: ITransacao) {

    let totalFaturasClonado = Object.values(transacoesTotalFatura);
    const totalFaturaClonado = totalFaturasClonado.filter(t => t.id === transacao.faturaId)[0];
    if (totalFaturaClonado) {

      const transacaoClonada = totalFaturaClonado.transacoes.filter(t => t.id === transacao.id)[0];
      if (transacaoClonada) {

        const indiceTransacao = totalFaturaClonado.transacoes.indexOf(transacaoClonada);
        if (indiceTransacao > -1) {
          totalFaturaClonado.transacoes.splice(indiceTransacao, 1, transacao);
        }
      }
    }
    return totalFaturaClonado;
  }

  function substituirTotalFatura(totalFaturaClonado: ITotalFatura) {
    let totalFaturasClonado = Object.values(transacoesTotalFatura);
    const indiceTotalFatura = totalFaturasClonado.indexOf(totalFaturaClonado);
    if (indiceTotalFatura > -1)
      totalFaturasClonado.splice(indiceTotalFatura, 1);

    totalFaturasClonado.push(totalFaturaClonado);
    totalFaturasClonado.sort(Ordenar);
    return totalFaturasClonado;
  }

  const atualizarTransacao = async (transacao: ITransacao) => {
    transacao.editando = false;
    await api.put<ITotalFatura[]>(`/api/transacao/${transacao.id}`, { ...transacao });

    const totalFaturaClonado = substituirTransacao(transacao);
    const totalFaturasClonado = substituirTotalFatura(totalFaturaClonado);

    GravarDadosLocalStorage(totalFaturasClonado, 'totalFatura');
    setTransacoesTotalFatura(totalFaturasClonado);
  }

  return (
    <TransacoesContext.Provider
      value={{
        buscarTransacoesTotalFatura,
        atualizarTransacoesTotalFatura,
        atualizarTransacoesPorTotalFatura,
        atualizarTransacoesPorTotalFaturaSnapshot,
        excluirTransacao,
        modoEdicao,
        atualizarTransacao,
        transacoesTotalFatura,
        loading
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
