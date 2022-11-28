import styled from "styled-components";

interface ComponentProps {
  ativo: boolean;
  fechada: boolean;
  atual: boolean;
}

export const Container = styled.div<ComponentProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  margin: 0.65rem;
  padding: 0.2rem;
  
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  
  width: 10rem;
  height: 8rem;  
 
  cursor: pointer; 

  transition: color 0.15s ease, border - color 0.15s ease;

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
    font-size: 1rem;
    font-weight: normal
  }

  p{
    margin: 0;
    font-size: 1.1rem;
    line-height: 1;
    font-weight: bold;
  }

  span {
    margin: 1rem 0 0 0;
    font-size: 0.8rem;
  }
`;