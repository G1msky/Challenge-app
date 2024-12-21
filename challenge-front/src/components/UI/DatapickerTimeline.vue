<template>
  <div class="w-screen overflow-hidden sticky top-[70px] z-10">
    <div class="relative w-full bg-gray-100 py-2 rounded-lg">
      <div
        class="flex items-center gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        ref="timeline"
      >
        <div
          v-for="(day, index) in days"
          :key="index"
          :class="[
            'flex-shrink-0 cursor-pointer text-center w-10 h-10 flex items-center justify-center rounded-lg border',
            selectedDay === day.date
              ? 'bg-blue-500 text-white'
              : 'bg-white  hover:bg-gray-200',
            day.date === today ? 'border-blue-500' : '',
          ]"
          @click="handleDayClick(day.date, index)"
        >
          <div class="flex flex-col items-center leading-[1.2em] text-sm">
            <span
              :class="selectedDay === day.date ? 'text-white' : 'text-gray-500'"
              >{{ day.weekday }}</span
            >
            <span>{{ day.day }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useTasks } from "@/composables/tasks";

const { selectedDate, changeSelectedDate } = useTasks();

const props = defineProps({
  pastRange: {
    type: Number,
    default: 7,
  },
  futureRange: {
    type: Number,
    default: 30,
  },
});

const days = ref([]);
const selectedDay = ref(selectedDate.value);
const timeline = ref(null);
const today = new Date().toISOString().split("T")[0];

const generateDays = (past, future) => {
  const today = new Date();
  const result = [];

  for (let i = -past; i <= future; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    result.push({
      date: date.toISOString().split("T")[0],
      day: date.getDate(),
      weekday: date.toLocaleDateString("ru-RU", { weekday: "short" }),
    });
  }

  return result;
};

onMounted(() => {
  days.value = generateDays(props.pastRange, props.futureRange);

  setTimeout(() => {
    scrollToDate(selectedDay.value);
  }, 200);
});

const selectDay = (day) => {
  selectedDay.value = day;
  changeSelectedDate(day);
  scrollPageToTop();
};

const scrollToDate = (date) => {
  const index = days.value.findIndex((d) => d.date === date);

  if (timeline.value && index !== -1) {
    const childElement = timeline.value.children[index];
    const containerWidth = timeline.value.clientWidth;
    const offsetLeft = childElement?.offsetLeft + childElement?.offsetWidth / 2;

    timeline.value.scrollTo({
      left: offsetLeft - containerWidth / 2,
      behavior: "smooth",
    });
  }
};

const handleDayClick = (date) => {
  selectDay(date);
  scrollToDate(date);
};

const scrollPageToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  height: 8px;
  display: none;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background-color: #edf2f7;
}
</style>
