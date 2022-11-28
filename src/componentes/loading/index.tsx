import ReactLoading from 'react-loading';

import { Container } from "./styles";

interface LoadingProps {
  descricao: string;
  tamanho: number;
}

export function Loading({ descricao, tamanho = 1.5 }: LoadingProps) {
  return (
    <Container tamanho={tamanho}>
      <ReactLoading className='reactloading'
        type={"bars"} color={"#363F5F"} height={50} width={80}
      />
      <span>{descricao}</span>
    </Container>
  );
}