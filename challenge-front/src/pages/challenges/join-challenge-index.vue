<template>
  <div class="h-full">
    <ProfileHeader />
    <ProfileSidebar />
    <JoinChallenge />
  </div>
</template>

<script setup>
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import JoinChallenge from "@/components/challenges/JoinChallenge.vue";
</script>

<style lang="scss" scoped></style>
