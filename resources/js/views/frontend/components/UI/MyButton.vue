<template>
  <button v-if="type == 'button'">{{ props.title }}</button>
  <router-link v-else :to="props.link">{{ props.title }}</router-link>
</template>



<script>
export default {
  name: "MyButton",
};
</script>
<script setup>
const props = defineProps({
  title: String,
  type: String,
  link: [String, Object],
});
</script>

<style lang="scss" scoped>
button {
  max-width: 168px !important;
}
a,
button {
  color: inherit;
  padding: 10px 20px;
  border-radius: $br;
  background-color: $blue-light;
  transition: $tr;
  color: #fff;
  &:hover {
    transform: scale(1.05);
  }

  &:first-child {
    margin-left: 0;
  }
}
</style>