import axios from 'axios';

import Cookies from 'js-cookie';

const getToken = () => {
  const token = Cookies.get('adminAuthToken') || Cookies.get('userAuthToken');
  return token;
};

const getUserToken = () => {
  const token = Cookies.get('userAuthToken');
  return token;
};

const apiClient = axios.create({
  baseURL: 'https://apiinriseservice.azurewebsites.net/',
  headers: {
    'Content-Type': 'application/json',
    'secret': 'naf9uafjh_+mcdsaIFD023',
  },
});

export function registerUser(data) {
  return apiClient.post('/User', data);
}


export async function stripePayment(data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};
  try {
    const response = await apiClient.post('/Payment', data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    throw new Error('Erro ao processar pagamento');
  }
}


export async function createOrder(data) {
  const token = getUserToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};
  console.log("Order Data:", data)

  try {
    const response = await apiClient.post('/Order', data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw new Error('Erro ao criar pedido.');
  }
}

//@TODO: Organizar esse arquivo pra ficar bonitinho, os fetch by id, grupo, etc juntos
//@TODO: Talvez os getById, getAll, etc, de peças pelo menos, possam ser mudados pra serem programaticamente callable.
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

export async function deleteSoftware(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  try {
    const response = await apiClient.delete(`/Software/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar o software:', error);
    throw new Error('Erro ao deletar o software');
  }
}



export async function fetchAllSoftwareGroup() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  try {
    const response = await apiClient.get('/Category', {
      headers,
      params: {
        "isDeleted": false,
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

export function fetchSoftwareGroupById(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/Category/${id}`, { headers })
}

export async function registerImage(category, id, imageFile) {
  const token = getToken();

  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  } : {};

  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('ContentDisposition', `attachment; filename="${imageFile.name}"`);
  formData.append('Length', imageFile.size);
  formData.append('Name', imageFile.name);
  formData.append('FileName', imageFile.name);
  try {
    const response = await apiClient.post(`/Image/upload/${category}/${id}`, formData, { headers });

    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw new Error('Error uploading the image');
  }
}

export async function deleteImage(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/Image/${id}`, { headers });
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


export async function deleteRam(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/MemoryRam/${id}`, { headers });

}

export async function deletePSU(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/PowerSupply/${id}`, { headers });
}


export async function deleteCooler(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/Cooler/${id}`, { headers });
}


export async function deleteMonitor(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/MonitorScreen/${id}`, { headers });
}


export async function deleteRom(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/MemoryRom/${id}`, { headers });
}


export async function deleteGPU(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/VideoBoard/${id}`, { headers });
}

export async function deleteTower(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/Tower/${id}`, { headers });
}

export async function deleteCpu(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/Processor/${id}`, { headers });
}

export async function deleteMobo(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/MotherBoard/${id}`, { headers });
}

export async function deletePC(id) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  return apiClient.delete(`/Computer/${id}`, { headers });
}

export async function controlRam(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};

  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/MemoryRam/${action}/${id}`, {}, { headers });
}

export async function controlPSU(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/PowerSupply/${action}/${id}`, {}, { headers });
}

export async function controlCooler(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/Cooler/${action}/${id}`, {}, { headers });
}

export async function controlMonitor(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/MonitorScreen/${action}/${id}`, {}, { headers });
}

export async function controlRom(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/MemoryRom/${action}/${id}`, {}, { headers });
}

export async function controlGPU(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/VideoBoard/${action}/${id}`, {}, { headers });
}

export async function controlTower(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/Tower/${action}/${id}`, {}, { headers });
}

export async function controlCpu(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/Processor/${action}/${id}`, {}, { headers });
}

export async function controlMobo(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/MotherBoard/${action}/${id}`, {}, { headers });
}

export async function controlPC(id, active) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  const action = active ? 'Deactivate' : 'Activate';

  return apiClient.put(`/Computer/${action}/${id}`, {}, { headers });
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
        "IsDeleted": false,
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
        "IsDeleted": false,
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
        "IsDeleted": false,
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
        "IsDeleted": false,
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os monitores:', error);
    throw new Error('Erro ao buscar os monitores');
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
        "IsDeleted": false,
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as GPUs:', error);
    throw new Error('Erro ao buscar as GPUs');
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
        "IsDeleted": false,
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as CPUs:', error);
    throw new Error('Erro ao buscar as CPUs');
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
        "IsDeleted": false,
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os gabinetes:', error);
    throw new Error('Erro ao buscar os gabinetes');
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
        "IsDeleted": false,
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os coolers:', error);
    throw new Error('Erro ao buscar os coolers');
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
        "IsDeleted": false,
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os discos:', error);
    throw new Error('Erro ao buscar os discos');
  }
}

export async function fetchAllPC() {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
  } : {};

  try {
    const response = await apiClient.get('/Computer', {
      headers,
      params: {
        //"IsDeleted": false,
        "Pagination.PageIndex": 1,
        "Pagination.PageSize": 99,

      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching PCs:', error);
    throw new Error('Error fetching PCs');
  }
}


export function getCodeEmail(data) {
  const headers = {
    'Content-Type': 'application/json'
  };

  // Assuming 'data' contains the email address.
  const url = `/ValidationCode/generate-by-email?email=${data.email}`;

  return apiClient.post(url, null, { headers });
}

export function validateEmail(email, code) {
  const headers = {
    'Content-Type': 'application/json'
  };

  const data = {
    email: email,
    code: code
  };

  return apiClient.post(`/ValidationCode/validate-by-email/`, data, { headers });
}
//Fetch by ID

export function fetchOrderById(id) {
  const token = getUserToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/Order/${id}`, { headers })
}


export function fetchOrdersByUserId(userId) {
  const token = getUserToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`
  } : {};
  return apiClient.get(`/Order/user/${userId}`, { headers })
}

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

export async function editSoftwareGroup(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/Category/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar o grupo de software:', error);
    throw new Error('Erro ao editar o grupo de software');
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

export async function editCpu(id, data) {
  const token = getToken();
  const headers = token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {};

  try {
    const response = await apiClient.put(`/Processor/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar a CPU:', error);
    throw new Error('Erro ao editar a CPU');
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
