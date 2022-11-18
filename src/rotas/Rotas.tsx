
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';


import { TotalFatura } from '../componentes/totalFatura';
import { Transacao } from '../componentes/transacao';
import { TotalFaturaProvider } from '../hooks/useTotalFatura';

export function Rotas() {
  return (
    <Router>
      <TotalFaturaProvider>
        <Routes>
          <Route path="/" element={<TotalFatura />} />
          <Route path="/totalFatura" element={<TotalFatura />} />
          <Route path="/transacoes" element={<Transacao />} />

        </Routes>
      </TotalFaturaProvider>
    </Router >
  )
}
