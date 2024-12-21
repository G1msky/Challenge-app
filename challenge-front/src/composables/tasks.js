import { onMounted, computed, watch, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useTasksStore } from "@/stores/tasks";
import { useUserStore } from "@/stores/user";
export function useTasks() {
  const tasksStore = useTasksStore();
  const userStore = useUserStore();
  const { tasks, isLoading, error, selectedDate, showCompleted } =
    storeToRefs(tasksStore);

  const selectedDateTasks = computed(() => tasksStore.selectedDateTasks);
  const todayTasks = computed(() => tasksStore.todayTasks);

  const changeSelectedDate = (date) => {
    tasksStore.setSelectedDate(date);
    fetchTasksByUser(date);
  };

  const fetchTasksByUser = async (date) => {
    try {
      await tasksStore.fetchTasksByUser(date);
    } catch (e) {
      console.error("Error fetching tasks:", e);
    }
  };

  const formattedTodayTasks = computed(() => {
    return todayTasks.value.map((task) => ({
      ...task,
    }));
  });

  const sortedTodayTasks = computed(() => {
    return [...formattedTodayTasks.value].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  });

  const sortedTodayUncompletedTasks = computed(() => {
    return [...sortedTodayTasks.value].filter((task) => !task.completed);
  });

  const formattedSelectedDateTasks = computed(() => {
    return selectedDateTasks.value.map((task) => ({
      ...task,
    }));
  });

  const sortedSelectedDateTasks = computed(() => {
    return [...formattedSelectedDateTasks.value].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  });

  const sortedUncompletedSelectedDateTasks = computed(() => {
    return [...sortedSelectedDateTasks.value].filter((task) => !task.completed);
  });

  const setCompleteTask = async (completionId, completed = true) => {
    try {
      await tasksStore.completeTask(completionId, completed);
      await fetchTasksByUser(selectedDate.value);
    } catch (e) {
      console.error("Error completing task:", e);
    }
  };

  onMounted(async () => {
    if (
      userStore.isAuthenticated &&
      (tasks.value.length === 0 || selectedDateTasks.value.length === 0)
    ) {
      await fetchTasksByUser(); // fetch tasks for today
      await fetchTasksByUser(selectedDate.value); // fetch tasks for selected date
    }
  });

  watch(showCompleted, () => {
    nextTick(() => {
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 100);
    });
  });

  return {
    isLoading,
    error,
    fetchTasksByUser,
    sortedTodayTasks,
    sortedTodayUncompletedTasks,
    sortedSelectedDateTasks,
    sortedUncompletedSelectedDateTasks,
    selectedDate,
    showCompleted,
    changeSelectedDate,
    setCompleteTask,
  };
}
