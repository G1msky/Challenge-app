import { defineStore } from "pinia";
import { config } from "@/config";
import { useUserStore } from "@/stores/user";
import { useTasksStore } from "@/stores/tasks";

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

export const useChallengesStore = defineStore("challenges", {
  state: () => ({
    challenges: [], // for public challenges
    joinedChallenges: [], // for user joined challenges
    ownChallenges: [], // for user created challenges
    isLoading: false,
    error: null,
    searchQuery: "",
    searchDifficulty: "",
  }),

  actions: {
    async fetchChallenges() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/challenges/public`
        );
        if (!response.ok) {
          if (response.status === 404) {
            this.challenges = [];
            return;
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch challenges");
        }
        const data = await response.json();
        this.challenges = data;
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching challenges:", e);
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async createChallenge(challenge) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/challenges/create`,
          {
            method: "POST",
            body: JSON.stringify(challenge),
          }
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to create challenge");
        }
        const data = await response.json();
        await Promise.all([
          this.fetchChallenges(),
          this.fetchJoinedChallenges(),
          this.fetchOwnChallenges(),
        ]);
        return data;
      } catch (e) {
        this.error = e.message;
        console.error("Error creating challenge:", e);
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async joinChallenge(challengeId, invitationKey = null) {
      const userStore = useUserStore();
      const tasksStore = useTasksStore();
      this.isLoading = true;
      this.error = null;
      try {
        const url = invitationKey
          ? `${config.baseUrl}/challenges/join/${challengeId}/${invitationKey}`
          : `${config.baseUrl}/challenges/join/${challengeId}`;

        const response = await fetchWithHeaders(url, {
          method: "POST",
          body: JSON.stringify({
            challengeId,
            userId: userStore.user.id,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to join challenge");
        }
        await response.json();
        await Promise.all([
          this.fetchChallenges(),
          this.fetchJoinedChallenges(),
          this.fetchOwnChallenges(),
          tasksStore.fetchTasksByUser(),
          tasksStore.fetchTasksByUser(tasksStore.selectedDate),
        ]);
        return true;
      } catch (e) {
        this.error = e.message;
        console.error("Error joining challenge:", e);
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchJoinedChallenges() {
      const userStore = useUserStore();
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/challenges/joined-challenges/${userStore.user.id}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          if (response.status === 404) {
            this.joinedChallenges = [];
            return;
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || "Failed to fetch joined challenges"
          );
        }
        const data = await response.json();
        this.joinedChallenges = data;
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching joined challenges:", e);
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchOwnChallenges() {
      const userStore = useUserStore();
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/challenges/created-by-user/${userStore.user.id}`
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || "Failed to fetch own challenges"
          );
        }
        const data = await response.json();
        this.ownChallenges = data;
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching own challenges:", e);
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchChallengeById(challengeId) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/challenges/${challengeId}`
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch challenge");
        }
        const data = await response.json();
        return data;
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching challenge:", e);
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },
    setSearchDifficulty(difficulty) {
      this.searchDifficulty = difficulty;
    },
  },

  persist: {
    enabled: true,
    storage: localStorage,
  },
});
