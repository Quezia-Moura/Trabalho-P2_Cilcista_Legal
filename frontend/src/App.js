import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateReport from './components/CreateReport';
import ReportsList from './components/ReportsList';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [userId, setUserId] = useState(null); // Armazena o ID do usuário logado

  return (
    <Router>
      <div>
        <Routes>
          {/* Rota para login na raiz */}
          <Route path="/" element={<Login setUserId={setUserId} />} />

          {/* Rota para cadastro */}
          <Route path="/register" element={<Register />} />

          {/* Rota para a lista de relatórios, visível apenas se o usuário estiver logado */}
          <Route
            path="/reports"
            element={userId ? <ReportsList userId={userId} /> : <Login setUserId={setUserId} />}
          />

          {/* Rota para criar denúncia, visível apenas se o usuário estiver logado */}
          <Route
            path="/create-report"
            element={userId ? <CreateReport userId={userId} /> : <Login setUserId={setUserId} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
