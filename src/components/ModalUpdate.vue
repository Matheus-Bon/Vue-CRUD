<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const token = store.getters.GET_AUTH_TOKEN;
const props = defineProps({ reload: Function });
const user = ref();

/* Lógica para pegar o id da rota */
const url = window.location.href;
const regex = /\/(\d+)\//;
const matches = url.match(regex);

if (matches && matches.length > 1) {
  var userId = matches[1];
}


//Busca os dados do user pela API
const getUser = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/edit`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  user.value = response.data;

};

const form = ref({
    email: user.value?.email,
    name: user.value?.name
})

// Atualiza os dados para enviar para os inputs
watch(user, (newValue) => {
  form.value.email = newValue.email;
  form.value.name = newValue.name;
  user.value.id = newValue.id
});


const updateUser = async () => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/api/update/" + user.value.id + "/user",
      form.value,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status == 200) {
      router.push({name: 'dashboard'})
      alert("User atualizado!");
    }
  } catch (err) {
    alert('Você não tem permissão para editar.\n\n' + 'Erro: ' + err);
  }
};

onMounted(() => {
  getUser();

});
</script>

<template>
  <div
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex flex-row justify-center items-center"
  >
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Atualize um User
          </h3>
          <form class="space-y-6" @submit.prevent="updateUser">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nome</label
              >
              <input
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Walter White"
                required
                v-model="form.name"
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                v-model="form.email"
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
