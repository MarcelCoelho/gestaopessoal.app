import styled from "styled-components";

export const Container = styled.div`
  input {
    width: 17rem;
    height: 2rem;
    border: none;
    padding: 0.5rem;
    color: var(--text-body);
  }
  input:focus {
    outline: none;
    border-radius: 0.3rem;
  }

  button {
    margin-left: -2rem;
    width: 3rem;
    height: 2rem;
    border: none;
    background: #e1e3e7;
    font-size:0.8rem;
    font-weight: 400;

    transition: background-color 0.2s;

    &:hover {
      filter: brightness(0.8);
      //border: 2px solid #04d361;
    }}
  `;