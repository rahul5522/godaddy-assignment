# GitHub Repos Explorer

A simple React application to explore and view GoDaddy's public GitHub repositories.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/github-repos-explorer.git
   cd github-repos-explorer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

- `App.jsx`: Main application component with routing configuration
- `components/RepoList`: Component to display the list of repositories
- `components/RepoDetail`: Component to display detailed information about a specific repository
- `context/GitHubRepoContext`: Context provider for storing repository data globally

## Data Management

This application uses React Context API through the `GitHubRepoContext` to store repository data centrally, eliminating the need to refetch data when navigating between pages. This improves performance and provides a smoother user experience.
