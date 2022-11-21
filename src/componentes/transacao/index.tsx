import { useEffect } from "react";
import { useState } from "react";
import { useTotalFatura } from "../../hooks/useTotalFatura";
import { ITotalFatura, } from "../../tipos";
import { CardTransacao } from "../cardTransacao";
import { Container, ConteudoTransacao, Cabecalho, Conteudo } from "./styles";
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { Loading } from "../loading";
import { Pesquisar } from "../pesquisar";
import { Ordenar, GravarDadosLocalStorage } from "../../Servicos/utilidades";
import { CardTransacaoEditar } from "../cardTransacaoEditar";
import { useTransacoes } from "../../hooks/useTransacoes";

interface IVisibilidadeTotalFatura {
  faturaID: string;
  visible: boolean;
}

export function Transacao() {

  const {
    buscarTransacoesTotalFatura,
    atualizarTransacoesTotalFatura,
    transacoesTotalFatura,
    loading
  } = useTransacoes();

  const [visibilidadeTotalFatura, setVisibilidadeTotalFatura] = useState<IVisibilidadeTotalFatura[]>([]);
  const [totalFatura, setTotalFatura] = useState<ITotalFatura[]>([]);

  useEffect(() => {

    const totalFaturaLocalStorage = localStorage.getItem('totalFatura');

    if (totalFaturaLocalStorage) {
      const total: ITotalFatura[] = JSON.parse(totalFaturaLocalStorage);
      setTotalFatura(total);
    }

    buscarTransacoes();

  }, [])

  useEffect(() => {

    if (transacoesTotalFatura)
      setTotalFatura(transacoesTotalFatura);

  }, [transacoesTotalFatura])

  const buscarTransacoes = async () => {
    const transacoesTotalFatura = await buscarTransacoesTotalFatura();
    if (transacoesTotalFatura)
      setTotalFatura(transacoesTotalFatura);
  }

  function handleAlterarEstadoVisibilidadeTransacoes(id: string) {
    atualizarMostrarTransacoes(id);

    let itemID = visibilidadeTotalFatura?.filter(vtf => vtf.faturaID === id)[0];
    if (itemID === null || itemID === undefined) {
      const novoItemID: IVisibilidadeTotalFatura[] = [{
        "faturaID": id,
        "visible": true
      }];

      if (visibilidadeTotalFatura?.length > 0)
        setVisibilidadeTotalFatura([...visibilidadeTotalFatura, novoItemID[0]])
      else
        setVisibilidadeTotalFatura(novoItemID);

      atualizarEstiloComponente(novoItemID[0].visible, id);
    }
    else {

      const novoItemID: IVisibilidadeTotalFatura = {
        "faturaID": id,
        "visible": !itemID.visible
      }

      const arrayClonado = Object.values(visibilidadeTotalFatura);
      const indiceObjeto = arrayClonado.indexOf(itemID);
      if (indiceObjeto > -1)
        arrayClonado.splice(indiceObjeto, 1);

      arrayClonado.push(novoItemID);

      setVisibilidadeTotalFatura(arrayClonado);
      atualizarEstiloComponente(novoItemID.visible, id);
    }
  }

  function atualizarEstiloComponente(visible: boolean, id: string) {
    let divContainer: HTMLElement | null;
    let divConteudo: HTMLElement | null;

    if (visible) {
      divContainer = document.getElementById('container_' + id);
      divContainer?.setAttribute("style", "height: auto");

      divConteudo = document.getElementById('conteudo_' + id);
      divConteudo?.setAttribute("style", "visibility: visible");

    }
    else {
      divContainer = document.getElementById('container_' + id);
      divContainer?.setAttribute("style", "height: 4rem");

      divConteudo = document.getElementById('conteudo_' + id);
      divConteudo?.setAttribute("style", "visibility: hidden");

    }
  }

  function atualizarMostrarTransacoes(id: string) {

    let array = Object.values(totalFatura);

    let itemID = array.filter(vtf => vtf.id === id)[0];
    let itemIDClonado: ITotalFatura = JSON.parse(JSON.stringify(itemID));

    itemIDClonado.transacoesVisiveis = !itemID.transacoesVisiveis;

    const indiceObjeto = array.indexOf(itemID);
    if (indiceObjeto > -1)
      array.splice(indiceObjeto, 1);

    array.push(itemIDClonado);
    array.sort(Ordenar);
    atualizarTransacoesTotalFatura(array);
    setTotalFatura(array);
    GravarDadosLocalStorage(array, 'totalFatura');
  }

  return (
    <>
      {loading ? (
        <Loading descricao={"Aguarde. Carregando Transacações..."} />
      ) : (
        <>
          <Container>
            {totalFatura && (
              totalFatura.map((totalFatura, index) => (

                <ConteudoTransacao
                  key={index}
                  id={"container_" + totalFatura.id}
                  faturaAtual={totalFatura.atual}
                  faturaFechada={totalFatura.fechada}
                  style={{ height: "4.5rem" }}>
                  <Cabecalho id={totalFatura.id} >
                    <>
                      <div className="expandirTransacoes" onClick={() => { handleAlterarEstadoVisibilidadeTransacoes(totalFatura.id) }}>
                        {totalFatura.transacoesVisiveis ? (
                          <FiChevronDown size={16} />
                        ) : (<FiChevronRight size={16} />)}
                      </div>

                      <div className="dataFatura">
                        <p>
                          {totalFatura.descricao}</p>
                        <span>
                          {new Intl.DateTimeFormat().format(
                            new Date(totalFatura.dataInicio)
                          )} - {new Intl.DateTimeFormat().format(
                            new Date(totalFatura.dataFinal)
                          )}
                        </span>
                      </div>
                      <div className="contadorTransacoes">
                        <p>
                          {totalFatura.quantidadeTransacoes}
                        </p>
                        <span>
                          transações
                        </span>
                      </div>
                      <div className="valorFatura">
                        <p>
                          {new Intl.NumberFormat("pt-Br", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(totalFatura.valor))
                          }</p>
                        <span>{"Total Fatura"}</span>
                      </div>

                      {totalFatura.transacoesVisiveis && (
                        <Pesquisar totalFatura={totalFatura} />
                      )}
                    </>
                  </Cabecalho>

                  <Conteudo id={"conteudo_" + totalFatura.id} key={totalFatura.id} style={{ visibility: "hidden" }}>

                    {totalFatura.transacoes && (
                      totalFatura.transacoes?.map((transacao, index) => (

                        <div key={index}>
                          {transacao.editando ? (
                            <CardTransacaoEditar

                              transacao={transacao}
                            />
                          ) : <CardTransacao

                            transacao={transacao}
                            faturaAtual={totalFatura.atual}
                            faturaFechada={totalFatura.fechada}
                          />
                          }
                        </div>

                      ))
                    )}

                  </Conteudo>
                </ConteudoTransacao>
              )))}

            {/* <NovaTransacao>
              <TotalFaturaNaoSelecionada />
                      </NovaTransacao>*/}
          </Container>
        </>
      )}
    </>
  )
}