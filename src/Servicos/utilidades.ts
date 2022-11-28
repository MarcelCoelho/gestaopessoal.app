import { ITipoPagamento, ITotalFatura, ITransacao } from "../tipos";
import { api } from "./api";

export const GravarDadosLocalStorage = <T>(array: T[], nome: string) => {
  if (array !== null && array !== undefined && array.length > 0)
    localStorage.setItem(nome, JSON.stringify(array));
  else
    RemoverDadosLocalStorage(nome);
}

export const RecuperarDadosLocalStorage = <T>(nome: string) => {

  const dadosLocalStorage = localStorage.getItem(nome);
  if (dadosLocalStorage) {
    const total: T = JSON.parse(dadosLocalStorage);

    return total;
  }

  return [];
}

export const RemoverDadosLocalStorage = (nome: string) => {
  localStorage.removeItem(nome);
}

export const Ordenar = (array1: ITotalFatura, array2: ITotalFatura) => {
  if (array1.ordem < array2.ordem) {
    return -1;
  }
  if (array1.ordem > array2.ordem) {
    return 1;
  }
  return 0;
}

export const CalcularTotalFatura = (transacoes: ITransacao[]) => {
  if (transacoes !== null && transacoes !== undefined && transacoes.length > 0) {
    let valorTotal = 0;
    for (var idx = 0; idx <= transacoes.length - 1; idx++) {
      valorTotal += Number(transacoes[idx].valor);
    }
    return valorTotal;
  }

  return 0;
}

export const BuscarListaTiposPagamento = async () => {

  const tiposPagamentoLocalStorage = RecuperarDadosLocalStorage<ITipoPagamento[]>('tiposPagamento');
  if (tiposPagamentoLocalStorage && tiposPagamentoLocalStorage.length > 0)
    return tiposPagamentoLocalStorage;

  const response = await api.get<ITipoPagamento[]>("/api/TipoPagamento");
  return response.data;
}

export const FiltrarTransacoes = (filtroBusca: string, transacoes: ITransacao[]) => {
  if (filtroBusca.trim() !== "") {

    const pesquisaDividida = filtroBusca.split('|');

    const filtrarExcecoes = pesquisaDividida[0] === "!";
    const parametroBuscaAtualizado = filtrarExcecoes ? pesquisaDividida[1] : pesquisaDividida[0];

    let resultado: ITransacao[] = [];
    let itemEncontrado = false;

    transacoes.forEach((item) => {
      if (indexOf(item.produto, parametroBuscaAtualizado))
        itemEncontrado = true;

      if (indexOf(item.loja, parametroBuscaAtualizado))
        itemEncontrado = true;

      if (indexOf(item.local, parametroBuscaAtualizado))
        itemEncontrado = true;

      if (indexOf(item.observacao, parametroBuscaAtualizado))
        itemEncontrado = true;

      if (indexOf(item.tipoPagamento.descricao, parametroBuscaAtualizado))
        itemEncontrado = true;

      if (Number(item.valor) === Number(parametroBuscaAtualizado))
        itemEncontrado = true;

      if (new Date(item.data).getDate() === new Date(parametroBuscaAtualizado).getDate())
        itemEncontrado = true;

      if (itemEncontrado)
        resultado.push(item);

      itemEncontrado = false;
    });

    // significa que deverá trazer tudo que é diferente do que foi encontrado
    if (resultado.length > 0 && filtrarExcecoes) {
      let novoArray: ITransacao[] = [];
      for (var idx = 0; idx <= transacoes.length - 1; idx++) {
        const transacaoID = transacoes[idx].id;

        const transacao = resultado.filter(ayt => ayt.id === transacaoID)[0];
        if (transacao === null || transacao === undefined) {
          novoArray.push(transacoes[idx]);
        }
      }
      resultado = novoArray;
    }
    return resultado;
  }
}

export const indexOf = (valor: string, filtroBusca: string) => {
  return (valor.toLocaleLowerCase().indexOf(filtroBusca.toLocaleLowerCase()) > -1);
}