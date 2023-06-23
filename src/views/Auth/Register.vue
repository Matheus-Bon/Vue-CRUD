<script setup>
import GuestLayout from "../../Layouts/GuestLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

const router = useRouter();

const email = ref("");
const name = ref("");
const password = ref("");
const error = ref("");

const submit = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/register", {
      email: email.value,
      password: password.value,
      name: name.value,
    });

    if (response.status == 201) {
      {
        console.log(response)
        router.push({ name: "dashboard" });
      }
    }
  } catch (error) {
    error.value = "Dados incorretos. Tente novamente.";
  }
};

onMounted(() => {
  const user = sessionStorage.getItem("user-info");

  if (user) {
    router.push({ name: "dashboard" });
  }
});
</script>
<template>
  <GuestLayout>
    <div class="mb-5 flex flex-row gap-3">
      <h3 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Criar conta
      </h3>
    </div>

    <form @submit.prevent="submit">
        <div class="mb-6">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Nome</label
        >
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          v-model="name"
        />
      </div>
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          type="text"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div class="mb-6">
        <label
          for="password_confirmation"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Confirme a Senha</label
        >
        <input
          type="password"
          id="password_confirmation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
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
          to="/login"
          class="text-gray-500 font-light hover:text-gray-600"
          >Já tem registro? Entre aqui.</RouterLink
        >
      </div>
    </form>
    <span v-if="error">{{ error }}</span>
  </GuestLayout>
</template>
