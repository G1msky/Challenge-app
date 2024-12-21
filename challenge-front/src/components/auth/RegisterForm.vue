<template>
  <form
    @submit.prevent="registerHandler"
    ref="registerFormEl"
    class="needs-validation flex flex-col gap-2"
    novalidate
  >
    <div class="form-control">
      <input
        v-model="registerForm.username"
        type="text"
        placeholder="John Doe"
        class="input input-filled peer"
        required
      />
      <label class="input-filled-label">Full Name</label>
      <span class="input-filled-focused"></span>
      <span class="error-message">Please enter your name.</span>
      <span class="success-message">Looks good!</span>
    </div>

    <div class="form-control">
      <input
        v-model="registerForm.email"
        type="email"
        placeholder="johndoe@gmail.com"
        class="input input-filled peer"
        required
      />
      <label class="input-filled-label">Email</label>
      <span class="input-filled-focused"></span>
      <span class="error-message">Please enter your email.</span>
      <span class="success-message">Looks good!</span>
    </div>

    <div class="form-control">
      <input
        v-model="registerForm.password"
        id="password"
        type="password"
        placeholder="Password"
        class="input input-filled peer"
        required
      />
      <span class="input-group-text input-eye">
        <button
          type="button"
          data-toggle-password='{ "target": "#password" }'
          class="block"
        >
          <span
            class="icon-[tabler--eye] text-base-content/80 password-active:block hidden size-4 flex-shrink-0"
          ></span>
          <span
            class="icon-[tabler--eye-off] text-base-content/80 password-active:hidden block size-4 flex-shrink-0"
          ></span>
        </button>
      </span>
      <label class="input-filled-label">Password</label>
      <span class="input-filled-focused"></span>
      <span class="error-message">Please enter a valid password</span>
    </div>

    <span v-show="registerError" class="error-message !block">
      {{ registerError }}
    </span>

    <button class="btn btn-primary waves waves-light mt-4 btn-lg" type="submit">
      Зарегистрироваться
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useUser } from "@/composables/user";

const { register } = useUser();

const registerForm = ref({
  username: "",
  email: "",
  password: "",
});

const registerFormEl = ref(null);
const registerError = ref(null);

const registerHandler = async () => {
  try {
    if (!registerFormEl.value.checkValidity()) {
      const firstInvalidElement =
        registerFormEl.value.querySelector(":invalid");

      registerFormEl.value.querySelectorAll(":invalid").forEach((input) => {
        input.classList.add("is-invalid");
      });

      if (firstInvalidElement) {
        firstInvalidElement.focus();
      }
      return false;
    }
    const response = await register(registerForm.value);
    const data = await response;
    if (data.error) {
      registerError.value = data.error;
      return false;
    } else {
      registerError.value = "";
    }
    console.log("Регистрация успешна:", data);
  } catch (error) {
    console.error("Ошибка регистрации:", error);
  }
};
</script>

<style lang="scss" scoped>
.input-eye {
  @apply absolute right-2 top-1/2 -translate-y-1/2;
}

.form-control {
  @apply sm:w-[24rem];
}
</style>
