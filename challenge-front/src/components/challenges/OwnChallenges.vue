<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <ChallengeItem
      v-for="challenge in sortedOwnChallenges"
      :key="challenge.id"
      :challenge="challenge"
      :is-participant="isParticipant(challenge)"
    />
  </div>
</template>

<script setup>
import { useChallenges } from "@/composables/challenges";
import ChallengeItem from "./ChallengeItem.vue";

const { sortedOwnChallenges, isParticipant } = useChallenges();
</script>
