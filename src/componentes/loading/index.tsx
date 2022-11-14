import ReactLoading from 'react-loading';

import { Container } from "./styles";

export function Loading({ descricao }) {
  return (
    <Container>
      <ReactLoading
        type={"bars"} color={"#363F5F"} height={50} width={80}
      />
      <span>{descricao}</span>
    </Container>
  );
}