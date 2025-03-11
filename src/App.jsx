import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Container className="py-4">
        <h1 className="mb-4">GoDaddy GitHub Repositories</h1>
      </Container>
    </Router>
  );
}

export default App;