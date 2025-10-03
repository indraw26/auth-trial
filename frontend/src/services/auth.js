import api from "../api/axiosInstance";

export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  localStorage.setItem("access_token", res.data.access_token);
  api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
  return res.data;
};


export const register = async (name, email, password, password_confirmation) => {
  const res = await api.post("/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  localStorage.setItem("access_token", res.data.access_token);
  api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
  return res.data;
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("access_token");
    await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("access_token");
    delete api.defaults.headers.common["Authorization"];
    window.location.href = "/";
  }
};

export const getMe = async () => {
  const token = localStorage.getItem("access_token");

  const res = await api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
