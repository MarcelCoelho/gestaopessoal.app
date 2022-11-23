import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../Servicos/api";
import { GravarDadosLocalStorage, RecuperarDadosLocalStorage, RemoverDadosLocalStorage } from '../Servicos/utilidades';
import { ITipoPagamento, ITotalFatura } from '../tipos';

interface TotalFaturaProviderProps {
  children: ReactNode;
}

interface TotalFaturaContextData {
  atualizarFaturaAtivada: (totalFatura: ITotalFatura, adicionarTotalFatura: boolean) => void;
  atualizarFaturasSelecionadas: (totalFaturas: ITotalFatura[], selecionarTodasFaturas: boolean) => void;
  faturasSelecionadas: ITotalFatura[];
  valorTotalFaturasSelecionadas: number;
  todasFaturasSelecionadas: boolean;
}

const TotalFaturaContext = createContext<TotalFaturaContextData>(
  {} as TotalFaturaContextData
);

export function TotalFaturaProvider({ children }: TotalFaturaProviderProps) {

  const [faturasSelecionadas, setFaturasSelecionadas] = useState<ITotalFatura[]>([]);
  const [todasFaturasSelecionadas, setTodasFaturasSelecionadas] = useState(false);
  const [valorTotalFaturasSelecionadas, setValorTotalFaturasSelecionadas] = useState(0);

  useEffect(() => {
    atualizarFaturasSelecionadasComLocalStorage();
    atualizarTiposPagamentoComLocalStorage();
  }, []);


  const atualizarTiposPagamentoComLocalStorage = async () => {
    const tiposPagamentos = await buscarListaTiposPagamento();
    GravarDadosLocalStorage(tiposPagamentos, 'tiposPagamento');
  }

  const buscarListaTiposPagamento = async () => {

    const tiposPagamentoLocalStorage = RecuperarDadosLocalStorage<ITipoPagamento[]>('tiposPagamento');
    if (tiposPagamentoLocalStorage && tiposPagamentoLocalStorage.length > 0)
      return tiposPagamentoLocalStorage;

    const response = await api.get<ITipoPagamento[]>("/api/TipoPagamento");
    return response.data;
  }

  const atualizarFaturasSelecionadasComLocalStorage = () => {
    if (faturasSelecionadas.length === 0) {
      const faturasSelecionadasLocalStorage = localStorage.getItem('faturasSelecionadas');

      if (faturasSelecionadasLocalStorage) {
        const faturasSeleciondasConvertido: ITotalFatura[] = JSON.parse(faturasSelecionadasLocalStorage);
        setFaturasSelecionadas(faturasSeleciondasConvertido);
      }
    }
  };

  function atualizarFaturasSelecionadas(totalFatura: ITotalFatura[], selecionarTodasFaturas: boolean) {
    if (selecionarTodasFaturas) {
      setFaturasSelecionadas(totalFatura);
      setValorTotalFaturasSelecionadas(CalcularTotalFaturasSelecionadas(totalFatura));
      GravarDadosLocalStorage(totalFatura, 'faturasSelecionadas');
    }
    else {
      setFaturasSelecionadas([]);
      setValorTotalFaturasSelecionadas(CalcularTotalFaturasSelecionadas([]));
      RemoverDadosLocalStorage('faturasSelecionadas');
      RemoverDadosLocalStorage('totalFatura');
    }
    setTodasFaturasSelecionadas(selecionarTodasFaturas);
  }

  function atualizarFaturaAtivada(totalFatura: ITotalFatura, adicionarTotalFatura: boolean) {

    let array: ITotalFatura[];

    if (adicionarTotalFatura) {
      array = Object.values(faturasSelecionadas);

      const totalFaturaFiltrado = faturasSelecionadas.filter(fs => fs.id === totalFatura.id)[0];

      // se este TOTAL FATURA ainda NAO foi adicionado na lista, adiciona
      if (totalFaturaFiltrado === null || totalFaturaFiltrado === undefined) {
        array.push(totalFatura);
        setFaturasSelecionadas([...faturasSelecionadas, totalFatura]);
      }

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
    if (array !== null && array !== undefined && array.length > 0) {
      for (var idx = 0; idx <= array.length - 1; idx++) {
        valorTotal += array[idx].valor;
      }
    }
    return valorTotal;
  }

  return (
    <TotalFaturaContext.Provider
      value={{
        atualizarFaturaAtivada,
        atualizarFaturasSelecionadas,
        faturasSelecionadas,
        valorTotalFaturasSelecionadas,
        todasFaturasSelecionadas
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
