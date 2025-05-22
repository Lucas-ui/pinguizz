import apiClient from "../api/axios";

export const generateQuiz = (data) => {
  return apiClient.get(`/party/${data}`);
};

export const submitQuiz = (data) => {
  console.log("submitQuiz", data);
  return apiClient.post("/party", data);
};
