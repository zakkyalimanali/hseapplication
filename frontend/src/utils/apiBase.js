// Builds the backend API base URL from the current browser hostname.
// This makes every API call go to the same subdomain the user is on —
// e.g. visiting defaultcompany.localhost:3000 calls defaultcompany.localhost:8000.
//
// In Docker, nginx proxies /hseapp/ and /api/ so no port is needed —
// set REACT_APP_API_PORT= (empty) in .env.production to omit it.
const API_PORT = process.env.REACT_APP_API_PORT;
const API_BASE = API_PORT
  ? `http://${window.location.hostname}:${API_PORT}`
  : `http://${window.location.hostname}`;

export default API_BASE;
