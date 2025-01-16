import {
  fetchAllCpu, fetchAllMobo, fetchAllTower, fetchAllRam, fetchAllStorage,
  fetchAllGpu, fetchAllPsu, fetchAllCooler, fetchAllMonitor, fetchAllPC,
  fetchCpuById, fetchMoboById, fetchTowerById, fetchRamById, fetchStorageById,
  fetchGpuById, fetchPsuById, fetchCoolerById, fetchMonitorById, fetchPCById,
} from '@/api'




export async function loadProducts(productType) {
  if (productType === 'select') {
    return [];
  }

  let response;
  let fetchDetails;

  try {
    switch (productType) {
      case 'ram':
        response = await fetchAllRam();
        fetchDetails = fetchRamById;
        break;
      case 'psu':
        response = await fetchAllPsu();
        fetchDetails = fetchPsuById;
        break;
      case 'monitor':
        response = await fetchAllMonitor();
        fetchDetails = fetchMonitorById;
        break;
      case 'placaDeVideo':
        response = await fetchAllGpu();
        fetchDetails = fetchGpuById;
        break;
      case 'processador':
        response = await fetchAllCpu();
        fetchDetails = fetchCpuById;
        break;
      case 'gabinete':
        response = await fetchAllTower();
        fetchDetails = fetchTowerById;
        break;
      case 'cooler':
        response = await fetchAllCooler();
        fetchDetails = fetchCoolerById;
        break;
      case 'disco':
        response = await fetchAllStorage();
        fetchDetails = fetchStorageById;
        break;
      case 'computador':
        response = await fetchAllPC();
        fetchDetails = fetchPCById;
        break;
      case 'placaMae':
        response = await fetchAllMobo();
        fetchDetails = fetchMoboById;
        break;
      default:
        throw new Error('Tipo de produto não suportado');
    }

    const products = response.data.items;
    for (let product of products) {
      const productDetails = await fetchDetails(product.id);
      if (productDetails && productDetails.data) {
        product.name = productDetails.data.data.name;
        product.price = productDetails.data.data.price;
        product.images = productDetails.data.data.images;
      } else {
        product.price = null;
      }
    }

    return products;
  } catch (error) {
    console.error('Erro ao carregar os produtos:', error);
    return [];
  }
}

