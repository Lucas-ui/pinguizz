import apiClient from "../api/axios";

export const deleteUser = () => {
  return apiClient.delete("users");
};

export const editPassword = () => {
  return apiClient.post("users/password");
};
