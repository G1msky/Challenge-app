<template>
  <div
    id="overlay-settings-bottom"
    class="overlay drawer overlay-open:translate-y-0 drawer-bottom hidden"
    role="dialog"
    tabindex="-1"
  >
    <div class="drawer-header">
      <h3 class="drawer-title">Settings</h3>
      <button
        type="button"
        class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
        aria-label="Close"
        data-overlay="#overlay-settings-bottom"
      >
        <span class="icon-[tabler--x] size-5"></span>
      </button>
    </div>
    <div class="drawer-body">
      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            id="show-completed"
            v-model="showCompleted"
          />
          <label class="label-text text-base select-none" for="show-completed">
            Show completed
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTasks } from "@/composables/tasks";

const { showCompleted } = useTasks();
</script>

<style lang="scss" scoped></style>
