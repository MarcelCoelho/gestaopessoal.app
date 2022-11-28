
import { GlobalStyle } from "./global";

import styles from './App.module.css';

import { Rotas } from './rotas/Rotas';

function App() {

  return (
    <>
      <GlobalStyle />
      <div className={styles.conteudo}>

        <header className={styles.header}>
          <span>HEADER</span>
        </header>

        <main className={styles.main}>
          <div className={styles.grid}>
            <Rotas />
          </div>
        </main>

        <footer className={styles.rodape}>
          app.gestaopessoal
          <span className={styles.logo}>
            <img src="/favicon.png" alt="logo" width={16} height={16} />
          </span>
        </footer>

      </div>

    </>
  );
}

export default App;
