import styled from "styled-components";

interface Props {
  faturaAtual: boolean;
  faturaFechada: boolean;
}

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Grid = styled.div<Props>`
    display: flex;
    flex-direction: row;

    //width: 60rem;
    height: 5rem;

    border-radius: 0.4rem;
    
    padding: 1rem;
    background: var(--shape);

    div {
        margin: 0.2rem;
        border-spacing: 0 0.1rem;
        width: 7rem;
        font-size: 0.8rem;
        padding: 0.5rem;
        color: var(--text-body);
    }

    .info {
      cursor: pointer;
    }

    .valor {
      font-size: 1rem;
    }
    
    .inserir {
      width: 2rem;
      text-align: end;
      cursor: pointer;
    }

    .editar {
      width: 2rem;
      text-align: end;
      cursor: pointer;
    }
    .excluir {
      width: 1rem;
      text-align: end;
      cursor: pointer;
    }

    &:hover {    
      background: ${(props) => props.faturaAtual ? "#Beffdc" : props.faturaFechada ? "#ffb5a8" : "#EEEEEE"};
      filter: brightness(0.8);
      transition: 1s;
    }
`;

export const Info = styled.div`
    display: flex;

    font-size: 0.7rem;
    border-radius: 0.4rem;    
    padding: 0.4rem;
    background: var(--shape);
    visibility: hidden;
    position: absolute;    
    margin-left: 37.5%;
    color: var(--text-body);    
    border: 2px solid #969CB3;
    max-width: 14rem;

    transition: visibility 0s, opacity 0.5s linear;

    span {
      margin-left: 1rem;
      align-content: flex-end;
      color: black;
    }
`;