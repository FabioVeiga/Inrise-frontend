import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://apiserviceinrise.azurewebsites.net',  
  headers: {
    'Content-Type': 'application/json',
    'secret': 'naf9uafjh_+mcdsaIFD023', 
  },
});

export function registerUser(data) {
  return apiClient.post('/register', data);
}

export function fetchLandingPage() {
  return apiClient.get('/LandingPage');
}

export function submitLandingPage(data) {
  return apiClient.post('/LandingPage', data);
}

export function authenticateUser(data) {
  return apiClient.post('/UserAutentication', data);
}

export async function checkEmailExists(email) {
  try {
    const response = await apiClient.get(`/check-email?email=${encodeURIComponent(email)}`);
    return response.data.exists; // Supondo que a resposta contém um campo 'exists'
  } catch (error) {
    console.error('Erro ao verificar e-mail:', error);
    throw new Error('Erro ao verificar e-mail');
  }
}

export { apiClient };
