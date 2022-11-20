export type ITransacao = {
  id: string;
  data: Date;
  dataTexto: string;
  produto: string;
  loja: string;
  local: string;
  numeroParcela: number;
  quantidadeParcelas: number;
  fatura: {
    ano: string;
    observacao: string;
    ordem: number;
    fechada: boolean;
    atual: boolean;
    dataInicio: Date;
    dataFinal: Date;
  };
  tipoPagamento: {
    id: string;
    descricao: string;
  };
  valor: string;
  observacao: string;
  faturaId: string
  tipoPagamentoId: string;
  usuarioId: string;
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
  estaSelecionado: boolean;
  editando: boolean;
}

export type ITotalFatura = {
  id: string;
  descricao: string;
  dataInicio: Date;
  dataFinal: Date;
  atual: boolean;
  fechada: boolean;
  valor: number;
  quantidadeTransacoes: number;
  transacoesVisiveis: boolean;
  ordem: number;
  transacoes: ITransacao[];
}