import { useEffect } from "react";
import { useState } from "react";
import { useTotalFatura } from "../../hooks/useTotalFatura";
import { ITotalFatura, } from "../../tipos";
import { CardTransacao } from "../cardTransacao";
import { Container, Cabecalho, Divisoria, Conteudo } from "./styles";
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { Loading } from "../loading";
import { Pesquisar } from "../pesquisar";

interface IVisibilidadeTotalFatura {
  faturaID: string;
  visible: boolean;
}

export function Transacao() {

  const {
    atualizarTotalFatura,
    transacoesPorTotalFatura,
    loading } = useTotalFatura();

  const [visibilidadeTotalFatura, setVisibilidadeTotalFatura] = useState<IVisibilidadeTotalFatura[]>([]);


  useEffect(() => {

  }, [])

  function handleAlterarEstadoVisibilidadeTransacoes(id: string) {
    atualizarMostrarTransacoes(id);

    let itemID = visibilidadeTotalFatura?.filter(vtf => vtf.faturaID === id)[0];
    if (itemID == null || itemID == undefined) {
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
    if (visible) {
      var divContainer = document.getElementById('container_' + id);
      divContainer.setAttribute("style", "height: auto");

      var divConteudo = document.getElementById('conteudo_' + id);
      divConteudo.setAttribute("style", "visibility: visible");

    }
    else {
      var divContainer = document.getElementById('container_' + id);
      divContainer.setAttribute("style", "height: 4rem");

      var divConteudo = document.getElementById('conteudo_' + id);
      divConteudo.setAttribute("style", "visibility: hidden");

    }
  }

  function atualizarMostrarTransacoes(id: string) {

    let array = Object.values(transacoesPorTotalFatura);

    let itemID = array.filter(vtf => vtf.id === id)[0];
    let itemIDClonado: ITotalFatura = JSON.parse(JSON.stringify(itemID));

    itemIDClonado.transacoesVisiveis = !itemID.transacoesVisiveis;

    const indiceObjeto = array.indexOf(itemID);
    if (indiceObjeto > -1)
      array.splice(indiceObjeto, 1);

    array.push(itemIDClonado);
    array.sort(compare);
    atualizarTotalFatura(array);
    //setTotalFaturas(array);

  }

  function compare(array1, array2) {
    if (array1.ordem < array2.ordem) {
      return -1;
    }
    if (array1.ordem > array2.ordem) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      {loading ? (
        <Loading descricao={"Aguarde. Carregando Transaca????es..."} />
      ) : (
        <>
          {transacoesPorTotalFatura && (
            transacoesPorTotalFatura.map(totalFatura => (
              <Container
                key={totalFatura.id}
                id={"container_" + totalFatura.id}
                faturaAtual={totalFatura.atual}
                faturaFechada={totalFatura.fechada}
                style={{ height: "4.5rem" }}>
                <Cabecalho id={totalFatura.id} >
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
                      transa????es
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
                </Cabecalho>

                <Conteudo id={"conteudo_" + totalFatura.id} style={{ visibility: "hidden" }}>
                  {totalFatura.transacoes && (
                    totalFatura.transacoes?.map((transacao) => (
                      <CardTransacao
                        key={transacao.id}
                        transacao={transacao}
                        faturaAtual={totalFatura.atual}
                        faturaFechada={totalFatura.fechada}
                      />
                    ))
                  )}
                </Conteudo>
              </Container>
            )))}
        </>
      )}
    </>
  )
}