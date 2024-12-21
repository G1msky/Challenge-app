<template>
  <div class="h-full">
    <ProfileHeader />
    <ProfileSidebar />
    <div class="container mx-auto">
      <h1>Challenges you created</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <SearchBox @search="handleSearch" />
        <DifficultySearch
          @difficultySearch="handleDifficultySearch"
          @clear="clearSearchAndDifficulty"
        />
      </div>
      <OwnChallenges />
    </div>
  </div>
</template>

<script setup>
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import OwnChallenges from "@/components/challenges/OwnChallenges.vue";
import SearchBox from "@/components/challenges/SearchBox.vue";
import DifficultySearch from "@/components/challenges/DifficultySearch.vue";
import { useChallenges } from "@/composables/challenges";
import { onMounted } from "vue";

const { fetchOwnChallenges, searchQuery, searchDifficulty } = useChallenges();

const handleSearch = (query) => {
  searchQuery.value = query;
};

const handleDifficultySearch = (difficulty) => {
  searchDifficulty.value = difficulty;
};

const clearSearchAndDifficulty = () => {
  searchQuery.value = "";
  searchDifficulty.value = "";
};

onMounted(async () => {
  await fetchOwnChallenges();
});
</script>

<style lang="scss" scoped></style>
