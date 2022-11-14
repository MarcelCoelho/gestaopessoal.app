import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Faturas = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Botao = styled.div`
   button {
   
    width: 80%;
    height: 3rem;
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