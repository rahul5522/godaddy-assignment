import React, { createContext, useState, useContext, useEffect } from 'react';

const GitHubContext = createContext();

export function GitHubProvider({ children }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/orgs/godaddy/repos?per_page=100');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRepos(data);
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    if (!initialized) {
      fetchRepos().then(success => {
        if (success) {
          setInitialized(true);
        }
      });
    }
  }, [initialized]);

  const refreshRepos = () => fetchRepos();

  return (
    <GitHubContext.Provider value={{ repos, loading, error, refreshRepos }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  return useContext(GitHubContext);
}