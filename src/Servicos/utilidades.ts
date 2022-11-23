import { ITotalFatura, ITransacao } from "../tipos";

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