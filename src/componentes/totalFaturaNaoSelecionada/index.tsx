import { useEffect, useState } from "react";
import { useTotalFatura } from "../../hooks/useTotalFatura";
import { api } from "../../Servicos/api";
import { ITotalFatura } from "../../tipos";
import { Container } from "./styles";

export function TotalFaturaNaoSelecionada() {

  const { faturasSelecionadas, atualizarFaturaAtivada, atualizarTransacoesPorTotalFatura } = useTotalFatura();

  const [totalFaturaNaoSelecionada, setTotalFaturaNaoSelecionada] = useState<ITotalFatura[]>();

  useEffect(() => {
    recuperarTotaisFaturasNaoSelecionadas();
  }, [faturasSelecionadas])

  const recuperarTotaisFaturasNaoSelecionadas = async () => {
    try {

      const ids = faturasSelecionadas.map(fs => fs.id);
      const response = await api.post<ITotalFatura[]>("/api/transacao/transacoesPorFaturasNaoSelecionadas", ids);
      setTotalFaturaNaoSelecionada(response.data);

    } catch (err) {
    }
  };

  function handleAdicionarTotalFatura(totalFatura: ITotalFatura) {
    atualizarTransacoesPorTotalFatura(totalFatura);
    atualizarFaturaAtivada(totalFatura, true);
  }

  return (
    <>
      <Container >
        {totalFaturaNaoSelecionada && (
          totalFaturaNaoSelecionada?.map((totalFatura) => (
            <div key={totalFatura.id} onClick={() => handleAdicionarTotalFatura(totalFatura)}>

              <p>
                {totalFatura.descricao}
              </p>
              <span>
                {new Intl.NumberFormat("pt-Br", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(totalFatura.valor))}
              </span>
            </div>
          )))}
      </Container>
    </>
  )
}