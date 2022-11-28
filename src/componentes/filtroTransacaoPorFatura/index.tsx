import { useEffect, useState } from "react";
import { useTransacoes } from "../../hooks/useTransacoes";
import { BuscarListaTiposPagamento, CalcularTotalFatura, FiltrarTransacoes } from '../../Servicos/utilidades';
import { Container, CardTipoPagamento } from './styles';

interface IFiltroTransacaoPorFaturaProps {
  totalFaturaID: string;
}
export function FiltroTransacaoPorFatura({ totalFaturaID }: IFiltroTransacaoPorFaturaProps) {

  const {
    transacoesTotalFatura,
    transacoesTotalFaturaSnapshot,
    atualizarTransacoesPorTotalFatura,
    atualizarTransacoesPorTotalFaturaSnapshot } = useTransacoes();

  const [tiposPagamento, setTiposPagamento] = useState<string[]>([]);

  useEffect(() => {
    // buscarTiposPagamentos();
    filtrarSomenteTiposPagamentoDaFatura();
  }, [])

  const buscarTiposPagamentos = async () => {
    const listaTiposPagamento = await BuscarListaTiposPagamento();

    const descricoes = listaTiposPagamento.map((tp) => {
      return tp.descricao;
    });

    descricoes.push('Todos');

    if (descricoes && descricoes.length > 1)
      setTiposPagamento(descricoes);
    else
      setTiposPagamento([]);
  }

  const filtrarSomenteTiposPagamentoDaFatura = () => {
    const totalFatura = transacoesTotalFaturaSnapshot.filter(tfs => tfs.id === totalFaturaID)[0];

    const descricoesTiposPagamento = totalFatura.transacoes.map(tr => {
      return tr.tipoPagamento.descricao;
    });

    const descricoesUnicas = descricoesTiposPagamento.filter((n, i) => descricoesTiposPagamento.indexOf(n) === i);

    if (descricoesUnicas && descricoesUnicas.length > 1) {
      descricoesUnicas.sort();
      descricoesUnicas.push('Todos');
      setTiposPagamento(descricoesUnicas);
    }
    else
      setTiposPagamento([]);
  };

  const handleFiltrarTipoPagamento = (descricao: string) => {
    const totalFatura = transacoesTotalFatura.filter(tfs => tfs.id === totalFaturaID)[0];

    if (descricao === "Todos")
      atualizarTransacoesPorTotalFaturaSnapshot(totalFatura.id);

    else {
      const transacoes = FiltrarTransacoes(descricao, totalFatura.transacoes);

      if (transacoes) {
        totalFatura.transacoes = Object.values(transacoes);
        totalFatura.quantidadeTransacoes = totalFatura.transacoes.length;
        totalFatura.valor = CalcularTotalFatura(totalFatura.transacoes);

        atualizarTransacoesPorTotalFatura(totalFatura);
      }
    }
  }

  return <Container>
    {tiposPagamento && (
      tiposPagamento?.map((descricao, index) => (

        <CardTipoPagamento key={index} onClick={() => handleFiltrarTipoPagamento(descricao)}>
          <span>
            {descricao}
          </span>
        </CardTipoPagamento>
      )))}
  </Container>
}