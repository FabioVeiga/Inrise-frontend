import Cookies from 'js-cookie';
import { authenticateUser } from '@/api';

export async function loginAdmin(admin) {
  try {
    const response = await authenticateUser({
      email: admin.email,
      password: admin.password,
      profile: 1,
    });

    if (response && response.data.data && response.data.data.acessToken) {
      const token = response.data.data.acessToken.token;
      const expiresIn = response.data.data.acessToken.expiredIn;
      console.log("Admin login.")
      console.log("Bearer", token)
      const expiryDate = new Date(expiresIn);

      Cookies.set('adminAuthToken', token, { expires: expiryDate });
      Cookies.set('adminTokenExpiry', expiryDate.toISOString());

      return { success: true, token };
    } else {
      return { success: false, error: 'Estrutura de resposta do servidor inválida.' };
    }
  } catch (error) {
    console.error('Admin login error:', error);
    //@TODO: As vezes dá um undefined se eu mudar esse throw pra um alert.
    throw new Error('Login sem sucesso. Por favor cheque suas credenciais.');
  }
}

export const isAdminTokenValid = () => {
  const tokenExpiry = Cookies.get('adminTokenExpiry');
  if (tokenExpiry) {
    const expiryDate = new Date(tokenExpiry);
    return new Date() < expiryDate;
  }
  return false;
};


export const loginUser = async ({ email, password }) => {
  try {
    const response = await authenticateUser({
      email,
      password,
      profile: 2,
    });

    const userData = response.data.data;
    const userAuthToken = userData.acessToken.token;
    const userTokenExpiry = new Date(userData.acessToken.expiredIn);
    const userId = userData.id;
    const userName = userData.name;
    const userLastName = userData.lastname;

    Cookies.set('userAuthToken', userAuthToken, { expires: userTokenExpiry });
    Cookies.set('userId', userId);
    Cookies.set('userName', userName);
    Cookies.set('userLastName', userLastName);
    Cookies.set('userTokenExpiry', userTokenExpiry.toISOString());

    return { success: true };
  } catch (error) {
    console.error('User login error:', error);
    return { success: false, error: 'Login failed. Please check your credentials.' };
  }
}

export const isAuthenticatedUser = () => {
  const token = Cookies.get('userAuthToken');
  const expiry = Cookies.get('userTokenExpiry');

  if (token && expiry) {
    const expiryTime = new Date(expiry).getTime();
    if (expiryTime > Date.now()) {
      return true;
    } else {
      logoutUser();
      return false;
    }
  }
  return false;
};

export const isAuthenticatedAdmin = () => {
  const token = Cookies.get('adminAuthToken');
  const expiry = Cookies.get('adminTokenExpiry');

  if (token && expiry) {
    const expiryTime = new Date(expiry).getTime();
    if (expiryTime > Date.now()) {
      return true;
    } else {
      logoutAdmin();
      return false;
    }
  }
  return false;
};

export const logoutUser = () => {
  Cookies.remove('userAuthToken');
  Cookies.remove('userTokenExpiry');
  Cookies.remove('userId')
  Cookies.remove('userName')
  Cookies.remove('userLastName')

  location.reload();
};

export const logoutAdmin = () => {
  Cookies.remove('adminAuthToken');
  Cookies.remove('adminTokenExpiry');
  location.reload();

};

export const isUserTokenValid = () => {
  console.log("User token expiry:", Cookies.get('userTokenExpiry'))
  const tokenExpiry = Cookies.get('userTokenExpiry');
  if (tokenExpiry) {
    const expiryDate = new Date(tokenExpiry);
    return new Date() < expiryDate;
  }
  return false;
};
