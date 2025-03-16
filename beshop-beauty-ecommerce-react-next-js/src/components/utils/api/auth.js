export const apiLogin = async (userData) => {
  // console.log("Sending data to backend:", userData);  
  const response = await fetch('http://localhost:8000/api/login/', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    console.error(" Login failed:", data); 
  }

  return response;
};

export const apiRegister = async (userData) => {
  // console.log("Sending data to backend:", userData);  
  const response = await fetch('http://localhost:8000/api/register/', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    console.error("Registration failed:", data);  
  }

  return response;
};


