<template>
  <div>
    <ProfileHeader :show-dates="true" :show-settings="true" />
    <SettingsDrawer />
    <ProfileSidebar />
    <DatapickerTimeline />
    <TodayView />
  </div>
</template>

<script setup>
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import DatapickerTimeline from "@/components/UI/DatapickerTimeline.vue";
import SettingsDrawer from "@/components/profile/SettingsDrawer.vue";
import TodayView from "@/components/today/TodayView.vue";
</script>

<style lang="scss" scoped></style>
