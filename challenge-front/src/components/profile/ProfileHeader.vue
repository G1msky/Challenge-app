<template>
  <div class="header">
    <div class="container mx-auto flex justify-between items-center">
      <button
        type="button"
        class="btn btn-outline btn-soft px-2"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="overlay-navigation-example"
        data-overlay="#overlay-navigation-example"
      >
        <span class="icon-[tabler--menu] size-7"></span>
      </button>

      <div v-if="showDates">
        {{ formatSiblingDate(selectedDate) }}
      </div>
      <button
        v-if="showSettings"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="overlay-settings-bottom"
        data-overlay="#overlay-settings-bottom"
      >
        <span class="icon-[tabler--settings] size-7"></span>
      </button>
      <!-- <label class="swap swap-rotate">
        <input
          hidden
          type="checkbox"
          v-model="theme"
          class="theme-controller"
        />
        <span class="swap-off icon-[tabler--sun] size-7"></span>
        <span class="swap-on icon-[tabler--moon] size-7"></span>
      </label> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, defineProps } from "vue";
import { useUserStore } from "@/stores/user";
import { useTasks } from "@/composables/tasks";
import { formatSiblingDate } from "@/utils/date";

const { selectedDate } = useTasks();
const userStore = useUserStore();

defineProps({
  showDates: {
    type: Boolean,
    default: false,
  },
  showSettings: {
    type: Boolean,
    default: false,
  },
});

const theme = ref(userStore.isDarkTheme);

watch(theme, (newValue) => {
  document.documentElement.setAttribute(
    "data-theme",
    newValue ? "dark" : "light"
  );
  userStore.setIsDarkTheme(newValue);
});

onMounted(() => {
  document.documentElement.setAttribute(
    "data-theme",
    theme.value ? "dark" : "light"
  );
});
</script>
