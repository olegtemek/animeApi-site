<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: "LoadingComponent",
};
</script>
<style lang="scss" scoped>
.loading {
  margin: 30px auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-bottom-color: $blue-light;
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>