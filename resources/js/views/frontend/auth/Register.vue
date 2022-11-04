<template>
  <div>
    <div class="auth" :style="`background-image: url(${image})`">
      <div class="container">
        <div class="auth__wrapper">
          <div class="auth__inner">
            <h1>Login</h1>
            <div class="auth__message" v-if="messages">
              <span>{{ messages }}</span>
            </div>
            <label for="">
              <h3>Name</h3>
              <input type="text" placeholder="Name" v-model="user.name" />
            </label>
            <label for="">
              <h3>Email</h3>
              <input type="text" placeholder="Email" v-model="user.email" />
            </label>
            <label for="">
              <h3>Password</h3>
              <input
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </label>
            <p>
              Have account?
              <router-link :to="{ name: 'login' }">Sign In!</router-link>
            </p>
            <button @click="register">Registration</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import image from "@assets/img/register.jpg";
import { ref } from "@vue/reactivity";
import { useDark } from "@vueuse/core";
import { useStore } from "vuex";
const isDark = useDark();
const store = useStore();
const user = ref({
  email: null,
  password: null,
  name: null,
});
const messages = ref(null);
const register = () => {
  store.dispatch("register", {
    email: user.value.email,
    password: user.value.password,
    name: user.value.name,
  });
  messages.value = store.getters.getAuthMessage;
};
</script>