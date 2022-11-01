<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <router-link to="/">Anime<span>Api</span></router-link>
        <HeaderSearchComponent @openModal="(id) => $emit('openModal', id)" />
        <div class="header__right">
          <ThemeComponent />
          <button>Sign in</button>
        </div>
      </div>
    </div>
  </header>
</template>



<script setup>
import HeaderSearchComponent from "@/views/frontend/components/HeaderSearchComponent.vue";
import ThemeComponent from "@/views/frontend/components/ThemeComponent.vue";
</script>

<style lang="scss" scoped>
.header {
  padding: 20px 0;
  background-color: $black-light;
  color: $white;
  position: relative;
  z-index: 2;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      font-weight: $fw-bold;
      font-size: 32px;
      @media (max-width: 600px) {
        display: none;
      }
      span {
        color: $blue-light;
      }
    }
  }
  &__right {
    display: flex;
    align-items: center;
    button {
      &:last-child {
        margin-left: 20px;
        color: $white;
        font-size: 20px;
        @media (max-width: 440px) {
          margin-left: 10px;
          font-size: 18px;
        }
        @media (max-width: 340px) {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>