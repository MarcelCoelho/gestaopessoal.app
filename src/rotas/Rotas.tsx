import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';


import { TotalFatura } from '../componentes/totalFatura';
import { Transacao } from '../componentes/transacao';
import { TotalFaturaProvider } from '../hooks/useTotalFatura';

const Dashboard = ({ children, redirectTo }) => {
  return <Navigate to={redirectTo} />
}

export function Rotas() {
  return (
    <Router>
      <TotalFaturaProvider>
        <Routes>
          <Route path="/totalFatura" element={<TotalFatura />} />

          <Route
            path="/"
            element={<Dashboard redirectTo="/totalFatura">
              <TotalFatura />
            </Dashboard>}>
          </Route>

          <Route path="/transacoes" element={<Transacao />} />

        </Routes>
      </TotalFaturaProvider>
    </Router>
  )
}
