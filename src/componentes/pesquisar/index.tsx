import { KeyboardEvent, useState } from "react";
import { useTransacoes } from "../../hooks/useTransacoes";
import { CalcularTotalFatura } from "../../Servicos/utilidades";
import { ITotalFatura, ITransacao } from "../../tipos"
import { Container } from "./styles";

interface PesquisarProps {
  totalFatura: ITotalFatura;
}

export function Pesquisar({ totalFatura }: PesquisarProps) {

  const { atualizarTransacoesPorTotalFatura, atualizarTransacoesPorTotalFaturaSnapshot } = useTransacoes();
  const [parametrosPesquisa, setParametrosPesquisa] = useState("");

  function handleKeypress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handlePesquisar();
    }
  }

  function handlePesquisar() {

    if (parametrosPesquisa.trim() !== "") {

      const pesquisaDividida = parametrosPesquisa.split('|');

      const filtrarExcecoes = pesquisaDividida[0] === "!";
      const parametroBuscaAtualizado = filtrarExcecoes ? pesquisaDividida[1] : pesquisaDividida[0];

      let arrayItems: ITransacao[] = [];
      let itemEncontrado = false;

      totalFatura.transacoes.forEach((item) => {
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
          arrayItems.push(item);

        itemEncontrado = false;

        setParametrosPesquisa("");
      });

      // significa que deverá trazer tudo que é diferente do que foi encontrado
      if (arrayItems.length > 0 && filtrarExcecoes) {
        let novoArray: ITransacao[] = [];
        for (var idx = 0; idx <= totalFatura.transacoes.length - 1; idx++) {
          const transacaoID = totalFatura.transacoes[idx].id;

          const transacao = arrayItems.filter(ayt => ayt.id === transacaoID)[0];
          if (transacao === null || transacao === undefined) {
            novoArray.push(totalFatura.transacoes[idx]);
          }
        }
        arrayItems = novoArray;
      }

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

  function indexOf(valor: string, filtroBusca: string) {
    return (valor.toLocaleLowerCase().indexOf(filtroBusca.toLocaleLowerCase()) > -1);
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