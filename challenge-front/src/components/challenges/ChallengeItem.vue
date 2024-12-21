<template>
  <div class="card">
    <div class="card-body flex flex-col justify-between">
      <div
        class="flex-col flex xl:flex-row gap-2 xl:items-start justify-between"
      >
        <h5 class="card-title">{{ challenge.title }}</h5>

        <div class="flex items-center gap-2 pt-[5px]">
          <div
            class="badge badge-soft badge-primary rounded-full"
            v-if="challenge.Category"
          >
            {{ challenge.Category?.name }}
          </div>
          <div
            class="badge badge-outline min-w-[80px]"
            :class="
              challenge.difficulty === 'Easy'
                ? 'badge-success'
                : challenge.difficulty === 'Medium'
                ? 'badge-accent'
                : 'badge-error'
            "
          >
            {{ challenge.difficulty }}
          </div>

          <div
            v-if="challenge.visibility === 'Private'"
            class="badge badge-outline min-w-[20px] badge-neutral"
          >
            <span class="icon-[tabler--lock]"></span>
          </div>
        </div>
      </div>

      <p class="text-sm mt-4">{{ challenge.description }}</p>

      <div class="flex items-center gap-2 mt-2">
        <span class="icon-[tabler--calendar-clock] mb-[2px]"></span>
        <p class="text-sm">{{ challenge.duration }} days</p>
      </div>

      <div class="progress-container">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <p
          class="text-center pt-2 text-sm flex items-center justify-center gap-1"
        >
          <span class="icon-[tabler--users]"></span>
          {{ challenge.participants.length || 0 }} /
          <template v-if="challenge.participants_limit">
            {{ challenge.participants_limit }}
          </template>
          <template v-else>
            <span class="icon-[tabler--infinity]"></span>
          </template>
        </p>
      </div>

      <div class="card-actions grid grid-cols-2 gap-2 mt-5">
        <router-link :to="`/challenges/${challenge.id}`" class="btn btn-outline"
          >View</router-link
        >
        <template v-if="challenge.participants_limit !== null">
          <button
            v-if="
              !isParticipant &&
              challenge.participants.length < challenge.participants_limit
            "
            class="btn btn-primary"
            @click="joinChallengeHandler"
          >
            Join
          </button>

          <button v-else-if="isParticipant" class="btn btn-secondary" disabled>
            You are participant
          </button>
          <button v-else class="btn btn-secondary" disabled>Full</button>
        </template>

        <template v-else>
          <button
            v-if="!isParticipant"
            class="btn btn-primary"
            @click="joinChallengeHandler"
          >
            Join
          </button>
          <button v-else class="btn btn-secondary" disabled>
            You are participant
          </button>
        </template>
      </div>
    </div>

    <button
      v-if="challenge.visibility === 'Private'"
      type="button"
      class="hidden"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="middle-center-modal-{{ challenge.id }}"
      :data-overlay="'#middle-center-modal-' + challenge.id"
      ref="openInvitationKeyModal"
    >
      <span class="icon-[tabler--pencil]"></span>
    </button>

    <InvitationKeyModal
      :challenge="challenge"
      @joinWithInvitationKey="joinWithInvitationKeyHandler"
      :modal-id="'middle-center-modal-' + challenge.id"
    />
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useChallenges } from "@/composables/challenges";

import InvitationKeyModal from "@/components/challenges/InvitationKeyModal.vue";
const router = useRouter();
const { joinChallenge } = useChallenges();

const props = defineProps({
  challenge: {
    type: Object,
    required: true,
  },
  isParticipant: {
    type: Boolean,
    default: false,
  },
});

const openInvitationKeyModal = ref(null);

const progressPercentage = computed(() => {
  return (
    (props.challenge.participants.length /
      (props.challenge.participants_limit ||
        props.challenge.participants.length * 2)) *
    100
  );
});

const joinChallengeHandler = async () => {
  if (props.challenge.visibility === "Private") {
    openInvitationKeyModal.value.click();
  } else {
    // TODO: add loading state and error handling
    await joinChallenge(props.challenge.id);
    router.push(`/challenges/${props.challenge.id}`);
  }
};

const joinWithInvitationKeyHandler = async (invitationKey) => {
  await joinChallenge(props.challenge.id, invitationKey);
  router.push(`/challenges/${props.challenge.id}`);
};
</script>

<style lang="scss" scoped>
.progress-container {
  @apply mt-4;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #edf2f7;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background-color: #4299e1;
  transition: width 0.3s ease;
  left: 0;
  position: absolute;
}
</style>
