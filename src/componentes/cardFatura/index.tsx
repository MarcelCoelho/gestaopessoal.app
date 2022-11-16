import { Container } from './styles';

import { ITotalFatura } from '../../tipos';
import { useState } from 'react';
import { useTotalFatura } from '../../hooks/useTotalFatura';

interface TotalFatura {
  totalFatura: ITotalFatura;
}

export function CardFatura({ totalFatura }: TotalFatura) {

  const { atualizarFaturaAtivada, todasFaturasSelecionadas } = useTotalFatura();
  const [ativo, setAtivo] = useState(false);

  function handleSelecionarFatura(totalFatura: ITotalFatura) {
    setAtivo(!ativo);
    atualizarFaturaAtivada(totalFatura, !ativo);
  }

  return (
    <Container
      ativo={todasFaturasSelecionadas || ativo}
      atual={totalFatura.atual}
      fechada={totalFatura.fechada}
      onClick={() => { handleSelecionarFatura(totalFatura) }}>
      <h3>{totalFatura.descricao}</h3>
      <p>{new Intl.NumberFormat("pt-Br", {
        style: "currency",
        currency: "BRL",
      }).format(Number(totalFatura.valor))}</p>
      <span>{totalFatura.quantidadeTransacoes}</span>
    </Container>
  )
}