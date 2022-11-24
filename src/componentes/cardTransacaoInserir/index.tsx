import { Container, Grid, CssTextField } from './styles';

import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import { IFatura, ITipoPagamento, ITotalFatura, ITransacao } from '../../tipos';
import { useTransacoes } from '../../hooks/useTransacoes';
import { FormEvent, useEffect, useState } from 'react';
import { RecuperarDadosLocalStorage } from '../../Servicos/utilidades';
import { Loading } from "../loading";

registerLocale('pt', pt);

interface CardTransacaoInserirProps {
  totalFatura: ITotalFatura;
}

export function CardTransacaoInserir({ totalFatura }: CardTransacaoInserirProps) {

  const { gravarTransacao, cancelarInserir } = useTransacoes();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(new Date());
  const [produto, setProduto] = useState("");
  const [loja, setLoja] = useState("");
  const [local, setLocal] = useState("");
  const [numeroParcela, setNumeroParcela] = useState<number>();
  const [quantidadeParcelas, setQuantidadeParcelas] = useState<number>();
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [tipoPagamentoId, setTipoPagamentoId] = useState<string>("");

  const [listaTiposPagamento, setListaTiposPagamento] = useState<string[]>([]);
  const [tiposPagamento, setTiposPagamento] = useState<ITipoPagamento[]>([]);


  useEffect(() => {
    let arrayTiposPagamento: string[] = [];
    const listaTP = RecuperarDadosLocalStorage<ITipoPagamento[]>('tiposPagamento');
    listaTP.map((tipoPagamento: ITipoPagamento) => {
      arrayTiposPagamento.push(tipoPagamento.descricao);
    });

    setTipoPagamentoId(listaTP[1].descricao);

    setTiposPagamento(listaTP);
    setListaTiposPagamento(arrayTiposPagamento);

  }, [])

  const handleGravarTransacao = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const transacao = CriarTransacao();
      gravarTransacao(transacao, totalFatura);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  }

  function CriarTransacao() {

    const dataAtual = new Date();

    const transacao: ITransacao = {
      id: "",
      data: new Date(data),
      dataTexto: new Date(data).toString(),
      produto,
      loja,
      local,
      numeroParcela: (numeroParcela !== undefined) ? numeroParcela : 1,
      quantidadeParcelas: (quantidadeParcelas !== undefined) ? quantidadeParcelas : 1,
      valor: Number.parseFloat(valor).toFixed(2),
      observacao,
      faturaId: totalFatura.id,
      tipoPagamentoId: recuperarTipoPagamentoID(tipoPagamentoId),
      editando: false,
      estaSelecionado: false,
      fatura: criarFaturaVazio(),
      tipoPagamento: criarTipoPagamentoVazio(),
      usuarioId: "",
      dataCriacao: dataAtual,
      dataModificacao: dataAtual,
      usuarioCriacao: "",
      usuarioModificacao: ""
    }

    return transacao;
  }

  function recuperarTipoPagamentoID(descricao: string) {
    return tiposPagamento.filter(tp => tp.descricao === descricao)[0].id;
  }

  function criarFaturaVazio() {
    const dataAtual = new Date();
    const fatura: IFatura = {
      id: "",
      mes: "",
      ano: "",
      atual: false,
      dataFinal: new Date(),
      dataInicio: new Date(),
      fechada: false,
      observacao: "",
      ordem: 0,
      dataCriacao: dataAtual,
      dataModificacao: dataAtual,
      usuarioCriacao: "",
      usuarioModificacao: ""
    }
    return fatura;
  }

  function criarTipoPagamentoVazio() {
    const tipoPagamento: ITipoPagamento = {
      id: "",
      descricao: tipoPagamentoId,
      codigo: "",
      observacao: ""
    };
    return tipoPagamento;
  }

  const handleCancelarInserir = () => {
    cancelarInserir(totalFatura);
  }

  const handleTipoPagamentoSelecionado = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipoPagamentoId(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Loading descricao={"Aguarde. Gravando Transação..."} />
      ) : (
        <>
          <Container>
            <Grid>
              <form onSubmit={handleGravarTransacao}>
                <div className='corpoFormulario'>
                  <div className='campos'>
                    <div className='dataPicker'>
                      <DatePicker
                        placeholderText="Data"
                        locale="pt"
                        selected={new Date(data)}
                        onChange={(date: Date) => setData(new Date(date))}
                        dateFormat="dd/MM/yyyy">
                      </DatePicker>
                    </div>

                    <input
                      placeholder="Produto"
                      value={produto}
                      onChange={(event) => setProduto(event.target.value)}
                    ></input>

                    <input
                      placeholder="Loja"
                      value={loja}
                      onChange={(event) => setLoja(event.target.value)}
                    ></input>

                    <input
                      placeholder="Local"
                      value={local}
                      onChange={(event) => setLocal(event.target.value)}
                    ></input>

                    <input
                      placeholder="N. Parcela"
                      type='text'
                      value={numeroParcela}
                      onChange={(event) => setNumeroParcela(Number(event.target.value))}
                    ></input>

                    <input
                      placeholder="Qnt. Parcela"
                      type="text"
                      value={quantidadeParcelas}
                      onChange={(event) => setQuantidadeParcelas(Number(event.target.value))}
                    ></input>

                    <input
                      placeholder="Valor"
                      value={valor}
                      onChange={(event) => setValor(event.target.value)}
                    ></input>

                    <input
                      placeholder="Observação"
                      value={observacao}
                      onChange={(event) => setObservacao(event.target.value)}
                    ></input>

                    <div className='tiposPagamento'>
                      <CssTextField

                        id="outlined-select-currency-native"
                        select
                        label="Tipo de Pagamento"
                        value={tipoPagamentoId}
                        onChange={handleTipoPagamentoSelecionado}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {listaTiposPagamento.map((tipoPagamento) => (
                          <option key={tipoPagamento} value={tipoPagamento}>
                            {tipoPagamento}
                          </option>
                        ))}
                      </CssTextField>
                    </div>
                  </div>
                  <div className="botoes">
                    <button type="button" onClick={handleCancelarInserir}>Cancelar</button>
                    <button type="submit">Gravar Transação</button>
                  </div>
                </div>
                {/*<FiX size={18} onClick={handleCancelarInserir} />*/}
              </form>
            </Grid>
          </Container>
        </>
      )}
    </>)

}