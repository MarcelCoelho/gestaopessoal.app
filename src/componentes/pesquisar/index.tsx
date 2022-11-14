import { useState } from "react";
import { useTotalFatura } from "../../hooks/useTotalFatura";
import { ITotalFatura, ITransacao } from "../../tipos"
import { Container } from "./styles";

interface PesquisarProps {
  totalFatura: ITotalFatura;
}

export function Pesquisar({ totalFatura }: PesquisarProps) {

  const { atualizarTransacoesPorTotalFatura, atualizarTransacoesPorTotalFaturaSnapshot } = useTotalFatura();
  const [parametrosPesquisa, setParametrosPesquisa] = useState("");

  function handleKeypress(e) {
    if (e.key === 'Enter') {
      handlePesquisar();
    }
  }

  function handlePesquisar() {

    if (parametrosPesquisa.trim() !== "") {

      let arrayItems: ITransacao[] = [];
      let itemEncontrado = false;

      totalFatura.transacoes.forEach((item) => {
        if (indexOf(item.produto))
          itemEncontrado = true;

        if (indexOf(item.loja))
          itemEncontrado = true;

        if (indexOf(item.local))
          itemEncontrado = true;

        if (indexOf(item.observacao))
          itemEncontrado = true;

        if (indexOf(item.tipoPagamento.descricao))
          itemEncontrado = true;

        if (Number(item.valor) === Number(parametrosPesquisa))
          itemEncontrado = true;

        if (new Date(item.data).getDate() === new Date(parametrosPesquisa).getDate())
          itemEncontrado = true;

        if (itemEncontrado)
          arrayItems.push(item);

        itemEncontrado = false;

        setParametrosPesquisa("");
      });

      totalFatura.transacoes = Object.values(arrayItems);
      totalFatura.quantidadeTransacoes = totalFatura.transacoes.length;
      totalFatura.valor = CalcularTotalFatura(totalFatura.transacoes);

      if (arrayItems.length > 0) {
        atualizarTransacoesPorTotalFatura(totalFatura);
      }
    }
    else
      atualizarTransacoesPorTotalFaturaSnapshot(totalFatura?.id);

    const input = document.querySelector("input");

    if (input !== null) {
      input.addEventListener("click", function () {
        this.select();
      })
    }
  }

  function CalcularTotalFatura(transacoes: ITransacao[]) {
    if (transacoes != null && transacoes != undefined && transacoes.length > 0) {
      let valorTotal = 0;
      for (var idx = 0; idx <= transacoes.length - 1; idx++) {
        valorTotal += Number(transacoes[idx].valor);
      }
      return valorTotal;
    }

    return 0;
  }

  function indexOf(valor: string) {
    return (valor.toLocaleLowerCase().indexOf(parametrosPesquisa.toLocaleLowerCase()) > -1);
  }

  return (
    <Container>
      <input
        placeholder="Pesquisar..."
        value={parametrosPesquisa}
        onChange={(event) => setParametrosPesquisa(event.target.value)}
        onKeyPress={handleKeypress}
      />
      <button type="submit" onClick={handlePesquisar}>IR</button>
    </Container>
  )
}