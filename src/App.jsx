import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RepoList from "./components/RepoList";
import RepoDetail from "./components/RepoDetail";

import { GitHubProvider } from "./context/GitHubRepoContext";

function App() {
  return (
    <GitHubProvider>
      <Router>
        <div className="bg-dark">
          <Routes>
            <Route path="/" element={<RepoList />} />
            <Route path="/repo/:repoName" element={<RepoDetail />} />
          </Routes>
        </div>
      </Router>
    </GitHubProvider>
  );
}

export default App;
