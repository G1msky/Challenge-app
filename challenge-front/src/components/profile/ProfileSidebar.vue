<script setup></script>

<template>
  <div
    id="overlay-navigation-example"
    class="overlay overlay-open:translate-x-0 drawer drawer-start hidden max-w-72"
    tabindex="-1"
    style="inset-inline-end: calc(100vw - 18rem)"
  >
    <div class="drawer-header">
      <h3 class="drawer-title">Menu</h3>
      <button
        type="button"
        class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
        aria-label="Close"
        data-overlay="#overlay-navigation-example"
      >
        <span class="icon-[tabler--x] size-4"></span>
      </button>
    </div>
    <div class="drawer-body justify-start pb-6">
      <ul class="space-y-0.5">
        <li class="">
          <router-link
            to="/today"
            class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            data-overlay="#overlay-navigation-example"
          >
            <span
              class="icon-[tabler--home] group-hover:text-base-content"
            ></span>
            <div class="group-hover:text-base-content">Today</div>
          </router-link>
        </li>
        <li class="">
          <router-link
            to="/profile"
            class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            data-overlay="#overlay-navigation-example"
          >
            <span
              class="icon-[tabler--home] group-hover:text-base-content"
            ></span>
            <div class="group-hover:text-base-content">Profile</div>
          </router-link>
        </li>
        <li class="">
          <router-link
            to="/dashboard"
            class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            data-overlay="#overlay-navigation-example"
          >
            <span
              class="icon-[tabler--home] group-hover:text-base-content"
            ></span>
            <div class="group-hover:text-base-content">Dashboard</div>
          </router-link>
        </li>
        <li class="">
          <router-link
            to="/challenges/public"
            class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            data-overlay="#overlay-navigation-example"
          >
            <span
              class="icon-[tabler--layout-navbar] group-hover:text-base-content"
            ></span>
            <div class="group-hover:text-base-content">Choose challenge</div>
          </router-link>
        </li>
        <li class="">
          <router-link
            to="/challenges/joined"
            class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            data-overlay="#overlay-navigation-example"
          >
            <span
              class="icon-[tabler--layout-navbar] group-hover:text-base-content"
            ></span>
            <div class="group-hover:text-base-content">Joined challenges</div>
          </router-link>
        </li>
        <li class="">
          <router-link
            to="/challenges/own"
            class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            data-overlay="#overlay-navigation-example"
          >
            <span
              class="icon-[tabler--layout-navbar] group-hover:text-base-content"
            ></span>
            <div class="group-hover:text-base-content">Your challenges</div>
          </router-link>
        </li>
        <li class="">
          <router-link
            to="/create-challenge"
            class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            data-overlay="#overlay-navigation-example"
          >
            <span
              class="icon-[tabler--layout-navbar] group-hover:text-base-content"
            ></span>
            <div class="group-hover:text-base-content">Create challenge</div>
          </router-link>
        </li>

        <div class="divider text-base-content/50 py-6 after:border-0">
          Apps & Pages
        </div>
        <li
          class="btn btn-text text-base-content/80 group w-full justify-start p-2"
        >
          <span
            class="icon-[tabler--message-chatbot] group-hover:text-base-content"
          ></span>
          <a href="#" class="group-hover:text-base-content">Chat</a>
        </li>
        <li
          class="btn btn-text text-base-content/80 group w-full justify-start p-2"
        >
          <span
            class="icon-[tabler--mail] group-hover:text-base-content"
          ></span>
          <a href="#" class="group-hover:text-base-content">Email</a>
        </li>
        <li
          class="btn btn-text text-base-content/80 group w-full justify-start p-2"
        >
          <span
            class="icon-[tabler--calendar] group-hover:text-base-content"
          ></span>
          <a href="#" class="group-hover:text-base-content">Calendar</a>
        </li>
        <li
          class="collapse-toggle btn btn-text collapse-open:bg-base-content/10 text-base-content/80 collapse-open:text-base-content group w-full justify-start p-2"
          id="menu-item-3"
          aria-expanded="false"
          aria-controls="menu-sub-item-3"
          data-collapse="#menu-sub-item-3"
        >
          <span
            class="icon-[tabler--shopping-cart] group-hover:text-base-content"
          ></span>
          <span class="group-hover:text-base-content">Ecommerce</span>
          <span
            class="icon-[tabler--chevron-right] collapse-open:rotate-90 group-hover:text-base-content ms-auto size-4 rtl:rotate-180"
          ></span>
        </li>
        <div
          id="menu-sub-item-3"
          class="collapse hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="menu-item-3"
        >
          <ul>
            <li
              class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            >
              <span
                class="icon-[tabler--point] group-hover:text-base-content"
              ></span>
              <a href="#" class="group-hover:text-base-content">Products</a>
            </li>
            <li
              class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            >
              <span
                class="icon-[tabler--point] group-hover:text-base-content"
              ></span>
              <a href="#" class="group-hover:text-base-content">Categories</a>
            </li>
            <li
              class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            >
              <span
                class="icon-[tabler--point] group-hover:text-base-content"
              ></span>
              <a href="#" class="group-hover:text-base-content"
                >Shipping & Delivery</a
              >
            </li>
            <li
              class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            >
              <span
                class="icon-[tabler--point] group-hover:text-base-content"
              ></span>
              <a href="#" class="group-hover:text-base-content">Location</a>
            </li>
          </ul>
        </div>
        <div class="divider text-base-content/50 py-6 after:border-0">
          Account
        </div>
        <li class="">
          <button
            type="button"
            class="btn btn-text text-base-content/80 group w-full justify-start p-2"
            @click="logout"
          >
            <span
              class="icon-[tabler--logout] group-hover:text-base-content"
            ></span>
            <a href="#" class="group-hover:text-base-content">Log Out</a>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { onMounted, nextTick } from "vue";
const userStore = useUserStore();

const logout = () => {
  userStore.logout();
};

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  });
});
</script>
