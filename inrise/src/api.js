import axios from 'axios';
const getToken = () => {
  return localStorage.getItem('authToken');
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
//@TODO: Organizar esse arquivo pra ficar bonitinho, os fetch by id, grupo, etc juntos
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

export async function deleteSoftwareGroup(categoryId) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/Category/${categoryId}`, { headers });
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

export async function fetchAllSoftware() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  try {
    const response = await apiClient.get('/Software', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os softwares:', error);
    throw new Error('Erro ao obter os softwares:');
  }

}


/*export async function fetchSoftwareByGroupId() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

}*/

export async function registerRam(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/MemoryRam', data, { headers });
}


export async function deleteRam() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/MemoryRam', { headers });
}

export async function deletePSU() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/PowerSupply', { headers });
}


export async function deleteCooler() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/Cooler', { headers });
}


export async function deleteMonitor() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/MonitorScreen', { headers });
}


export async function deleteRom() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/MemoryRom', { headers });
}


export async function deleteGPU() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/VideoBoard', { headers });
}

export async function deleteTower() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/Tower', { headers });
}

export async function deleteCpu() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/Processor', { headers });
}

export async function deleteMobo() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete('/MotherBoard', { headers });
}

export async function registerRom(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/MemoryRom', data, { headers });
}


export async function registerPSU(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/PowerSupply', data, { headers });
}

export async function registerMonitor(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/MonitorScreen', data, { headers });
}

export async function registerMobo(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/MotherBoard', data, { headers });

  
}

export async function registerCPU(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/Processor', data, { headers });
}

export async function registerGPU(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/VideoBoard', data, { headers });
}

export async function registerCooler(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/Cooler', data, { headers });
}

export async function registerTower(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/Tower', data, { headers });
}

export async function registerPC(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.post('/Computer', data, { headers });
}

//Fetch All
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


export async function fetchAllRom() {
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


export async function fetchAllMobo() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.get('/MotherBoard', {
      headers,
      params: {
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as placas mae:', error);
    throw new Error('Erro ao buscar as placas mae');
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


export function fetchMoboById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/MotherBoard/${id}`, { headers })
}

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

export async function editGpu(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/VideoBoard/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar a gpu:', error);
    throw new Error('Erro ao editar a gpu');
  }
}



export async function editRom(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/MemoryRom/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar a ROM:', error);
    throw new Error('Erro ao editar a ROM');
  }
}

export async function editTower(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/Tower/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar o gabinete:', error);
    throw new Error('Erro ao editar a gabinete!');
  }
}


export async function editMobo(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/MotherBoard/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar a MOBO:', error);
    throw new Error('Erro ao editar a MOBO');
  }
}

export async function editMonitor(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/MonitorScreen/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar o Monitor:', error);
    throw new Error('Erro ao editar o Monitor');
  }
}

export async function editPsu(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/PowerSupply/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar a fonte:', error);
    throw new Error('Erro ao editar a fonte');
  }
}

export async function editCooler(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/Cooler/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar o cooler:', error);
    throw new Error('Erro ao editar o cooler');
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
