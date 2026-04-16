// Builds the backend API base URL from the current browser hostname.
// This makes every API call go to the same subdomain the user is on —
// e.g. visiting defaultcompany.localhost:3000 calls defaultcompany.localhost:8000.
const API_PORT = process.env.REACT_APP_API_PORT || '8000';
const API_BASE = `http://${window.location.hostname}:${API_PORT}`;

export default API_BASE;
