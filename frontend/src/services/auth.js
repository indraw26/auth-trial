import api from "../api/axiosInstance";

export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  localStorage.setItem("access_token", res.data.access_token);
  return res.data;
};

export const register = async (
  name,
  email,
  password,
  password_confirmation
) => {
  const res = await api.post("/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  localStorage.setItem("access_token", res.data.access_token);
  return res.data;
};

export const logout = async () => {
  await api.post("/logout");
  localStorage.removeItem("access_token");
};

export const getMe = async () => {
  const token = localStorage.getItem("access_token");

  const res = await api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // console.log("User data:", res.data);

  return res.data;
};
