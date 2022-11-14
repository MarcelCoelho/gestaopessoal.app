import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTotalFatura } from "../../hooks/useTotalFatura";

import { api } from "../../Servicos/api";
import { ITotalFatura } from "../../tipos";

import { CardFatura } from '../cardFatura';
import { Loading } from "../loading";
import { Container, Faturas, Botao } from "./styles";

export function TotalFatura() {

  const [totalPorFatura, setTotalPorFatura] = useState<ITotalFatura[]>();
  const [carregando, setCarregando] = useState(false);

  const { faturasSelecionadas } = useTotalFatura();

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

  return (
    <>
      <Container>
        {carregando ? (
          <Loading descricao={"Aguarde. Carregando Faturas..."} />
        ) : (
          <>
            <Faturas>
              {totalPorFatura && (
                totalPorFatura?.map((totalFatura) => (
                  <CardFatura key={totalFatura.id} totalFatura={totalFatura} />
                ))
              )}
            </Faturas>
            <Botao>
              <button type="submit" onClick={handleNavegarParaTransacoes}>Ver Transacoes</button>
            </Botao>
          </>
        )}
      </Container>
    </>
  );
}