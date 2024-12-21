<template>
  <div class="h-full">
    <ProfileHeader />
    <ProfileSidebar />

    <div class="container mx-auto">
      <h1>Public challenges</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <SearchBox @search="handleSearch" />
        <DifficultySearch
          @difficultySearch="handleDifficultySearch"
          @clear="clearSearchAndDifficulty"
        />
      </div>
      <PublicChallenges />
    </div>
  </div>
</template>

<script setup>
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import PublicChallenges from "@/components/challenges/PublicChallenges.vue";
import SearchBox from "@/components/challenges/SearchBox.vue";
import DifficultySearch from "@/components/challenges/DifficultySearch.vue";
import { useChallenges } from "@/composables/challenges";
import { onMounted } from "vue";

const { fetchChallenges, setSearchQuery, setSearchDifficulty } =
  useChallenges();

const handleSearch = (query) => {
  setSearchQuery(query);
};

const handleDifficultySearch = (query) => {
  setSearchDifficulty(query);
};

onMounted(async () => {
  await fetchChallenges();
});
</script>

<style lang="scss" scoped></style>
