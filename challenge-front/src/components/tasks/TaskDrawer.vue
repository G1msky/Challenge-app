<template>
  <div
    :id="id"
    class="overlay drawer overlay-open:translate-y-0 drawer-bottom hidden"
    role="dialog"
    tabindex="-1"
  >
    <div class="drawer-header">
      <h3 class="drawer-title">{{ task?.task }}</h3>
      <button
        type="button"
        class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
        aria-label="Close"
        :data-overlay="`#${id}`"
      >
        <span class="icon-[tabler--x] size-5"></span>
      </button>
    </div>
    <div class="drawer-body">
      <p class="text-lg font-bold">{{ task?.taskTitle }}</p>
      <router-link
        class="text-base text-gray-500"
        :to="`/challenges/${task?.challengeId}`"
        >{{ task?.challengeTitle }}</router-link
      >
      <p>{{ task?.taskDescription }}</p>
    </div>
    <div class="drawer-footer">
      <button
        v-if="
          task?.date.split('T')[0] <= new Date().toLocaleDateString('en-CA') &&
          !task?.completed
        "
        @click="handleComplete(task?.completionId, task?.date)"
        type="button"
        class="btn btn-primary"
      >
        Complete
      </button>
      <button
        v-else-if="task?.completed"
        @click="handleNotComplete(task?.completionId, task?.date)"
        type="button"
        class="btn btn-primary"
      >
        Not completed
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useTasks } from "@/composables/tasks";

const { setCompleteTask } = useTasks();

const emit = defineEmits(["taskUpdated"]);

defineProps({
  id: {
    type: String,
    default: "",
  },
  task: {
    type: Object,
    default: null,
  },
});

const handleComplete = async (completionId) => {
  await setCompleteTask(completionId);
  emit("taskUpdated");
};

const handleNotComplete = async (completionId) => {
  await setCompleteTask(completionId, false);
  emit("taskUpdated");
};
</script>
