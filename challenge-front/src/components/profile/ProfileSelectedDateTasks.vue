<template>
  <div class="py-8">
    <div
      v-if="
        (showCompleted
          ? sortedSelectedDateTasks
          : sortedUncompletedSelectedDateTasks
        )?.length > 0
      "
    >
      <TransitionGroup
        name="task-list"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
      >
        <TaskCard
          v-for="task in showCompleted
            ? sortedSelectedDateTasks
            : sortedUncompletedSelectedDateTasks"
          :key="task.completionId"
          :task="task"
          drawer-id="task-drawer-selected"
          @click="openDrawer"
        />
      </TransitionGroup>
    </div>

    <TaskDrawer
      :task="selectedTask"
      id="task-drawer-selected"
      @close="closeDrawer"
      @task-updated="updateSelectedTask"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useTasks } from "@/composables/tasks";
import TaskDrawer from "@/components/tasks/TaskDrawer.vue";
import TaskCard from "@/components/tasks/TasksCard.vue";

const {
  selectedDate,
  sortedSelectedDateTasks,
  sortedUncompletedSelectedDateTasks,
  showCompleted,
} = useTasks();
const selectedTask = ref(null);

const openDrawer = (task) => {
  selectedTask.value = task;
};

const closeDrawer = () => {
  selectedTask.value = null;
};

watch(selectedDate, () => {
  nextTick(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  });
});
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
