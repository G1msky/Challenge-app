<template>
  <div class="flex items-center justify-center flex-col">
    <div class="card p-8">
      <div class="mb-6 flex items-center justify-center gap-4">
        <button
          @click="activateTab('register')"
          class="btn btn-outline btn-primary"
          :class="{ 'btn-active': currentTab === 'register' }"
        >
          Регистрация
        </button>
        <button
          class="btn btn-outline btn-primary"
          @click="activateTab('login')"
          :class="{ 'btn-active': currentTab === 'login' }"
        >
          Авторизация
        </button>
      </div>
      <div class="">
        <div v-show="currentTab === 'register'">
          <RegisterForm />
        </div>

        <div v-show="currentTab === 'login'">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import LoginForm from "@/components/auth/LoginForm.vue";

const currentTab = ref("register");

const activateTab = (tabName) => {
  currentTab.value = tabName;
  window.HSStaticMethods.autoInit();
};

onMounted(() => {});
</script>
