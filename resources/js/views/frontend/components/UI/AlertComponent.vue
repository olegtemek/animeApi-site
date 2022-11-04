<template>
  <div class="alert" v-if="props.alert_message">
    <p>{{ props.alert_message }}</p>
  </div>
</template>



<script>
import { useStore } from "vuex";
export default {
  name: "AlertComponent",
};
</script>

<script setup>
const store = useStore();
const props = defineProps({
  alert_message: String,
});
setTimeout(() => {
  store.commit("storeAlertMessage", null);
}, 2000);
</script>


<style scoped lang="scss">
.alert {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  color: #fff;
  background-color: $blue-light;
  padding: 20px 40px;
  border-radius: 0 0 $br $br;
  width: 260px;
  text-align: center;
  animation: anim 2s ease-in-out;

  @media (max-width: 460px) {
    width: 180px;
    padding: 10px 20px;
  }

  @keyframes anim {
    0% {
      opacity: 0;
      top: -200px;
    }
    30% {
      top: 0;
      opacity: 1;
    }
    80% {
      top: 0;
      opacity: 1;
    }
    100% {
      opacity: 0;
      top: -200px;
    }
  }
  p {
    font-size: 24px;
    @media (max-width: 1024px) {
      font-size: 20px;
    }
    @media (max-width: 460px) {
      font-size: 16px;
    }
  }
}
</style>