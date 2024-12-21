<template>
  <div class="h-full max-w-[60rem] mx-auto">
    <!-- Stepper -->
    <div
      data-stepper=""
      class="bg-base-100 w-full rounded-lg p-4 shadow"
      id="wizard-validation"
    >
      <!-- Stepper Nav -->
      <ul class="relative flex flex-col gap-2 md:flex-row">
        <li
          class="group flex flex-1 flex-col items-center gap-2 md:flex-row"
          data-stepper-nav-item='{ "index": 1 }'
        >
          <span
            class="min-h-7.5 min-w-7.5 group inline-flex flex-col items-center gap-2 align-middle text-sm md:flex-row"
          >
            <span
              class="stepper-active:bg-primary stepper-active:shadow stepper-active:text-primary-content stepper-success:bg-primary stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success bg-base-200/50 text-base-content/90 group-focus:bg-base-content/20 size-7.5 flex flex-shrink-0 items-center justify-center rounded-full font-medium"
            >
              <span
                class="stepper-success:hidden stepper-error:hidden stepper-completed:hidden text-sm"
                >1</span
              >
              <span
                class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"
              ></span>
              <span
                class="icon-[tabler--x] stepper-error:block hidden size-4 flex-shrink-0"
              ></span>
            </span>
            <span class="text-base-content/90 text-nowrap font-medium"
              >Challenge Details</span
            >
          </span>
          <div
            class="stepper-success:bg-primary stepper-completed:bg-success bg-base-content/20 h-px w-full group-last:hidden max-md:mt-2 max-md:h-8 max-md:w-px md:flex-1"
          ></div>
        </li>
        <li
          class="group flex flex-1 flex-col items-center gap-2 md:flex-row"
          data-stepper-nav-item='{ "index": 2 }'
        >
          <span
            class="min-h-7.5 min-w-7.5 group inline-flex flex-col items-center gap-2 align-middle text-sm md:flex-row"
          >
            <span
              class="stepper-active:bg-primary stepper-active:shadow stepper-active:text-primary-content stepper-success:bg-primary stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success bg-base-200/50 text-base-content/90 group-focus:bg-base-content/20 size-7.5 flex flex-shrink-0 items-center justify-center rounded-full font-medium"
            >
              <span
                class="stepper-success:hidden stepper-error:hidden stepper-completed:hidden text-sm"
                >2</span
              >
              <span
                class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"
              ></span>
              <span
                class="icon-[tabler--x] stepper-error:block hidden size-4 flex-shrink-0"
              ></span>
            </span>
            <span class="text-base-content/90 text-nowrap font-medium"
              >Daily Tasks</span
            >
          </span>
          <div
            class="stepper-success:bg-primary stepper-completed:bg-success bg-base-content/20 h-px w-full group-last:hidden max-md:mt-2 max-md:h-8 max-md:w-px md:flex-1"
          ></div>
        </li>
        <li
          class="group flex flex-1 flex-col items-center gap-2 md:flex-row"
          data-stepper-nav-item='{ "index": 3 }'
        >
          <span
            class="min-h-7.5 min-w-7.5 group inline-flex flex-col items-center gap-2 align-middle text-sm md:flex-row"
          >
            <span
              class="stepper-active:bg-primary stepper-active:shadow stepper-active:text-primary-content stepper-success:bg-primary stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success bg-base-200/50 text-base-content/90 group-focus:bg-base-content/20 size-7.5 flex flex-shrink-0 items-center justify-center rounded-full font-medium"
            >
              <span
                class="stepper-success:hidden stepper-error:hidden stepper-completed:hidden text-sm"
                >3</span
              >
              <span
                class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"
              ></span>
              <span
                class="icon-[tabler--x] stepper-error:block hidden size-4 flex-shrink-0"
              ></span>
            </span>
            <span class="text-base-content/90 text-nowrap font-medium"
              >Settings</span
            >
          </span>
          <div
            class="stepper-success:bg-primary stepper-completed:bg-success bg-base-content/20 h-px w-full group-last:hidden max-md:mt-2 max-md:h-8 max-md:w-px md:flex-1"
          ></div>
        </li>
        <!-- End Item -->
      </ul>
      <!-- End Stepper Nav -->

      <!-- Stepper Content -->
      <form
        id="wizard-validation-form"
        class="needs-validation mt-5 sm:mt-8"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <!-- Challenge Details -->
        <div
          id="challenge-details-validation"
          class="space-y-5"
          data-stepper-content-item='{ "index": 1 }'
        >
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="form-control">
              <label class="form-control">
                <div class="label">
                  <span class="label-text">Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Title"
                  class="input"
                  v-model="form.title"
                />
              </label>
            </div>

            <div class="form-control">
              <label class="label" for="duration-select">
                <span class="label-text">Duration</span></label
              >
              <select
                class="select"
                id="duration-select"
                v-model="form.duration"
              >
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="21">21 days</option>
                <option value="28">28 days</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Description</span>
              </div>
              <textarea
                class="textarea"
                placeholder="Description"
                v-model="form.description"
              ></textarea>
            </label>

            <div class="form-control">
              <label class="form-control">
                <div class="label">
                  <span class="label-text">Rules</span>
                </div>
                <textarea
                  placeholder="Rules"
                  class="textarea"
                  v-model="form.rules"
                ></textarea>
              </label>
            </div>
          </div>
        </div>

        <!-- End Challenge Details -->
        <!-- Daily Tasks -->
        <div
          id="daily-tasks-validation"
          class="space-y-5"
          data-stepper-content-item='{ "index": 2 }'
          style="display: none"
        >
          <div class="form-control flex flex-col gap-2">
            <div class="flex items-center justify-start gap-2">
              <div class="label">
                <span class="label-text">Add daily task</span>
              </div>
              <button
                type="button"
                @click="addTask"
                class="btn btn-outline btn-xs"
              >
                <span class="icon-[tabler--plus]"></span>
              </button>
            </div>
            <div
              v-for="(task, index) in form.daily_tasks"
              :key="index"
              class="task-group flex flex-col gap-2 card p-4"
            >
              <div class="flex items-center justify-between gap-4 w-full">
                <input
                  type="text"
                  placeholder="Task Name"
                  v-model="task.task_name"
                  class="input"
                />
                <button
                  type="button"
                  @click="removeTask(index)"
                  class="btn btn-outline mr-0"
                >
                  <span class="icon-[tabler--trash]"></span>
                </button>
              </div>
              <textarea
                placeholder="Description"
                v-model="task.description"
                class="textarea"
              />
            </div>
          </div>
        </div>
        <!-- End Daily Tasks -->
        <!-- Settings -->
        <div
          id="settings-validation"
          class="space-y-5"
          data-stepper-content-item='{ "index": 3}'
          style="display: none"
        >
          <div class="form-control">
            <div class="flex w-full flex-wrap gap-3 sm:flex-nowrap">
              <label
                class="custom-option flex flex-row items-start gap-3 sm:w-1/2"
              >
                <input
                  type="radio"
                  class="radio radio-primary radio-sm"
                  checked
                  value="Public"
                  v-model="form.visibility"
                />
                <div class="-mt-1 w-full text-start">
                  <span class="label">
                    <span class="label-text text-base">Public</span>
                    <span class="label-text-alt">
                      <span class="icon-[tabler--lock-open]"></span>
                    </span>
                  </span>
                  <span class="label">
                    <span class="label-text-alt text-sm">
                      Anyone can join the challenge
                    </span>
                  </span>
                </div>
              </label>
              <label
                class="custom-option flex flex-row items-start gap-3 sm:w-1/2"
              >
                <input
                  type="radio"
                  class="radio radio-primary radio-sm"
                  value="Private"
                  v-model="form.visibility"
                />
                <div class="-mt-1 w-full text-start">
                  <span class="label">
                    <span class="label-text text-base">Private</span>
                    <span class="label-text-alt">
                      <span class="icon-[tabler--lock]"></span>
                    </span>
                  </span>
                  <span class="label">
                    <span class="label-text-alt text-sm">
                      Only invited users can join the challenge
                    </span>
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="form-control flex flex-col">
              <label for="exampleDataList" class="label">Category</label>
              <input
                class="input max-w-sm"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Type or select"
                v-model="form.category"
              />
              <datalist id="datalistOptions">
                <option value="Health"></option>
                <option value="Finance"></option>
                <option value="Career"></option>
                <option value="Relationships"></option>
                <option value="Personal Development"></option>
              </datalist>
            </div>
            <div class="form-control">
              <label class="form-control">
                <div class="label">
                  <span class="label-text">Tags</span>
                </div>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  class="input"
                  v-model="form.tags"
                />
              </label>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="form-control">
              <label class="form-control">
                <div class="label">
                  <span class="label-text">Difficulty</span>
                </div>
                <ul
                  class="border-base-content/25 divide-base-content/25 flex flex-col divide-y rounded-box border *:p-1 first:*:rounded-t-box last:*:rounded-b-box sm:flex-row sm:divide-x sm:divide-y-0 first:*:sm:rounded-s-box first:*:sm:rounded-tr-none last:*:sm:rounded-e-box last:*:sm:rounded-bl-none rtl:divide-x-reverse"
                >
                  <li class="w-full">
                    <label class="form-control flex items-center gap-2">
                      <input
                        type="radio"
                        name="difficulty"
                        class="radio radio-success radio-sm ms-3"
                        v-model="form.difficulty"
                        value="Easy"
                      />
                      <span class="label cursor-pointer pb-1">
                        <span class="label-text text-sm text-success"
                          >Easy</span
                        >
                      </span>
                    </label>
                  </li>
                  <li class="w-full">
                    <label class="form-control flex items-center gap-2">
                      <input
                        type="radio"
                        name="difficulty"
                        class="radio radio-accent radio-sm ms-3"
                        v-model="form.difficulty"
                        value="Medium"
                      />
                      <span class="label cursor-pointer pb-1">
                        <span class="label-text text-sm text-accent"
                          >Medium</span
                        >
                      </span>
                    </label>
                  </li>
                  <li class="w-full">
                    <label class="form-control flex items-center gap-2">
                      <input
                        type="radio"
                        name="difficulty"
                        class="radio radio-error radio-sm ms-3"
                        v-model="form.difficulty"
                        value="Hard"
                      />
                      <span class="label cursor-pointer pb-1">
                        <span class="label-text text-sm text-error">Hard</span>
                      </span>
                    </label>
                  </li>
                </ul>
              </label>
            </div>

            <div class="form-control">
              <label class="form-control">
                <div class="label">
                  <span class="label-text">Participants Limit</span>
                </div>
                <select
                  class="select max-w-sm"
                  v-model="form.participants_limit"
                >
                  <option value="null">Unlimited</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <!-- <div class="form-control">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Reward Type</span>
              </div>
              <input
                type="text"
                placeholder="Reward Type"
                class="input"
                v-model="form.reward.type"
              />
            </label>
          </div>

          <div class="form-control">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Reward Value</span>
              </div>
              <input
                type="number"
                placeholder="Reward Value"
                class="input"
                v-model="form.reward.value"
              />
            </label>
          </div> -->

        <!-- End Settings -->
        <!-- Final Content -->
        <div
          data-stepper-content-item='{ "isFinal": true }'
          style="display: none"
        >
          <div
            class="bg-base-200/50 flex items-center flex-col gap-2 justify-center rounded-xl p-4"
          >
            <h3 class="text-base-content/50 text-3xl">
              Your challenge has been created
            </h3>
            <p class="text-base-content/50 text-sm">
              Share the link with your friends to invite them to the challenge
            </p>

            <div class="flex flex-col items-center gap-2 mt-4">
              <div class="flex w-full flex-col">
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <router-link
                    :to="`/challenges/${challengeId}`"
                    class="btn btn-primary btn-soft"
                  >
                    Open Challenge
                  </router-link>

                  <div
                    class="btn btn-accent btn-soft"
                    @click="copyInvitationLink"
                  >
                    <span class="icon-[tabler--link]"></span>
                    Copy Invitation Link
                  </div>
                </div>
                <div class="divider divider-vertical">OR</div>
                <div class="grid flex-grow place-items-center">
                  <div class="flex flex-col items-center gap-2 md:flex-row">
                    <a
                      :href="
                        'https://t.me/share/url?url=' +
                        encodeURIComponent(invitationLink)
                      "
                      target="_blank"
                      class="btn btn-primary"
                    >
                      Share on Telegram
                    </a>
                    <a
                      :href="
                        'https://wa.me/?text=' +
                        encodeURIComponent(invitationLink)
                      "
                      target="_blank"
                      class="btn btn-primary"
                    >
                      Share on WhatsApp
                    </a>
                    <a
                      :href="
                        'https://www.instagram.com/sharer/sharer.php?u=' +
                        encodeURIComponent(invitationLink)
                      "
                      target="_blank"
                      class="btn btn-primary"
                    >
                      Share on Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Final Content -->
        <!-- Button Group -->
        <div class="mt-5 flex items-center justify-between gap-x-2">
          <button
            type="button"
            class="btn btn-primary btn-prev max-sm:btn-square"
            data-stepper-back-btn=""
          >
            <span
              class="icon-[tabler--chevron-left] text-primary-content size-5 rtl:rotate-180"
            ></span>
            <span class="max-sm:hidden">Back</span>
          </button>
          <button
            type="button"
            class="btn btn-primary btn-next max-sm:btn-square"
            data-stepper-next-btn=""
          >
            <span class="max-sm:hidden">Next</span>
            <span
              class="icon-[tabler--chevron-right] text-primary-content size-5 rtl:rotate-180"
            ></span>
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            data-stepper-finish-btn=""
            style="display: none"
          >
            Create
          </button>
          <!-- <button
            type="reset"
            class="btn btn-primary"
            data-stepper-reset-btn=""
            style="display: none"
          >
            Create new
          </button> -->
        </div>
        <!-- End Button Group -->
      </form>
      <!-- End Stepper Content -->
    </div>
    <!-- End Stepper -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import flatpickr from "flatpickr";
import { useChallengesStore } from "@/stores/challenges";
import { useUserStore } from "@/stores/user";

const challengesStore = useChallengesStore();
const userStore = useUserStore();

const form = ref({
  title: "",
  description: "",
  duration: 7,
  daily_tasks: [
    {
      task_name: "",
      description: "",
    },
  ],
  category: "",
  difficulty: "Select difficulty",
  reward: {
    type: "",
    value: 0,
  },
  progress_tracking: {
    method: "",
    metrics: [
      {
        metric_name: "",
        value: 0,
      },
    ],
  },
  visibility: "Public",
  participants_limit: 0,
  tags: [],
  rules: "",
});

const addTask = () => {
  form.value.daily_tasks.push({
    task_name: "",
    description: "",
  });
};

const removeTask = (index) => {
  form.value.daily_tasks.splice(index, 1);
};

const invitationKey = ref("");
const invitationLink = ref("");
const challengeId = ref("");

const handleSubmit = async () => {
  const challengeData = {
    title: form.value.title,
    description: form.value.description,
    duration: form.value.duration,
    category: form.value.category,
    difficulty: form.value.difficulty,
    reward: form.value.reward,
    visibility: form.value.visibility,
    participants_limit:
      form.value.participants_limit !== "null"
        ? form.value.participants_limit
        : null,
    rules: form.value.rules,
    created_by: userStore.user.id,
    daily_tasks: form.value.daily_tasks.map((task) => ({
      task_name: task.task_name,
      description: task.description,
    })),
  };

  try {
    const response = await challengesStore.createChallenge(challengeData);
    console.log("Challenge and tasks created successfully", response);
    invitationKey.value = response.invitation_key;
    invitationLink.value = `${window.location.origin}/challenges/join/${response.id}/${response.invitation_key}`;
    challengeId.value = response.id;
    console.log("Invitation Link:", invitationLink.value);
    copyInvitationLink();
  } catch (error) {
    console.error("Error creating challenge:", error);
  }
};

const copyInvitationLink = () => {
  navigator.clipboard.writeText(invitationLink.value);
};

onMounted(() => {
  flatpickr(".jsPickr", {
    allowInput: true,
    monthSelectorType: "static",
  });
});
</script>

<style lang="scss" scoped>
.form-control {
  @apply sm:w-full;
  input:not([type="radio"]) {
    @apply sm:w-full max-w-full;
  }
  .task-group {
    @apply flex items-center gap-2;
  }
}
</style>
