import apiClient from "../api/axios";

export const deleteUser = () => {
  return apiClient.delete("users");
};

export const editPassword = (data) => {
  return apiClient.put("users/password", data);
};

export const editName = (data) => {
  return apiClient.put("users/name", data);
};

export const editFirstname = (data) => {
  return apiClient.put("users/firstname", data);
};

export const editUsername = (data) => {
  return apiClient.put("users/username", data);
};

export const allUsers = () => {
  return apiClient.get("users/all");
};
