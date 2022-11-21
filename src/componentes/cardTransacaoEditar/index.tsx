import { ITransacao } from "../../tipos";
import { Container, Grid } from "./styles";

import DatePicker from 'react-datepicker'
import { FormEvent, useState } from "react";
import { useTotalFatura } from "../../hooks/useTotalFatura";

import { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

registerLocale('pt', pt);

interface CardTransacaoEditarProps {
  transacao: ITransacao;
}

export function CardTransacaoEditar({ transacao }: CardTransacaoEditarProps) {

  const { atualizarTransacao } = useTotalFatura();

  const [data, setData] = useState(transacao.data);
  const [produto, setProduto] = useState(transacao.produto);
  const [loja, setLoja] = useState(transacao.loja);
  const [local, setLocal] = useState(transacao.local);
  const [numeroParcela, setNumeroParcela] = useState(transacao.numeroParcela);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState(transacao.quantidadeParcelas);
  const [observacao, setObservacao] = useState(transacao.observacao);
  const [valor, setValor] = useState(transacao.valor);

  async function handleAtualizarTransacao(event: FormEvent) {
    event.preventDefault();

    transacao.data = data;
    transacao.produto = produto;
    transacao.loja = loja;
    transacao.local = local;
    transacao.numeroParcela = numeroParcela;
    transacao.quantidadeParcelas = quantidadeParcelas;
    transacao.observacao = observacao;
    transacao.valor = valor;

    atualizarTransacao(transacao);
  }

  return (
    <Container >
      <Grid>
        <form onSubmit={handleAtualizarTransacao}>
          <table>
            <tbody>
              <tr>
                <td>
                  <DatePicker
                    className="datapicker"
                    placeholderText="Data"
                    locale="pt"
                    selected={new Date(data)}
                    onChange={(date: Date) => setData(new Date(date))}
                    dateFormat="dd/MM/yyyy">
                  </DatePicker>
                </td>
                <td>
                  <input
                    className="produto"
                    placeholder="Produto"
                    value={produto}
                    onChange={(event) => setProduto(event.target.value)}
                  ></input>
                </td>
                <td>
                  <input
                    className="loja"
                    placeholder="Loja"
                    value={loja}
                    onChange={(event) => setLoja(event.target.value)}
                  ></input>
                </td>
                <td>
                  <input
                    className="local"
                    placeholder="Local"
                    value={local}
                    onChange={(event) => setLocal(event.target.value)}
                  ></input>
                </td>
                <td>
                  <input
                    className="numeroParcela"
                    placeholder="NumeroParcela"
                    value={numeroParcela}
                    onChange={(event) => setNumeroParcela(Number(event.target.value))}
                  ></input>
                </td>
                <td>
                  <input
                    className="quantidadeParcelas"
                    placeholder="QuantidadeParcelas"
                    value={quantidadeParcelas}
                    onChange={(event) => setQuantidadeParcelas(Number(event.target.value))}
                  ></input>
                </td>
                <td>
                  <input
                    className="observacao"
                    placeholder="Observação"
                    value={observacao}
                    onChange={(event) => setObservacao(event.target.value)}
                  ></input>
                </td>
                <td>
                  <input
                    className="valor"
                    placeholder="Valor"
                    value={valor}
                    onChange={(event) => setValor(event.target.value)}
                  ></input>
                </td>
                <td>
                  <button type="submit">Gravar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Grid>

    </Container>
  )
}