export function isAuthenticated() {
  const token = localStorage.getItem('authToken');
  console.log("Bearer", token);
  const validToken = (token != undefined)
  console.log(validToken)
  return validToken;
}
export function logout() {
  localStorage.removeItem('authToken');
}

//@TODO: Setar refresh do token de autorização e/ou logout automático ao expirar.
//@TODO: Cookies de sessão ao invés de localStorage.

/*
import Cookies from 'js-cookie';

export function isAuthenticated() {
  const token = Cookies.get('authToken');
  console.log("Bearer", token); 
  
  const validToken = (token !== undefined);
  console.log(validToken);
  
  return validToken;
}

export function logout() {
  localStorage.removeItem('authToken');
  Cookies.remove('authToken');
}

// Example of how to set the token in a cookie when logging in
export function setAuthToken(token) {
  Cookies.set('authToken', token, { expires: oneHourFromNow, path: '/' });}

*/