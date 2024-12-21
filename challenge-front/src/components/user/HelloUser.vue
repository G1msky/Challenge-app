<template>
  <div class="w-full">
    <ul
      class="border-base-content/25 divide-base-content/25 :last*:rounded-b-md divide-y rounded-md border *:p-6 first:*:rounded-t-md"
    >
      <li class="flex items-start sm:items-center">
        <div class="flex grow flex-col items-start justify-between sm:flex-row">
          <div class="user-info">
            <h6 class="text-base text-base-content/90">
              Hey, {{ user?.username }}!
            </h6>
            <small class="text-base-content/50 text-sm">
              <router-link to="/profile/settings">Settings</router-link>
            </small>
          </div>
        </div>
        <img
          :src="getAvatarUrl(user?.id)"
          alt="User Image"
          class="w-13 me-3 rounded-full"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUser } from "@/composables/user";

const { user, getAvatarUrl } = useUser();
</script>

<style lang="scss" scoped></style>
