import styled from "styled-components";

interface containerProps {
  faturaAtual: boolean;
  faturaFechada: boolean;
}

export const Container = styled.div<containerProps>`
  display: grid;

  

  border-radius: 0.2rem;
  
  max-width: 70rem;

  //background: #f0f2f5;
  background: #d5dbe6;
  border-left: 0.5rem solid;
  
  height: auto;
  align-content: flex-start;
  //background: yellow;
  margin-top: 1rem;
  
  border-color: ${(containerProps) => containerProps.faturaAtual ? "var(--green-light)" : (containerProps.faturaFechada ? "var(--red-tomato)" : "var(--cinza)")};

`;

export const Cabecalho = styled.div`
  
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  padding: 1rem;

  p{
    justify-content: center;
    align-items: center;   
  }
          
  .expandirTransacoes{
    cursor: pointer;
    
    margin-top: -0.5rem;
    height: 1.5rem;
    //background-color: #e1e3e7;
  }

  .dataFatura {
    margin-top: -0.5rem;
    display: flex;
    flex-direction: column;    
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;

    span {
      margin: 0.5rem;
      font-size: 0.7rem;
      font-weight: normal;
    }
  }

  .contadorTransacoes {
    margin-top: -0.5rem;
    display: flex;
    flex-direction: column;    
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;
    span {
      margin: 0.5rem;
      font-size: 0.7rem;
      font-weight: normal;
    }
  }

  .valorFatura {
    margin-top: -0.5rem;
    display: flex;
    flex-direction: column;    
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;
    span {
      margin: 0.5rem;
      font-size: 0.7rem;
      font-weight: normal;
    }
  }

  
`;

export const Divisoria = styled.div`
  border: 0.1px solid var(--cinza);
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 95%;
`;

export const Conteudo = styled.div`
  padding: 1.5rem;
`;