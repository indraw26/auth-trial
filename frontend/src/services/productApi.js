import api from "../api/axiosInstance";

export const getProducts = async () => {
  const token = localStorage.getItem("access_token");
  const res = await api.get("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getProduct = async (id) => {
  const token = localStorage.getItem("access_token");
  const res = await api.get(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createProduct = async (data) => {
  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await api.post("/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProduct = async (id, data) => {
  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await api.post(`/products/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("access_token");
  const res = await api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
