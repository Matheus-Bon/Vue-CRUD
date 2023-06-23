<script setup>
import GuestLayout from "../../Layouts/GuestLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");

const login = () => {
  const loginData = {email: email.value, password: password.value}
  store.dispatch('login', loginData)
  router.push({name: 'dashboard'})
}
</script>

<template>
  <GuestLayout>
    <form @submit.prevent="login">
      <div class="mb-5 flex flex-row gap-3">
        <h3 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Login
        </h3>
      </div>
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
          v-model="email"
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Senha</label
        >
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          v-model="password"
        />
      </div>
      <div class="flex flex-row justify-between items-center">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <RouterLink
          to="/register"
          class="text-gray-500 font-light hover:text-gray-600"
          >Crie uma conta</RouterLink
        >
      </div>
    </form>
  </GuestLayout>
</template>
