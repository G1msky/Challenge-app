<template>
  <button
    type="button"
    class="card relative overflow-hidden"
    :class="[
      task.completed ? 'opacity-50' : '',
      task.completionId === activeTask?.completionId ? 'no-transition' : '',
    ]"
    :style="getTaskStyle(task)"
    @touchstart="handleTouchStart($event)"
    @touchmove="handleTouchMove($event)"
    @touchend="handleTouchEnd"
    @click="$emit('click', task)"
    aria-haspopup="dialog"
    aria-expanded="false"
    :aria-controls="drawerId"
    :data-overlay="`#${drawerId}`"
  >
    <div class="card-body flex items-start flex-col gap-2 w-full">
      <p class="card-text" :class="task.completed ? 'line-through' : ''">
        {{ task.taskTitle }}
      </p>
      <p class="text-[12px]">{{ task.taskDescription }}</p>
    </div>
  </button>
</template>

<script setup>
import { ref, defineProps, defineExpose, defineEmits } from "vue";
import { useTasks } from "@/composables/tasks";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  drawerId: {
    type: String,
    required: true,
  },
});

defineEmits(["click"]);

const { setCompleteTask } = useTasks();
const isSwipping = ref(false);
const activeTask = ref(null);
const touchStart = ref(null);
const currentOffset = ref(0);
const THRESHOLD = 90;

const handleTouchStart = (event) => {
  touchStart.value = event.touches[0].clientX;
  activeTask.value = props.task;
  isSwipping.value = true;
};

const handleTouchMove = (event) => {
  if (!activeTask.value) return;

  const currentTouch = event.touches[0].clientX;
  const diff = currentTouch - touchStart.value;
  const maxOffset = 200;

  if (!props.task.completed && diff < 0) {
    currentOffset.value = Math.max(diff, -maxOffset);
  } else if (props.task.completed && diff > 0) {
    currentOffset.value = Math.min(diff, maxOffset);
  }
};

const handleTouchEnd = () => {
  if (!activeTask.value) return;

  const absOffset = Math.abs(currentOffset.value);

  if (absOffset > THRESHOLD) {
    if (currentOffset.value < 0 && !props.task.completed) {
      if (
        props.task?.date.split("T")[0] <= new Date().toLocaleDateString("en-CA")
      ) {
        setCompleteTask(props.task.completionId);
      }
      currentOffset.value = 0;
    } else if (currentOffset.value > 0 && props.task.completed) {
      if (
        props.task?.date.split("T")[0] <= new Date().toLocaleDateString("en-CA")
      ) {
        setCompleteTask(props.task.completionId, false);
      }
      currentOffset.value = 0;
    }
  } else {
    currentOffset.value = 0;
  }

  activeTask.value = null;
  setTimeout(() => {
    isSwipping.value = false;
  }, 100);
};

const getTaskStyle = (task) => {
  if (task.completionId !== activeTask.value?.completionId) return {};
  return {
    transform: `translateX(${currentOffset.value}px)`,
  };
};

defineExpose({ isSwipping });
</script>

<style lang="scss" scoped>
.card {
  transition: transform 0.3s ease;
  touch-action: pan-y pinch-zoom;

  &.no-transition {
    transition: none;
  }
}
</style>
