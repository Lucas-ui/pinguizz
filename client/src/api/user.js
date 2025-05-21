import apiClient from "../api/axios";

export const deleteUser = () => {
  return apiClient.delete("users");
};
