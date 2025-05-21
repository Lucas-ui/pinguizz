import apiClient from "../api/axios";

export const registerUser = (data) => {
  return apiClient.post("auth/register", data);
};

export const loginUser = (data) => {
  return apiClient.post("auth/login", data);
};

export const infosUser = () => {
  return apiClient.get("auth");
};
