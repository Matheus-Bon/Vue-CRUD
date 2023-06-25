<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import ModalCreate from "../components/ModalCreate.vue";
import axios from "axios";

const router = useRouter();
const store = useStore();
const user = store.getters.GET_AUTH_INFO;
const users = ref([]);

// Define se o user está logado (true)
const loggedInStatus = computed(() => {
  return store.getters.GET_AUTH_STATUS;
});

// Pega o token para enviar junto a solicitação de dados da API
const token = store.getters.GET_AUTH_TOKEN;

const logout = async () => {
  await store.dispatch("logout");
  router.push("/login");
};

/* Pega a lista de users da API */
const fetchUsers = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/list", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  users.value = response.data;
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/delete/${id}/user`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status == 200) {
      fetchUsers();

      alert("User deletado!");
    }
  } catch (err) {
    alert("Você não tem permissão para excluir User.\n\n" + "Erro: " + err);
  }
};

onMounted(() => {
  fetchUsers();
});

// Redireiciona o user caso ele não tenha token para fazer login
if (store.getters.GET_AUTH_TOKEN == null) {
  useRouter.push({ name: "dashboard" });
}
</script>

<template>
  <div v-if="loggedInStatus" class="container mx-52 mt-10">
    <nav>
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4"
      >
        <ul class="flex flex-row gap-3 items-center">
          <li>
            <p class="dark:text-gray-200">{{ user.name }}</p>
          </li>
          <li>
            <button
              @click.prevent="logout"
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Sair
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <h1 class="mb-10 font-bold uppercase text-3xl dark:text-gray-200">Users</h1>

    <button
      data-modal-target="addUser-modal"
      data-modal-toggle="addUser-modal"
      class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5"
      type="button"
    >
      Criar User
    </button>

    <ModalCreate :reload="fetchUsers" />

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Edit</th>
            <th scope="col" class="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">
              <RouterLink
                :to="'/user/' + user.id + '/edit'"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </RouterLink>
            </td>
            <td class="px-6 py-4">
              <button
                @click="deleteUser(user.id)"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
