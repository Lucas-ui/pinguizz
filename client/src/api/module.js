import apiClient from "../api/axios";

export const allModulesByThemes = (themeName) => {
  return apiClient.get(`/module/${themeName}`);
};
