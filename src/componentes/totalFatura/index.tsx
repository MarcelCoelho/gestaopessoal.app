import { Checkbox } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTotalFatura } from "../../hooks/useTotalFatura";

import { api } from "../../Servicos/api";
import { ITotalFatura } from "../../tipos";

import { CardFatura } from '../cardFatura';
import { Loading } from "../loading";
import { Container, Cabecalho, Faturas, Rodape } from "./styles";

export function TotalFatura() {

  const [totalPorFatura, setTotalPorFatura] = useState<ITotalFatura[]>([]);
  const [enviarTodasFaturas, setEnviarTodasFaturas] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const { atualizarFaturasSelecionadas,
    faturasSelecionadas,
    valorTotalFaturasSelecionadas } = useTotalFatura();

  const Navigate = useNavigate();
  useEffect(() => {
    recuperarTotaisFaturas();
  }, [])

  const recuperarTotaisFaturas = async () => {
    try {
      setCarregando(true);
      const response = await api.get<ITotalFatura[]>("/api/transacao/totalPorFatura");
      setTotalPorFatura(response.data);
      setCarregando(false);
    } catch (err) {
      console.log(err);
      setCarregando(false);
    }
  };

  function handleNavegarParaTransacoes() {
    if (faturasSelecionadas.length > 0)
      Navigate("/transacoes");
  }

  function hanldeEnviarTodasFaturas() {
    setEnviarTodasFaturas(!enviarTodasFaturas);
    atualizarFaturasSelecionadas(totalPorFatura, !enviarTodasFaturas);
  }

  return (
    <>
      <Container>
        {carregando ? (
          <Loading descricao={"Aguarde. Carregando Faturas..."} />
        ) : (
          <>
            <Cabecalho>
              <div>Titulo</div>
              <div className="enviarTodasFaturas">
                <>
                  <p><Checkbox style={{ padding: 0 }}
                    value={enviarTodasFaturas}
                    checked={enviarTodasFaturas}
                    onClick={hanldeEnviarTodasFaturas} />
                  </p>
                  <span>Enviar Todas Faturas</span>
                </>
              </div>
              <div className="totalFaturasSelecionadas">
                <p>
                  {new Intl.NumberFormat("pt-Br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(valorTotalFaturasSelecionadas))}
                </p>
                <span>Total Faturas Selecionadas</span>

              </div>

            </Cabecalho>
            <Faturas>
              {totalPorFatura && (
                totalPorFatura?.map((totalFatura) => (
                  <CardFatura key={totalFatura.id} totalFatura={totalFatura} />
                ))
              )}
            </Faturas>
            <Rodape>
              <button type="submit" onClick={handleNavegarParaTransacoes}>Ver Transacoes</button>
            </Rodape>
          </>
        )}
      </Container>
    </>
  );
}