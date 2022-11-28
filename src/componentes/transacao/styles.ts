import styled from "styled-components";

interface containerProps {
  faturaAtual: boolean;
  faturaFechada: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90rem;
  height: 40rem;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0.7rem;
    height: 0.7rem;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--shape);
    margin-top: 0.8rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--fundoCard);
    /* color of the scroll thumb */
    border: 0.1rem solid var(--text-body);
    /* creates padding around scroll thumb */
  }
`;


export const ConteudoTransacao = styled.div<containerProps>`
  display: grid;  

  border-radius: 0.2rem;
  
  max-width: 70rem;

  //background: #f0f2f5;
  background: #d5dbe6;
  border-left: 0.5rem solid;
  
  
  align-content: flex-start;
  //background: yellow;
  margin-top: 1rem;
  
  border-color: ${(containerProps) => containerProps.faturaAtual ? "var(--green-light)" : (containerProps.faturaFechada ? "var(--red-tomato)" : "var(--cinza)")};

`;

export const Cabecalho = styled.div`
  
  display: flex;
  flex-direction: column;

  .titulo {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    padding: 1rem;

    p {
      justify-content: center;
      align-items: center;   
    }
          
    .expandirTransacoes {
      cursor: pointer;
    
      margin-top: -0.5rem;
      height: 1.5rem;
      //background-color: #e1e3e7;
    }

    .modoInserir{
        margin-top: -0.5rem;
        display: flex;
        flex-direction: column;    
        align-items: center;
        font-size: 1.4rem;
        font-weight: bold;
        padding: 0;

        cursor: pointer;

        transition: background-color 0.2s;

        &:hover {
          background: var(--fundoCard);
          filter: brightness(0.9);      
        }

        span {
          margin: 0.5rem;
          font-size: 0.7rem;
          font-weight: normal;
        }
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
    }

    .filtro {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding-left: 2rem;
      padding-right: 2rem;      
      width: 100%;
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

export const NovaTransacao = styled.div`
  background-color: var(--fundoCard);
  height: auto;
  margin: 1rem;
  border-radius: 1rem;
`;