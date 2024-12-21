<template>
  <div class="h-full">
    <ProfileHeader />
    <ProfileSidebar />
    <h1>Create a challenge</h1>
    <CreateChallenge />
  </div>
</template>

<script setup>
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import CreateChallenge from "@/components/challenges/CreateChallenge";
</script>

<style lang="scss" scoped></style>
