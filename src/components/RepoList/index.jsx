import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Spinner, Container, Button } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';

import { useGitHub } from '../../context/GitHubRepoContext';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RepoList() {
  const { repos, loading, error, refreshRepos } = useGitHub();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }
  
  return (
    <div className="bg-dark min-vh-100 text-light py-4">
      <Container className="d-flex flex-column align-items-center">
        <h1 className="text-center mb-4">GoDaddy GitHub Repositories</h1>
        
        <div className="d-flex justify-content-end w-100 mb-3">
          <Button variant="outline-light" size="sm" onClick={refreshRepos}>
            Refresh Data
          </Button>
        </div>
        
        <div className="w-100 position-relative repo-table-container">
          <Table 
            variant="dark" 
            hover 
            bordered
            className="mb-0 repo-table"
          >
            <thead className="table-header-fixed">
              <tr>
                <th style={{ width: '20%' }}>Repository Name</th>
                <th style={{ width: '45%' }}>Description</th>
                <th style={{ width: '15%' }}>Language</th>
                <th style={{ width: '10%' }}>Stars</th>
                <th style={{ width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {repos.map(repo => (
                <tr key={repo.id}>
                  <td className="align-middle fw-bold">{repo.name}</td>
                  <td className="align-middle">{repo.description || 'No description available'}</td>
                  <td className="align-middle">{repo.language || 'Not specified'}</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <StarFill className="me-1 text-warning" />
                      {repo.stargazers_count}
                    </div>
                  </td>
                  <td className="align-middle">
                    <Link to={`/repo/${repo.name}`}>
                      <Button variant="primary" size="sm" className="w-100">View Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
        {repos.length === 0 && !loading && (
          <div className="text-center my-3">
            <p>No repositories found</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default RepoList;