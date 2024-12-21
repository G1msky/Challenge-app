<template>
  <div>
    <div
      :id="modalId"
      class="overlay modal overlay-open:opacity-100 modal-middle hidden"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog overlay-open:opacity-100">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Private challenge</h3>
            <button
              type="button"
              class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
              aria-label="Close"
              :data-overlay="`#${modalId}`"
            >
              <span class="icon-[tabler--x] size-4"></span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-gray-500">
              Please enter the invitation key to join.
            </p>
            <input
              type="text"
              v-model="invitationKey"
              class="input"
              aria-label="input"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-soft btn-secondary"
              :data-overlay="`#${modalId}`"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              :data-overlay="`#${modalId}`"
              @click="joinWithInvitationKeyHandler"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, defineProps } from "vue";

const invitationKey = ref("");

defineProps({
  modalId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["joinWithInvitationKey"]);

const joinWithInvitationKeyHandler = async () => {
  emit("joinWithInvitationKey", invitationKey.value);
};
</script>

<style lang="scss" scoped></style>
