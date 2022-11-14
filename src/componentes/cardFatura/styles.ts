import styled from "styled-components";

interface ComponentProps {
  ativo: boolean;
  fechada: boolean;
  atual: boolean;
}

export const Container = styled.div<ComponentProps>`
  margin: 1rem;
  padding: 1rem;
  
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border - color 0.15s ease;
  width: 10rem;
  height: 8rem;
  
  justify-content: center;
  align-items: center;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  
  border-color: ${(props) => props.ativo ? "var(--black)" : (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)" : "var(--cinza)"))};
  background-color:  ${(props) => props.ativo && props.fechada ? "var(--red-tomato)" : props.ativo && props.atual ? "var(--green-light)" : props.ativo && !props.atual && !props.fechada ? "var(--cinza)" : ""};
  
  &:hover {
    background:  ${(props) => (props.fechada ? "var(--red-tomato)" : (props.atual ? "var(--green-light)" : "var(--cinza)"))};
    border-color: var(--black);
    filter: brightness(0.7);
    transition: 1s;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: normal
  }

  p{
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: bold;
  }

  span {
    margin: 1rem 0 0 0;
    font-size: 0.8rem;
  }
`;