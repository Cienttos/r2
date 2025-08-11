import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './pages/notfound.jsx';
import Home from './pages/home.jsx';
import Details from './pages/details.jsx';
import Create from './pages/create.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
