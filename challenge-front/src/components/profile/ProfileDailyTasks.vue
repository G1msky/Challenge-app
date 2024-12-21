<template>
  <div>
    <h2 class="text-2xl font-bold">Your today's tasks</h2>

    <div
      v-if="
        (showCompleted ? sortedTodayTasks : sortedTodayUncompletedTasks)
          ?.length > 0
      "
    >
      <TransitionGroup
        name="task-list"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
      >
        <TaskCard
          v-for="task in showCompleted
            ? sortedTodayTasks
            : sortedTodayUncompletedTasks"
          :key="task.completionId"
          :task="task"
          drawer-id="task-drawer-daily"
          @click="openDrawer"
          ref="taskCards"
        />
      </TransitionGroup>
    </div>

    <TaskDrawer
      v-show="selectedTask"
      :task="selectedTask"
      id="task-drawer-daily"
      @close="closeDrawer"
      @task-updated="updateSelectedTask"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTasks } from "@/composables/tasks";
import TaskDrawer from "@/components/tasks/TaskDrawer.vue";
import TaskCard from "@/components/tasks/TasksCard.vue";

const { sortedTodayUncompletedTasks, sortedTodayTasks, showCompleted } =
  useTasks();

const selectedTask = ref(null);
const taskCards = ref([]);

const openDrawer = (task) => {
  const taskCard = taskCards.value.find((card) => card.task === task);
  if (!taskCard?.isSwipping) {
    selectedTask.value = task;
  }
};

const closeDrawer = () => {
  selectedTask.value = null;
};

const updateSelectedTask = async () => {
  const updatedTask = sortedTodayTasks.value.find(
    (t) => t.completionId === selectedTask.value.completionId
  );
  selectedTask.value = updatedTask;
};
</script>

<style lang="scss" scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(-400px);
  max-height: 0;
  margin: 0;
  padding: 0;
}

.task-list-move {
  transition: transform 0.3s ease;
}

.grid {
  transition: gap 0.3s ease;
}
</style>
