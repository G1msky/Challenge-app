import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

export function useUser() {
  const store = useUserStore();
  const { user, accessToken, darkTheme } = storeToRefs(store);

  // Computed properties
  const isAuthenticated = computed(() => !!accessToken.value);

  const userProfile = computed(() => {
    if (!user.value) return null;
    return {
      ...user.value,
      fullName: `${user.value.firstName || ""} ${
        user.value.lastName || ""
      }`.trim(),
      initials: `${(user.value.firstName?.[0] || "").toUpperCase()}${(
        user.value.lastName?.[0] || ""
      ).toUpperCase()}`,
    };
  });

  // Authentication methods
  const login = async (credentials) => {
    try {
      const error = await store.login(credentials);
      if (error) {
        throw new Error(error.message || "Failed to login");
      }
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const error = await store.register(userData);
      if (error) {
        throw new Error(error.message || "Failed to register");
      }
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    store.logout();
  };

  // Theme methods
  const toggleTheme = () => {
    store.setIsDarkTheme(!darkTheme.value);
  };

  const getAvatarUrl = (id) => {
    return `https://api.dicebear.com/9.x/thumbs/svg?seed=${id}`;
  };

  return {
    // State
    user,
    darkTheme,

    // Computed
    isAuthenticated,
    userProfile,

    // Methods
    login,
    register,
    logout,
    toggleTheme,
    getAvatarUrl,
    // Store methods
    fetchUser: store.fetchUser,
  };
}
