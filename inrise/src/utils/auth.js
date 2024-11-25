export function isAuthenticated() {
  const token = localStorage.getItem('authToken');
  console.log("AuthToken:", token); 
  const validToken = (token != undefined)  
  console.log(validToken)
  return validToken;
}
  export function logout() {
    localStorage.removeItem('authToken');
  }
  
//@TODO: Setar refresh do token de autorização e/ou logout automático ao expirar.