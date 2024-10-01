
export function isAuthenticated() {
    console.log("AuthToken",localStorage.getItem('authToken'))
    return !!localStorage.getItem('authToken'); 
  }
  
  export function logout() {
    localStorage.removeItem('authToken');
  }
  