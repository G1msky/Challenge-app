<template>
  <div class="relative flex gap-2">
    <button
      class="btn btn-neutral"
      :class="{ 'btn-active': searchDifficulty === '' }"
      @click="handleDifficultySearch('')"
    >
      All
    </button>
    <button
      class="btn btn-success"
      :class="{ 'btn-active': searchDifficulty === 'easy' }"
      @click="handleDifficultySearch('easy')"
    >
      Easy
    </button>
    <button
      class="btn btn-accent"
      :class="{ 'btn-active': searchDifficulty === 'medium' }"
      @click="handleDifficultySearch('medium')"
    >
      Medium
    </button>
    <button
      class="btn btn-error"
      :class="{ 'btn-active': searchDifficulty === 'hard' }"
      @click="handleDifficultySearch('hard')"
    >
      Hard
    </button>

    <!-- Clear -->
    <button
      v-if="searchDifficulty"
      class="btn btn-ghost"
      @click="handleDifficultySearch('')"
    >
      <span class="icon-[tabler--x]"></span>
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useChallenges } from "@/composables/challenges";

const { searchDifficulty } = useChallenges();
const emit = defineEmits(["difficultySearch"]);

const handleDifficultySearch = (difficulty) => {
  emit("difficultySearch", difficulty);
};
</script>

<style lang="scss" scoped></style>
