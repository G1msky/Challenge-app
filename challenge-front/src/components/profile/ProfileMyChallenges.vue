<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title text-lg md:text-2xl">
        You're participating in {{ sortedJoinedChallenges.length }} challenges
      </h3>
    </div>
    <div class="card-body">
      <div class="card-content">
        <router-link
          class="grid grid-cols-12 gap-2 justify-between items-center mb-1 py-1 px-2 rounded-md hover:bg-base-content/5"
          v-for="challenge in sortedJoinedChallenges"
          :key="challenge.id"
          :to="`/challenges/${challenge.id}`"
        >
          <p class="text-sm md:text-base col-span-7">{{ challenge.title }}</p>
          <p
            class="text-sm col-span-5 ml-auto text-base-content/50 flex items-center gap-1 leading-none"
          >
            <span class="icon-[tabler--calendar]"></span>
            {{ startedDate(challenge) }} ago
          </p>
        </router-link>
      </div>
    </div>
    <div class="card-footer">
      <div class="flex flex-col md:flex-row gap-2">
        <router-link to="/challenges/joined" class="btn btn-primary btn-soft">
          View all challenges
        </router-link>
        <router-link to="/challenges/public" class="btn btn-primary">
          Explore challenges
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChallenges } from "@/composables/challenges";
import { formatDistanceToNow } from "date-fns";

const { sortedJoinedChallenges } = useChallenges();

const startedDate = (challenge) => {
  return formatDistanceToNow(new Date(challenge.participants[0]?.start_date));
};
</script>

<style lang="scss" scoped></style>
