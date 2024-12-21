<template>
  <div class="header">
    <div class="container mx-auto">
      <label class="swap swap-rotate py-4">
        <input
          hidden
          type="checkbox"
          v-model="theme"
          class="theme-controller"
        />
        <span class="swap-off icon-[tabler--sun] size-7"></span>
        <span class="swap-on icon-[tabler--moon] size-7"></span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

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
