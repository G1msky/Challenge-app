import { defineStore } from "pinia";
import { config } from "@/config";
import { useUserStore } from "@/stores/user";

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

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    selectedDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    showCompleted: false,
    isLoading: false,
    error: null,
  }),
  getters: {
    selectedDateTasks: (state) => {
      const selectedDay = state.selectedDate;
      return state.tasks.filter(
        (task) => task.date.split("T")[0] === selectedDay
      );
    },
    todayTasks: (state) => {
      const today = new Date().toLocaleDateString("en-CA");
      return state.tasks.filter((task) => task.date.split("T")[0] === today);
    },
  },
  actions: {
    setSelectedDate(date) {
      this.selectedDate = date;
    },
    async fetchTasksByUser(date) {
      const userStore = useUserStore();
      this.isLoading = true;
      this.error = null;
      date = date ? date : new Date().toLocaleDateString("en-CA");
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/tasks/user/${userStore.user.id}?date=${date}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            this.tasks = this.tasks.filter(
              (task) => task.date.split("T")[0] !== date
            );
            return;
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch tasks");
        }
        const data = await response.json();
        this.tasks = [
          ...this.tasks.filter((task) => task.date.split("T")[0] !== date),
          ...data,
        ];
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching tasks:", e);
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async completeTask(completionId, completed = true) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWithHeaders(
          `${config.baseUrl}/tasks/${completionId}/complete`,
          {
            method: "POST",
            body: JSON.stringify({
              completed,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to complete task");
        }
        await this.fetchTasksByUser();
      } catch (e) {
        this.error = e.message;
        console.error("Error completing task:", e);
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
  },
  persist: {
    enabled: true,
    storage: localStorage,
  },
});
