<template>
  <button @click="toggleDark()">
    <img src="@assets/img/svg/moon.svg" v-if="!isDark" class="dark" alt="" />
    <img src="@assets/img/svg/sun.svg" alt="" v-else />
  </button>
</template>



<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script> 


<style lang="scss" scoped>
button {
  img {
    width: 40px;
    @media (max-width: 440px) {
      width: 30px;
    }

    &.dark {
      transform: scale(1.4);
    }
  }
}
</style>