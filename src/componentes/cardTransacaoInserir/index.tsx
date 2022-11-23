import { Container, Grid, CssTextField } from './styles';
import { FiX } from 'react-icons/fi';
//import { useTransacoes } from "../../hooks/useTransacoes";

import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import { ITipoPagamento, ITotalFatura } from '../../tipos';
import { useTransacoes } from '../../hooks/useTransacoes';
import { FormEvent, useEffect, useState } from 'react';
import { RecuperarDadosLocalStorage } from '../../Servicos/utilidades';
registerLocale('pt', pt);

interface CardTransacaoInserirProps {
  totalFatura: ITotalFatura;
}

export function CardTransacaoInserir({ totalFatura }: CardTransacaoInserirProps) {

  const { cancelarInserir } = useTransacoes();

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

  useEffect(() => {
    let arrayTiposPagamento: string[] = [];
    const tiposPagamento = RecuperarDadosLocalStorage<ITipoPagamento[]>('tiposPagamento');
    tiposPagamento.map((tipoPagamento) => {
      arrayTiposPagamento.push(tipoPagamento.descricao);
    })

    setListaTiposPagamento(arrayTiposPagamento);
  }, [])

  const handleGravarTransacao = (event: FormEvent) => {
    event.preventDefault();


  }
  const handleCancelarInserir = () => {
    cancelarInserir(totalFatura);
  }

  const handleTipoPagamentoSelecionado = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipoPagamentoId(event.target.value);
  };

  return (
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
              <button type="submit">Gravar Transação</button>
              <button type="button" onClick={handleCancelarInserir}>Cancelar</button>
            </div>
          </div>
          {/*<FiX size={18} onClick={handleCancelarInserir} />*/}
        </form>
      </Grid>
    </Container>)

}