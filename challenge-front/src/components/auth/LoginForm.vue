<template>
  <form
    @submit.prevent="loginHandler"
    class="needs-validation flex flex-col gap-2"
    ref="loginFormEl"
    novalidate
  >
    <div class="form-control">
      <input
        v-model="loginForm.email"
        type="email"
        placeholder="Email"
        class="input input-filled peer"
        required
      />
      <label class="input-filled-label">Email</label>
      <span class="input-filled-focused"></span>
      <span class="error-message">Please enter your email</span>
    </div>

    <div class="form-control">
      <input
        v-model="loginForm.password"
        id="password-login"
        type="password"
        placeholder="Password"
        class="input input-filled peer"
        required
      />
      <span class="input-group-text input-eye">
        <button
          type="button"
          data-toggle-password='{ "target": "#password-login" }'
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

    <span v-show="loginError" class="error-message !block">
      {{ loginError }}
    </span>

    <button class="btn btn-primary waves waves-light mt-4 btn-lg" type="submit">
      Войти
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useUser } from "@/composables/user";

const { login } = useUser();

const loginForm = ref({
  email: "",
  password: "",
});

const loginFormEl = ref(null);
const loginError = ref(null);

const loginHandler = async () => {
  try {
    if (!loginFormEl.value.checkValidity()) {
      const firstInvalidElement = loginFormEl.value.querySelector(":invalid");

      loginFormEl.value.querySelectorAll(":invalid").forEach((input) => {
        input.classList.add("is-invalid");
      });

      if (firstInvalidElement) {
        firstInvalidElement.focus();
      }
      return false;
    }
    const response = await login(loginForm.value);
    const data = await response;
    if (data.error) {
      loginError.value = data.error;
      return false;
    } else {
      loginError.value = "";
    }
    console.log("Авторизация успешна:", data);
  } catch (error) {
    console.error("Ошибка авторизации:", error);
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
