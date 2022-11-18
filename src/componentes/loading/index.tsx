import ReactLoading from 'react-loading';

import { Container } from "./styles";

interface LoadingProps {
  descricao: string;
}

export function Loading({ descricao }: LoadingProps) {
  return (
    <Container>
      <ReactLoading
        type={"bars"} color={"#363F5F"} height={50} width={80}
      />
      <span>{descricao}</span>
    </Container>
  );
}