<template>
  <div class="header__search" :class="animeList ? 'resulted' : ''" ref="list">
    <img src="@assets/img/svg/search.svg" class="default" alt="" />
    <img src="@assets/img/svg/search-dark.svg" class="light" alt="" />
    <input
      type="text"
      v-model="searchTitle"
      @keyup="search"
      placeholder="Search anime"
    />

    <Transition>
      <div class="header__search-result" v-if="animeList">
        <div v-if="animeList[0].message">{{ animeList[0].message }}</div>
        <button
          class="header__serach-result-item"
          v-for="anime of animeList"
          :key="anime.animeId"
          @click="openModal(anime.animeId)"
        >
          {{ anime.animeTitle }}
        </button>
      </div>
    </Transition>
  </div>
</template>



<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { onClickOutside } from "@vueuse/core";
const store = useStore();
const timeout = ref(null);
const searchTitle = ref(null);
const list = ref(null);
const emit = defineEmits(["openModal"]);
const search = () => {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(function () {
    store.dispatch("search", searchTitle.value);
    onClickOutside(list, (event) => {
      searchTitle.value = "";
      store.dispatch("search", null);
    });
  }, 500);
};
const openModal = (id) => {
  emit("openModal", id);
  searchTitle.value = "";
  store.dispatch("search", null);
};
const animeList = computed(() => {
  return store.getters.getAnimeList;
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
html.dark {
  .header__search {
    .default {
      display: block;
    }
    .light {
      display: none;
    }
  }
}
.header__search {
  width: 280px;
  position: relative;
  @media (max-width: 414px) {
    width: 220px;
  }
  @media (max-width: 340px) {
    width: 200px;
  }
  &.resulted {
    > input {
      border-radius: $br $br 0 0;
    }
    > img {
      animation: anim $tr;
    }
    @keyframes anim {
      0% {
        transform: translateY(-50%) rotate(20deg);
      }

      25% {
        transform: translateY(-50%) rotate(-20deg);
      }
      50% {
        transform: translateY(-50%) rotate(20deg);
      }
      100% {
        transform: translateY(-50%) rotate(0);
      }
    }
  }
  img {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 40px;
    background-color: $gray;
    border-radius: $br;
    color: $white;
    font-size: 18px;
    transition: $tr;
    @media (max-width: 340px) {
      font-size: 16px;
    }

    &::placeholder {
      color: inherit;
      font-size: inherit;
    }
  }

  &-result {
    position: absolute;
    top: 98%;
    background-color: $gray;
    border-radius: 0 0 $br $br;
    width: 100%;
    left: 0;
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: flex-start;

    > div {
      padding-top: 10px;
      padding-left: 40px;
    }

    button {
      display: block;
      width: 100%;
      text-align: left;
      color: $white;
      padding: 10px 0 10px 40px;
      margin-bottom: 8px;
      transition: $tr;
      &:hover {
        font-weight: $fw-bold;
      }
    }
  }
}
</style>