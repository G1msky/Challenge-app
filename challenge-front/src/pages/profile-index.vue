<template>
  <div>
    <ProfileHeader />
    <SettingsDrawer />
    <ProfileSidebar />
    <ProfileView />
  </div>
</template>

<script setup>
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileView from "@/components/profile/ProfileView.vue";
import SettingsDrawer from "@/components/profile/SettingsDrawer.vue";
</script>

<style lang="scss" scoped></style>
