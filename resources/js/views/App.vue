<template>
  <div>
    <HeaderComponent
      @openModal="(id) => openModal(id)"
      v-if="$route.name != 'login' && $route.name != 'register'"
    />
    <router-view :key="$route.path"></router-view>
    <Teleport to="body">
      <AnimeCard
        v-if="animeId && $route.name != 'login'"
        @closeModal="closeModal"
        :animeId="animeId"
      />
    </Teleport>
    <AlertComponent v-if="alert_message" :alert_message="alert_message" />
  </div>
</template>

<script setup>
import HeaderComponent from "@/views/frontend/components/HeaderComponent.vue";
import AnimeCard from "@/views/frontend/components/AnimeCard.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
const store = useStore();
const animeId = ref(null);
const openModal = (id) => {
  animeId.value = id;
};
const closeModal = () => {
  animeId.value = null;
};
const alert_message = computed(() => {
  return store.getters.getAlertMessage;
});
</script>


<style lang="scss">
:root {
  --black: rgb(246, 244, 244);
  --black-light: rgb(255, 255, 255);
  --white: rgb(0, 0, 0);
  --gray: rgb(236, 235, 235);
  --blue-light: #56c5ea;

  transition: $tr;
  &.dark {
    --black: #222;
    --black-light: #333;
    --white: #fff;
    --gray: #555;
    --blue-light: #4babc6;
  }
}
</style>