import {
  fetchAllCpu, fetchAllMobo, fetchAllTower, fetchAllRam, fetchAllStorage,
  fetchAllGpu, fetchAllPsu, fetchAllCooler, fetchAllMonitor, fetchAllPC,
} from '@/api';

export async function loadProducts(productType, user = null) {
  if (productType === 'select') {
    return [];
  }

  let response;

  try {
    switch (productType) {
      case 'ram':
        response = await fetchAllRam(user);
        break;
      case 'psu':
        response = await fetchAllPsu(user);
        break;
      case 'monitor':
        response = await fetchAllMonitor(user);
        break;
      case 'placaDeVideo':
        response = await fetchAllGpu(user);
        break;
      case 'processador':
        response = await fetchAllCpu(user);
        break;
      case 'gabinete':
        response = await fetchAllTower(user);
        break;
      case 'cooler':
        response = await fetchAllCooler(user);
        break;
      case 'disco':
        response = await fetchAllStorage(user);
        break;
      case 'computador':
        response = await fetchAllPC(user);
        break;
      case 'placaMae':
        response = await fetchAllMobo(user);
        break;
        //TODO: Ajeitar isso pra perifericos finais
      case 'perifericos':
        response = await fetchAllMonitor(user);
        break;
      default:
        throw new Error('Tipo de produto não suportado');
    }

    const products = response.data.items;
    return products
  } catch (error) {
    console.error('Erro ao carregar os produtos:', error);
    return [];
  }
}
