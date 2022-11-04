<template>
  <div class="anime__card">
    <div class="anime__card-wrapper" ref="target" v-if="anime">
      <span class="cross" @click="closeModal">&#9587;</span>
      <div class="anime__card-left">
        <img :src="anime.animeImg" alt="" />
      </div>
      <div class="anime__card-right">
        <h2>{{ anime.animeTitle }}</h2>
        <p>{{ anime.synopsis.substring(0, 400) }}...</p>
        <div class="anime__card-right-row">
          <p><span>Released date:</span> {{ anime.releasedDate }}</p>
          <p><span>Status:</span> {{ anime.status }}</p>
        </div>
        <div class="anime__card-right-row">
          <MyButton
            @click="closeModal"
            :type="'link'"
            :link="`/see/${$props.animeId}`"
            :title="'See more and add favorite list'"
          />
        </div>
      </div>
    </div>
    <LoadingComponent v-else />
  </div>
</template>



<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { onClickOutside } from "@vueuse/core";
import { useStore } from "vuex";
const props = defineProps({
  animeId: [String],
});
const emit = defineEmits(["closeModal"]);
const target = ref(null);
const store = useStore();
const closeModal = () => {
  emit("closeModal");
};
onClickOutside(target, (event) => {
  closeModal();
});

onMounted(() => {
  store.dispatch("fetchAnime", props.animeId);
});

const anime = computed(() => {
  return store.getters.getAnime;
});
</script>

<style lang="scss" scoped>
.anime__card {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(black, 0.5);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  &-wrapper {
    position: relative;
    width: 700px;
    background-color: $black;
    color: $white;
    padding: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    border-radius: $br;
    .cross {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
    @media (max-width: 800px) {
      flex-direction: column;
      width: 90%;
      box-sizing: border-box;
    }
  }

  &-left {
    img {
      border-radius: $br;
      max-width: 300px;
      max-height: 415px;
      object-fit: cover;
      @media (max-width: 400px) {
        width: 100%;
      }
    }
  }

  &-right {
    padding-left: 20px;
    @media (max-width: 800px) {
      padding-left: 0;
      margin-top: 10px;
    }
    h2 {
      font-size: 24px;
      font-weight: $fw-bold;
      padding-bottom: 10px;
    }
    > p {
      line-height: 120%;
      padding-bottom: 20px;
    }
    &-row {
      margin-top: 20px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      > p {
        span {
          font-weight: $fw-bold;
        }
      }
    }
  }
}
</style>