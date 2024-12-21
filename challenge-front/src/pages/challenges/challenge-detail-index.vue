<template>
  <div class="h-full">
    <ProfileHeader />
    <ProfileSidebar />
    <ChallengeDetail />
  </div>
</template>

<script setup>
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ChallengeDetail from "@/components/challenges/ChallengeDetail.vue";
</script>

<style lang="scss" scoped></style>
