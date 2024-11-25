import axios from 'axios';
const getToken = () => {
  return localStorage.getItem('authToken');  // ou sessionStorage.getItem('token');
};

const apiClient = axios.create({
  baseURL: 'https://apiinriseservice.azurewebsites.net/',  
  headers: {
    'Content-Type': 'application/json',
    'secret': 'naf9uafjh_+mcdsaIFD023', 
  },
});

export function registerUser(data) {
  return apiClient.post('/register', data);
}

export async function registerSoftware(data) {
  try {
    const formData = new FormData();
    formData.append('icon', data.icon); // Adicionando o arquivo de ícone
    formData.append('name', data.name);
    formData.append('categoryId', data.categoryId);
    formData.append('processadorMinId', data.processadorMinId);
    formData.append('processadorIdealId', data.processadorIdealId);
    formData.append('videoBoardMinId', data.videoBoardMinId);
    formData.append('videoBoardIdealId', data.videoBoardIdealId);
    formData.append('memoryRamMinId', data.memoryRamMinId);
    formData.append('memoryRamIdealId', data.memoryRamIdealId);

    const response = await apiClient.post('/softwares', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Necessário para enviar FormData com arquivos
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar o software:', error);
    throw new Error('Erro ao cadastrar o software');
  }
}

export async function registerRam(data) {
  const token = getToken();
  const headers = token ? { 
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/MemoryRam', data, { headers });
}

export async function registerPSU(data) {
  const token = getToken();
  const headers = token ? { 
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/PowerSupply', data, { headers });
}

export async function fetchAllRam() {
  const token = getToken();  
  const headers = token ? { 
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/MemoryRam', {
      headers,
      params: {
        "Pagination.PageIndex": 1,   
        "Pagination.PageSize": 99, 
      
      }
    });

    return response.data;  
  } catch (error) {
    console.error('Erro ao buscar as memórias RAM:', error);
    throw new Error('Erro ao buscar as memórias RAM');
  }
}

// Função para buscar a página de destino
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
    return response.data.exists;
  } catch (error) {
    console.error('Erro ao verificar e-mail:', error);
    throw new Error('Erro ao verificar e-mail');
  }
}

export { apiClient };
