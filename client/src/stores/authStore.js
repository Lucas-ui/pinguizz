import { defineStore } from "pinia";
import { ref } from "vue";
import { infosUser } from "../api/auth";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref(null);

  function setAuthenticated(status) {
    isAuthenticated.value = status;
  }

  function setUser(userData) {
    user.value = userData;
  }

  function logout() {
    localStorage.clear();
    user.value = null;
  }

  async function checkAuth() {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await infosUser();
        setAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        setAuthenticated(false);
        setUser(null);
        localStorage.removeItem("authToken");
      }
    } else {
      setAuthenticated(false);
      setUser(null);
    }
  }

  return {
    isAuthenticated,
    user,
    setAuthenticated,
    setUser,
    logout,
    checkAuth,
  };
});
