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
      return { success: false, error: 'Invalid response structure from the server' };
    }
  } catch (error) {
    console.error('Admin login error:', error);
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

export const loginUser = async (email, password) => {
  try {
    const response = await authenticateUser({
      email: email,
      password: password,
      profile: 2,
    });

    const userAuthToken = response.data.data.acessToken.token;
    const userTokenExpiry = new Date(response.data.data.acessToken.expiredIn);

    Cookies.set('userAuthToken', userAuthToken, { expires: userTokenExpiry });
    Cookies.set('userTokenExpiry', userTokenExpiry.toISOString());

    return { token: userAuthToken, expiry: userTokenExpiry };
  } catch (error) {
    console.error('User login error:', error);
    throw new Error('Login sem sucesso. Por favor cheque suas credenciais.');
  }
};

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
  location.reload();
};

export const logoutAdmin = () => {
  Cookies.remove('adminAuthToken');
  Cookies.remove('adminTokenExpiry');
  location.reload();

};

export const isUserTokenValid = () => {
  const tokenExpiry = Cookies.get('userTokenExpiry');
  if (tokenExpiry) {
    const expiryDate = new Date(tokenExpiry);
    return new Date() < expiryDate;
  }
  return false;
};
