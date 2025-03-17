const API_URL = "http://127.0.0.1:8000/api/";

export const registerUser = async (userData) => {
  try {
    console.log('Registering user with data:', userData);
    const res = await fetch(`${API_URL}register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Registration failed");
    }

    console.log('Registration successful:', res);
    return res;
    
  } catch (err) {
    console.error("Error during registration:", err);
    throw err;
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log('Attempting to login with credentials:', credentials);
    const res = await fetch(`${API_URL}login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorText = await res.clone().text();
      console.error('Login failed with response:', errorText);
      throw new Error("Login failed");
    }

    const contentType = res.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Expected JSON response, but got: " + contentType);
    }

    const data = await res.clone().json();

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    console.log('Login successful:', data);

    return res;

  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
};


export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("access_token");
    console.log('Stored token:', token);

    if (!token) {
      console.error("No access token found");
      throw new Error("No access token found");
    }

    const res = await fetch(`${API_URL}profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch profile:", res);
      throw new Error("Failed to fetch profile");
    }

    console.log('Profile fetched successfully:', await res.json());
    return res;
  } catch (err) {
    console.error("Error fetching profile:", err);
    throw err;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    console.log('Stored refresh token:', refreshToken);
    
    if (!refreshToken) {
      console.error("No refresh token available");
      throw new Error("No refresh token available");
    }

    const res = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken,
    });

    console.log('New access token received:', res.data.access);
    localStorage.setItem("access_token", res.data.access);
    return res.data.access;
  } catch (err) {
    console.error("Token refresh failed:", err);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    console.log('Tokens removed from localStorage');
  }
};
