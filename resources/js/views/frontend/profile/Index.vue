<template>
  <div class="profile" v-if="user">
    <div class="container">
      <div class="profile__wrapper">
        <h1>
          Welcome <span>{{ user.name }}</span>
        </h1>

        <h2>Your favorite list</h2>
        <div class="profile__list">
          <div
            class="profile__item"
            v-for="anime of animes"
            :key="anime.anime_id"
          >
            <img :src="anime.anime_image" alt="" />
            <h3>{{ anime.anime_title }}</h3>
            <router-link :to="'/see/' + anime.anime_id"
              >Go to anime</router-link
            >
            <button @click="removeAnime(anime.anime_id)">
              Remove anime from favorite list
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoadingComponent v-else />
</template>



<script setup>
import LoadingComponent from "@/views/frontend/components/LoadingComponent.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("getUser");
  store.dispatch("fetchAnimesUser");
});

const removeAnime = (id) => {
  store.dispatch("animeRemove", {
    id: id,
  });
};

const user = computed(() => {
  return store.getters.getUser;
});
const animes = computed(() => {
  return store.getters.getAnimesUser;
});
</script>


<style lang="scss" scoped>
.profile {
  padding-top: 40px;
  color: $white;

  &__wrapper {
    h1 {
      font-size: 24px;
      span {
        font-weight: $fw-medium;
      }
    }
  }
}
</style>