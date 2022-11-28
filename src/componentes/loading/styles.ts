import styled from "styled-components";

interface ContainerProps {
  tamanho: number;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    justify-content: center;

    align-items: center;

  .reactloading {
    font-size: ${(props) => props.tamanho + "rem"};
  }

    span {
      margin: 2rem;
      padding: 1rem;
      font-size: ${(props) => props.tamanho + "rem"};
      color: var(--text-title);      
    }
`;