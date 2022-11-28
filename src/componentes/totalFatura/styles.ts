import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  border-radius: 0.4rem; 

  background: var(--fundoCard);
`;

export const Cabecalho = styled.div`
  display: flex;
  
  height: 4rem;
  width: 100%;

  justify-content: space-between;
  align-items: center;  

  padding: 0.8rem;
  border-bottom: 3px solid var(--text-body);

  .enviarTodasFaturas {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    max-height: 100%;

    gap: 1rem;

    p {
      height: 80%;
    }

    span {
      height: 20%;
      font-size: 0.7rem;
    }
  }

  .totalFaturasSelecionadas {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    max-height: 100%;

    gap: 1rem;

    p {
      font-size: 1.2rem;
      font-weight: bold;
      height: 80%;
    }

    span {
      
      height: 20%;
      font-size: 0.7rem;
    }
  }
`;

export const Faturas = styled.div`
 
  display: flex;
  flex-wrap: wrap;
  
  justify-content: center;
  align-items: center;
`;

export const Rodape = styled.div`
  display: flex;
  height: 3rem;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  width: 100%;

  button {   
    
    width: 100%;
    height: 100%;
    border: none;
    background: var(--green-light);
    font-size:1rem;
    font-weight: 400;
    
    transition: background-color 0.2s;

    &:hover {
      filter: brightness(0.8);
      border: 2px solid #04d361;
    }}
`;