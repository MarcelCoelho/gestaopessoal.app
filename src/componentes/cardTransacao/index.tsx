import { ITransacao } from "../../tipos";
import { Container, Grid, Info } from "./styles";
import { FiInfo, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useTransacoes } from "../../hooks/useTransacoes";

interface CardTransacaoProps {
  transacao: ITransacao;
  faturaAtual: boolean;
  faturaFechada: boolean;
}

export function CardTransacao({ transacao, faturaAtual, faturaFechada }: CardTransacaoProps) {


  const { excluirTransacao, modoEdicao } = useTransacoes();

  async function handleExibirInfo(id: string) {
    const divInfo = document.getElementById(id);
    divInfo?.setAttribute("style", "visibility: visible");

    await new Promise(sl => setTimeout(sl, 5000));
    divInfo?.setAttribute("style", "visibility: hidden");
  }

  function handleFecharInfo(id: string) {
    const divInfo = document.getElementById(id);
    divInfo?.setAttribute("style", "visibility: hidden");
  }

  function handleEditar(id: string) {
    modoEdicao(transacao);
  }

  function handleExcluir(idFatura: string, idTransacao: string) {
    excluirTransacao(idFatura, idTransacao);
  }

  return (
    <Container >
      <Grid faturaAtual={faturaAtual} faturaFechada={faturaFechada}>
        <div>{new Intl.DateTimeFormat().format(
          new Date(transacao.data)
        )}</div>

        <div>{transacao.produto}</div>
        <div>{transacao.loja}</div>
        <div>{transacao.local}</div>
        <div>{(transacao.numeroParcela !== 0 && (transacao.numeroParcela + "/" + transacao.quantidadeParcelas))}</div>
        <div>{transacao.tipoPagamento.descricao}</div>

        {transacao.observacao ? (
          <div className="info" onClick={() => handleExibirInfo(transacao.id)}><FiInfo size={16} /></div>
        ) : (<div></div>)}
        <div className="valor">{new Intl.NumberFormat("pt-Br", {
          style: "currency",
          currency: "BRL",
        }).format(Number(transacao.valor))}</div>

        <div className="editar" onClick={() => handleEditar(transacao.id)}>
          <FiEdit2 size="16" />
        </div>
        <div className="excluir" onClick={() => handleExcluir(transacao.faturaId, transacao.id)}>
          <FiTrash2 size="18" />
        </div>
      </Grid>
      <Info id={transacao.id} >
        {transacao.observacao}
        <span style={{ "cursor": "pointer" }} onClick={() => handleFecharInfo(transacao.id)}>x</span>
      </Info>
    </Container>)
}