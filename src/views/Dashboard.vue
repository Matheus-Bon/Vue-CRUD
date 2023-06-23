<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const router = useRouter();
const store = useStore();

const loggedInStatus = computed(() => {
  return store.getters.GET_AUTH_STATUS;
});

const logout = async () => {
  await store.dispatch("logout");
  router.push({ name: "login" });
};

onMounted(() => {
  
  let tk = store.getters.GET_AUTH_TOKEN

  tk === null ? router.push({name: "login"}) : ''

})
</script>

<template>
  <div v-if="loggedInStatus" class="container mx-52 mt-10">
    <nav>
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <ul>
          <li>
            <a href="#" @click.prevent="logout">Sair</a>
          </li>
        </ul>
      </div>
    </nav>
    <h1 class="font-bold uppercase text-3xl">Dashboard</h1>
  </div>
</template>
