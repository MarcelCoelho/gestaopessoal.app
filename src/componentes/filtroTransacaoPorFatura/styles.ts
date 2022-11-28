import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const CardTipoPagamento = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.5rem;
  height: 1.5rem;
  background: var(--text-body);
  border-radius: 4rem;
  cursor: pointer;
  
  &:hover {    
      background: var(--fundoCard);
      filter: brightness(0.8);
      transition: 1s;
    }

  span {
    font-size: 0.7rem;
    padding: 1rem;
  }
`;