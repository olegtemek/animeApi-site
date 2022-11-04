<template>
  <div class="anime" v-if="anime">
    <div class="container">
      <div class="anime__wrapper">
        <div class="anime__left">
          <img :src="anime.animeImg" alt="" />
        </div>
        <div class="anime__right">
          <h1>{{ anime.animeTitle }}</h1>
          <p class="description">{{ anime.synopsis }}</p>
          <p>
            <span>Genres: </span>
            <ul>
              <li v-for="genre of anime.genres" :key="genre">
                {{genre}}
              </li>
            </ul>
          </p>
          <p><span>TotalEpisodes: </span>{{anime.totalEpisodes}}</p>
          <p><span>Status: </span>{{anime.status}}</p>
          <p>
            <a :href="anime.episodesList[anime.episodesList.length - 1].episodeUrl" target="_blank">Show first episode</a>
            <button @click="animeAdd" v-if="animeStatus == 200">Add to your favorite list</button>
            <router-link :to="{name:'login'}" v-else-if="animeStatus == 300">Add to your favorite list</router-link>
            <button @click="animeRemove" v-else-if="animeStatus == 400">Remove from favorite list</button>
          </p>
          
        </div>
      </div>
    </div>
  </div>
  <LoadingComponent v-else />
</template>



<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import LoadingComponent from "@/views/frontend/components/LoadingComponent.vue";
const route = useRoute();
const store = useStore();
const id = ref(route.params.id);

onMounted(() => {
  store.dispatch("fetchAnimePage", id.value);
  store.dispatch("animeCheck", { id: id.value });
});
const anime = computed(() => {
  return store.getters.getAnimePage;
});

const animeStatus = computed(() => {
  return store.getters.getAnimeStatus;
});

const animeAdd = () => {
  store.dispatch("animeAdd", {
    id: id.value,
    title: anime.value.animeTitle,
    image: anime.value.animeImg,
  });
};

const animeRemove = () => {
  store.dispatch("animeRemove", {
    id: id.value,
  });
};
</script>

<style lang="scss" scoped>
.anime {
  margin-top: 20px;
  &__wrapper {
    color: $white;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    @media (max-width: 800px) {
      flex-direction: column;
    }
  }

  &__left {
    @media (max-width: 414px) {
      width: 100%;
    }
    img {
      border-radius: $br;
      max-width: 300px;
      max-height: 415px;
      object-fit: cover;
      @media (max-width: 1280px) {
        width: 200px;
      }
      @media (max-width: 414px) {
        width: 100%;
      }
    }
  }

  &__right {
    padding-left: 80px;
    @media (max-width: 1280px) {
      padding-left: 20px;
    }
    @media (max-width: 800px) {
      padding-left: 0;
      padding-top: 20px;
    }
    h1 {
      font-weight: $fw-bold;
      font-size: 32px;
      padding-bottom: 20px;
    }
    p {
      padding-bottom: 20px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      font-size: 18px;
      &.description {
        line-height: 120%;
      }

      span {
        font-weight: $fw-bold;
        padding-right: 10px;
        color: $blue-light;
        @media (max-width: 480px) {
          padding-right: 4px;
        }
      }

      ul {
        padding-left: 20px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        @media (max-width: 480px) {
          padding-left: 4px;
        }
      }

      a,
      button {
        color: inherit;
        padding: 10px 20px;
        border-radius: $br;
        background-color: $blue-light;
        align-self: center;
        margin-left: 20px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>