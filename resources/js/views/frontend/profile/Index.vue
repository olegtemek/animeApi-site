<template>
  <div class="profile" v-if="user">
    <div class="container">
      <div class="profile__wrapper">
        <h1>
          Welcome <span>{{ user.name }}</span>
        </h1>

        <h2>Your favorite list</h2>
        <div class="profile__list">
          <router-link
            :to="'/see/' + anime.anime_id"
            class="profile__list-item"
            v-for="anime of animes"
            :key="anime.anime_id"
          >
            <img :src="anime.anime_image" alt="" />
            <div class="profile__list-item-info">
              <h3>{{ anime.anime_title }}</h3>
              <MyButton
                @click.prevent="removeAnime(anime.anime_id)"
                :type="'button'"
                :title="'Remove anime from favorite list'"
              />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <LoadingComponent v-else />
</template>



<script setup>
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
      padding-bottom: 60px;
      font-size: 24px;
      span {
        font-weight: $fw-medium;
      }
    }
    h2 {
      font-size: 20px;
      font-weight: $fw-medium;
      padding-bottom: 40px;
      text-align: center;
    }
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 40px;

    @media (max-width: 800px) {
      gap: 20px;
    }

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      border: 1px solid $white;
      border-radius: $br;
      transition: $tr;
      &:hover {
        transform: scale(1.02);
      }

      @media (max-width: 800px) {
        align-items: flex-start;
      }
      @media (max-width: 540px) {
        width: 90%;
        align-items: center;
      }
      > img {
        width: 240px;
        height: 300px;
        border-radius: $br;
        object-fit: cover;
        @media (max-width: 800px) {
          width: 180px;
          height: 260px;
        }
      }

      &-info {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        > h3 {
          padding-top: 10px;
          padding-bottom: 20px;
          font-size: 18px;
        }
        > a {
          margin-bottom: 10px;
        }
        > button {
          position: relative;
          z-index: 3;
          @media (max-width: 540px) {
            width: 90% !important;
            max-width: 100% !important;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>