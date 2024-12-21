<template>
  <div
    class="flex flex-col gap-4 max-w-[780px] mx-auto"
    v-if="challenge && challenge.id"
  >
    <div class="flex justify-between items-center flex-wrap gap-2">
      <h1 class="text-xl font-bold">Challenge "{{ challenge?.title }}"</h1>
    </div>
    <div class="flex gap-4 flex-wrap">
      <div
        class="badge badge-soft badge-primary rounded-full"
        v-if="challenge?.Category"
      >
        {{ challenge?.Category?.name }}
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
        {{ challenge?.difficulty }}
      </div>
      <div class="badge badge-primary">
        <span class="icon-[tabler--users]"></span>
        {{ challenge?.participants?.length }} participants
      </div>
      <div class="badge badge-secondary">
        <span class="icon-[tabler--clipboard-list]"></span>
        {{ challenge?.DailyTasks?.length }} tasks
      </div>
      <div class="badge badge-accent">
        <span class="icon-[tabler--calendar-clock]"></span>
        {{ challenge?.duration }} days
      </div>
      <div
        v-if="challenge.visibility === 'Private'"
        class="badge badge-outline badge-neutral"
      >
        <span class="icon-[tabler--lock]"></span>
        Private
      </div>
    </div>

    <h2>Challenge Details</h2>
    <div
      class="border border-gray-200 rounded-md p-4 flex flex-col gap-2 w-full"
    >
      <p class="text-sm text-gray-500 flex items-center gap-2">
        <span class="icon-[tabler--calendar-clock]"></span>
        {{ challenge?.duration }} days
      </p>
      <p class="text-sm text-gray-500 flex items-center gap-2">
        <span class="icon-[tabler--clipboard-list]"></span>
        {{ challenge?.description }}
      </p>
      <p class="text-sm text-gray-500 flex items-center gap-2">
        <span class="icon-[tabler--alert-hexagon]"></span>
        {{ challenge?.rules }}
      </p>
    </div>

    <!-- foreach task -->
    <div>
      <h3>Daily Tasks:</h3>
      <router-link
        v-for="task in challenge?.DailyTasks"
        :key="task.id"
        class="border rounded-md p-4 flex flex-col gap-2 mt-3 w-full"
        :to="`/profile`"
      >
        <h4 class="text-lg font-bold">{{ task.title }}</h4>
        <p>{{ task.description }}</p>
      </router-link>
    </div>

    <!-- foreach participant -->
    <div>
      <h3>Participants ({{ challenge?.participants?.length }}):</h3>
      <div class="w-full mt-3">
        <ul
          class="border-base-content/25 divide-base-content/25 :last*:rounded-b-md divide-y rounded-md border *:p-3 first:*:rounded-t-md"
        >
          <li
            v-for="participant in challenge?.participants"
            :key="participant.id"
            class="flex items-start sm:items-center"
            :class="
              participant.User?.id === userProfile?.id
                ? 'badge-primary badge-soft'
                : ''
            "
          >
            <img
              :src="getAvatarUrl(participant.userId)"
              alt="User Image"
              class="w-13 me-3 rounded-full"
            />
            <div
              class="flex grow flex-col items-start justify-between sm:flex-row"
            >
              <div class="user-info">
                <h6 class="text-base text-base-content/90">
                  {{ participant.User?.username }}
                </h6>
                <small class="text-base-content/50 text-sm">
                  {{ formatDistanceToNow(new Date(participant.createdAt)) }}
                </small>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <h2>Author</h2>
    <div class="flex items-center gap-2">
      <div class="w-full">
        <ul
          class="border-base-content/25 divide-base-content/25 :last*:rounded-b-md divide-y rounded-md border *:p-3 first:*:rounded-t-md"
        >
          <li
            class="flex items-start sm:items-center"
            :class="
              challenge?.Creator?.id === userProfile?.id
                ? 'badge-primary badge-soft'
                : ''
            "
          >
            <img
              v-if="challenge?.Creator?.id"
              :src="getAvatarUrl(challenge?.Creator?.id)"
              alt="User Image"
              class="w-13 me-3 rounded-full"
            />
            <div
              class="flex grow flex-col items-start justify-between sm:flex-row"
            >
              <div class="user-info">
                <h6 class="text-base text-base-content/90">
                  {{ challenge?.Creator?.username }}
                </h6>
                <small class="text-base-content/50 text-sm">
                  {{ formatDistanceToNow(new Date(challenge?.createdAt)) }}
                </small>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <button class="btn btn-primary" @click="copyInvitationLinkHandler">
        Copy invitation link
      </button>
      <template v-if="challenge.participants_limit !== null">
        <button
          v-if="
            !isParticipant(challenge) &&
            challenge.participants.length < challenge.participants_limit
          "
          class="btn btn-primary"
          @click="joinChallengeHandler"
        >
          Join
        </button>

        <button
          v-else-if="isParticipant(challenge)"
          class="btn btn-secondary"
          disabled
        >
          You are participant
        </button>
        <button v-else class="btn btn-secondary" disabled>Full</button>
      </template>

      <template v-else>
        <button
          v-if="!isParticipant(challenge)"
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

    <pre>{{ JSON.stringify(challenge, null, 2) }}</pre>

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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatDistanceToNow } from "date-fns";

import { useChallenges } from "@/composables/challenges";
import { useUser } from "@/composables/user";

import InvitationKeyModal from "@/components/challenges/InvitationKeyModal.vue";

const { userProfile, getAvatarUrl } = useUser();

const route = useRoute();
const { fetchChallengeById, joinChallenge, isParticipant } = useChallenges();
const challenge = ref(null);
const router = useRouter();

const openInvitationKeyModal = ref(null);

const joinChallengeHandler = async () => {
  if (challenge.value.visibility === "Private") {
    openInvitationKeyModal.value.click();
  } else {
    await joinChallenge(challenge.value.id);
    router.push("/profile");
  }
};

const joinWithInvitationKeyHandler = async (invitationKey) => {
  await joinChallenge(challenge.value.id, invitationKey);
  location.reload();
};

onMounted(async () => {
  const id = parseInt(route.params.id);

  challenge.value = await fetchChallengeById(id);
});

const copyInvitationLinkHandler = () => {
  navigator.clipboard.writeText(
    `${window.location.origin}/challenges/join/${challenge.value.id}/${challenge.value.invitation_key}`
  );
};
</script>

<style lang="scss" scoped></style>
