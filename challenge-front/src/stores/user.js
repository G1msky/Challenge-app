// src/stores/auth.js
import { defineStore } from "pinia";
import { config } from "@/config";
import router from "@/router";
import { useTasksStore } from "@/stores/tasks";
import { useChallengesStore } from "@/stores/challenges";

const defaultHeaders = {
  "Content-Type": "application/json",
};
async function fetchWithHeaders(url, options = {}) {
  options.headers = {
    ...defaultHeaders,
    ...options.headers,
  };
  return fetch(url, options);
}
export const useUserStore = defineStore("user", {
  state: () => ({
    accessToken: null,
    user: null,
    darkTheme: true,
  }),
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => !!state.accessToken,
    getToken: (state) => state.accessToken,
    isDarkTheme: (state) => state.darkTheme,
  },
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },

    setIsDarkTheme(value) {
      this.darkTheme = value;
    },
    async register({ username, email, password }) {
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/users/register`,
          {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          return errorData || "Ошибка входа";
        }

        const data = await response.json();
        this.setAccessToken(data.token);
        try {
          await this.fetchUser();
          if (router.currentRoute.value.path.includes("/join")) {
            const { challengeId, invitationKey } =
              router.currentRoute.value.params;
            try {
              const challengeResponse =
                await useChallengesStore().joinChallenge(
                  challengeId,
                  invitationKey
                );

              console.log("challengeResponse", challengeResponse);
              if (challengeResponse) {
                router.push(`/challenges/${challengeId}`);
              } else {
                console.error(
                  "Challenge response is undefined or unsuccessful"
                );
              }
            } catch (error) {
              console.error("Error joining challenge:", error);
            }
          } else {
            router.push("/challenges");
          }
        } catch (error) {
          console.error("Error fetching user after registration:", error);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },

    async login({ email, password }) {
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/users/login`,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          return errorData || "Ошибка входа";
        }

        const data = await response.json();
        this.setAccessToken(data.access_token);
        try {
          await this.fetchUser();
          if (router.currentRoute.value.path.includes("/join")) {
            const { challengeId, invitationKey } =
              router.currentRoute.value.params;
            try {
              const challengeResponse =
                await useChallengesStore().joinChallenge(
                  challengeId,
                  invitationKey
                );
              if (challengeResponse) {
                router.push(`/challenges/${challengeId}`);
              } else {
                console.error(
                  "Challenge response is undefined or unsuccessful"
                );
              }
            } catch (error) {
              console.error("Error joining challenge:", error);
            }
          } else {
            router.push("/challenges");
          }
        } catch (error) {
          console.error("Error fetching user after login:", error);
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },

    async fetchUser() {
      if (!this.isAuthenticated) return;
      try {
        const email = "test@gmail.com";
        const response = await fetchWithHeaders(`${config.baseUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Ошибка входа");
        }

        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    logout() {
      this.accessToken = null;
      this.user = null;
      useTasksStore().tasks = [];
      useTasksStore().selectedDate = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];
      useChallengesStore().challenges = [];
      useChallengesStore().myChallenges = [];
      useChallengesStore().joinedChallenges = [];
      useChallengesStore().ownChallenges = [];
      router.push("/");
    },
  },
  persist: {
    enabled: true,
    storage: localStorage,
  },
});
