import { loginUser, registerUser } from 'services/api';

export const apiLogin = async (userData) => {
  try {
    const response = await loginUser(userData);
    
    if (response.access && response.refresh) {
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
    }

    return response;
  } catch (err) {
    console.error("Login failed:", err);
    throw err; 
  }
};


export const apiRegister = async (userData) => {
  try {
    return await registerUser(userData);
  } catch (err) {
    console.error("Registration failed:", err);
    throw err;
  }
};
