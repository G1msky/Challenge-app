<template>
  <div class="h-full">
    <ProfileHeader />
    <ProfileSidebar />
    <div class="container mx-auto">
      <h1>Joined challenges</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <SearchBox @search="handleSearch" />
        <DifficultySearch
          @difficultySearch="handleDifficultySearch"
          @clear="clearSearchAndDifficulty"
        />
      </div>
      <JoinedChallenges />
    </div>
  </div>
</template>

<script setup>
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import JoinedChallenges from "@/components/challenges/JoinedChallenges.vue";
import { useChallenges } from "@/composables/challenges";
import SearchBox from "@/components/challenges/SearchBox.vue";
import DifficultySearch from "@/components/challenges/DifficultySearch.vue";
import { onMounted } from "vue";

const { fetchJoinedChallenges, setSearchQuery, setSearchDifficulty } =
  useChallenges();

const handleSearch = (query) => {
  setSearchQuery(query);
};

const handleDifficultySearch = (query) => {
  setSearchDifficulty(query);
};

onMounted(async () => {
  await fetchJoinedChallenges();
});
</script>

<style lang="scss" scoped></style>
