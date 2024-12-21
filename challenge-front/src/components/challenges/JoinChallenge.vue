<template>
  <div>
    <template v-if="!isAuthenticated">
      <h1>Join Challenge</h1>
      <p>
        You are invited to join the challenge. Please create an account or login
        to continue.
      </p>
      <AuthView />
    </template>
    <template v-else>
      <h1>Join Challenge</h1>
      <p>
        Waiting for confirmation
        <span class="loading loading-ring loading-lg"></span>
      </p>
    </template>
  </div>
</template>

<script setup>
import AuthView from "@/components/auth/AuthView.vue";
import { useRouter } from "vue-router";
import { useUser } from "@/composables/user";
import { useChallenges } from "@/composables/challenges";

import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const { isAuthenticated } = useUser();
const { joinChallenge } = useChallenges();

onMounted(async () => {
  if (isAuthenticated.value) {
    console.log("User is authenticated, joining challenge...");
    await joinChallenge(route.params.challengeId, route.params.invitationKey);
    router.push(`/challenges/${route.params.challengeId}`);
  }
});
</script>

<style lang="scss" scoped></style>
