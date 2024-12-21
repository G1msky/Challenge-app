<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-12 gap-4 py-4">
      <div class="col-span-12 md:col-span-4">
        <HelloUser />
      </div>
      <div class="col-span-12 md:col-span-8">
        <ProfileMyChallenges />
      </div>
    </div>
  </div>
</template>

<script setup>
import HelloUser from "@/components/user/HelloUser.vue";
import ProfileMyChallenges from "@/components/profile/ProfileMyChallenges.vue";
</script>
