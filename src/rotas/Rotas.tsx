
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';


import { TotalFatura } from '../componentes/totalFatura';
import { Transacao } from '../componentes/transacao';
import { TotalFaturaProvider } from '../hooks/useTotalFatura';
import { TransacoesProvider } from '../hooks/useTransacoes';

export function Rotas() {

  return (
    <Router>
      <TotalFaturaProvider>
        <TransacoesProvider>
          <Routes>
            <Route path="/totalFatura" element={<TotalFatura />} />
            <Route path="/transacoes" element={<Transacao />} />
          </Routes>
        </TransacoesProvider>
      </TotalFaturaProvider>
    </Router >
  )
}
