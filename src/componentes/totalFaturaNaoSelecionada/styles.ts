import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    //flex-wrap: wrap;
    max-width: 50rem;
    justify-content: center;
    align-items: center;

    height: 3rem;
    background: var(--shape);
    padding: 0.5rem;

    gap: 0.5rem;
    width: 8rem;
    border-radius: 0.5rem;  

    cursor: pointer;

    &:hover {      
      border: 1px solid var(--text-body);
      filter: brightness(0.8);
      transition: 1s;
    }    
  }

  p {
    font-size: 0.8rem;
  }

  span {
    
    font-weight: bold;
  }

  .botao {
      background: var(--green);

      button {
        border: none;
        background: transparent;
        font-size: 1.1rem;
      }
    }
`;