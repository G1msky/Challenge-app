<template>
  <div class="relative">
    <span
      class="icon-[tabler--search] text-base-content/90 absolute start-3 top-1/2 size-4 flex-shrink-0 -translate-y-1/2"
    ></span>
    <input
      type="text"
      v-model="searchQuery"
      @input="handleInput"
      class="input ps-8 pe-12"
      aria-label="input"
    />
    <button
      v-if="searchQuery"
      class="absolute end-3 top-1/2 size-4 flex-shrink-0 -translate-y-1/2 cursor-pointer"
      @click="clearSearch"
    >
      <span class="icon-[tabler--backspace]"></span>
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useChallenges } from "@/composables/challenges";

const { searchQuery } = useChallenges();
const emit = defineEmits(["search"]);

const handleInput = () => {
  emit("search", searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = "";
  emit("search", "");
};
</script>

<style lang="scss" scoped></style>
