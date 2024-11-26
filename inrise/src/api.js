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
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('categoryId', data.categoryId);
    formData.append('processadorMinId', data.processadorMinId);
    formData.append('processadorIdealId', data.processadorIdealId);
    formData.append('videoBoardMinId', data.videoBoardMinId);
    formData.append('videoBoardIdealId', data.videoBoardIdealId);
    formData.append('memoryRamMinId', data.memoryRamMinId);
    formData.append('memoryRamIdealId', data.memoryRamIdealId);

    const response = await apiClient.post('/Software', formData, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar o software:', error);
    throw new Error('Erro ao cadastrar o software');
  }
}

export async function registerSoftwareGroup(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  try {
    const formData = new FormData();
    formData.append('name', data.name);

    const response = await apiClient.post('/Category', formData, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar o software:', error);
    throw new Error('Erro ao cadastrar o software');
  }
}

export async function fetchSoftwareGroup() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  try {
    const response = await apiClient.get('/Category', {
      headers, 
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter as categorias de software:', error);
    throw new Error('Erro ao obter as categorias de software');
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


// Fetch All
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

export async function fetchAllPsu() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/PowerSupply', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as fontes:', error);
    throw new Error('Erro ao buscar as fontes');
  }
}

export async function fetchAllMonitor() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/MonitorScreen', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as fontes:', error);
    throw new Error('Erro ao buscar as fontes');
  }
}

export async function fetchAllGpu() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/VideoBoard', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as fontes:', error);
    throw new Error('Erro ao buscar as fontes');
  }
}


export async function fetchAllCpu() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/Processor', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as fontes:', error);
    throw new Error('Erro ao buscar as fontes');
  }
}


export async function fetchAllTower() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/Tower', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as fontes:', error);
    throw new Error('Erro ao buscar as fontes');
  }
}


export async function fetchAllCooler() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/Cooler', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as fontes:', error);
    throw new Error('Erro ao buscar as fontes');
  }
}


export async function fetchAllStorage() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/MemoryRom', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as fontes:', error);
    throw new Error('Erro ao buscar as fontes');
  }
}


export async function fetchAllPC() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/Computer', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as fontes:', error);
    throw new Error('Erro ao buscar as fontes');
  }
}


//Fetch by ID

export function fetchRamById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/MemoryRam/${id}`, { headers })
}

export function fetchPsuById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/PowerSupply/${id}`, { headers })
}

export function fetchGpuById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/VideoBoard/${id}`, { headers })
}

export function fetchMonitorById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/MonitorScreen/${id}`, { headers })
}

export function fetchCpuById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/Processor/${id}`, { headers })
}

export function fetchTowerById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/Tower/${id}`, { headers })
}

export function fetchCoolerById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/Cooler/${id}`, { headers })
}

export function fetchStorageById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/MemoryRom/${id}`, { headers })
}

export function fetchPCById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/Computer/${id}`, { headers })
}

//Put by ID

export async function editRam(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/MemoryRam/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar a memória RAM:', error);
    throw new Error('Erro ao editar a memória RAM');
  }
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
    return response.data.exists;
  } catch (error) {
    console.error('Erro ao verificar e-mail:', error);
    throw new Error('Erro ao verificar e-mail');
  }
}

export { apiClient };
