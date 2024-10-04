export function isAuthenticated() {
  const token = localStorage.getItem('authToken');
  console.log("AuthToken:", token); // Logs the token (or null/undefined)
  const validToken = (token != undefined)  
  console.log(validToken)
  return validToken; // Returns true if token exists, false otherwise
}
  export function logout() {
    localStorage.removeItem('authToken');
  }
  