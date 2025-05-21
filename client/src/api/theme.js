import apiClient from "../api/axios";

export const allThemes = () => {
  return apiClient.get("theme");
};
