import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css';

function RepoDetail() {
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const repoName = window.location.pathname.split('/repo/')[1];
  
  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/godaddy/${repoName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRepo(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchRepoDetails();
  }, [repoName]);
  
  if (loading) {
    return (
      <div className="dark-container d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="light" />
        <span className="ms-2 text-light">Loading...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="dark-container p-4">
        <Link to="/" className="back-button">
          <i className="bi bi-arrow-left"></i> Back
        </Link>
        <Card className="error-card">
          <Card.Body>
            <Card.Title className="text-danger">Error</Card.Title>
            <Card.Text>{error}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="dark-container p-4">
      <Link to="/" className="back-button">
        <i className="bi bi-arrow-left"></i> Back
      </Link>
      
      {repo && (
        <Card className="repo-card">
          <Card.Header>
            <h2 className="repo-title">{repo.name}</h2>
            <p className="text-muted-bright">{repo.full_name}</p>
            <span className="language-badge">
              <i className="bi bi-code-slash me-1"></i>
              {repo.language || 'Not specified'}
            </span>
          </Card.Header>
          
          <Card.Body>
            <p className="description">{repo.description || 'No description available'}</p>
            
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-icon-container">
                  <i className="bi bi-diagram-2-fill stat-icon"></i>
                </div>
                <span className="stat-value">{repo.forks_count}</span>
                <small className="stat-label">Forks</small>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon-container">
                  <i className="bi bi-star-fill stat-icon"></i>
                </div>
                <span className="stat-value">{repo.stargazers_count}</span>
                <small className="stat-label">Stars</small>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon-container">
                  <i className="bi bi-exclamation-circle-fill stat-icon"></i>
                </div>
                <span className="stat-value">{repo.open_issues_count}</span>
                <small className="stat-label">Issues</small>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon-container">
                  <i className="bi bi-eye-fill stat-icon"></i>
                </div>
                <span className="stat-value">{repo.watchers_count}</span>
                <small className="stat-label">Watchers</small>
              </div>
            </div>
          </Card.Body>
          
          <Card.Footer className="text-center">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
            >
              <i className="bi bi-github me-2"></i>View on GitHub
            </a>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
}

export default RepoDetail;