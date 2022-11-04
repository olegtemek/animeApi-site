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
              <h3>Email</h3>
              <input type="text" placeholder="Email" v-model="user.email" />
            </label>
            <label for="">
              <h3>Password</h3>
              <input
                type="password"
                placeholder="Password"
                v-model="user.password"
                @keyup.enter="login"
              />
            </label>
            <p>
              Don't have account?
              <router-link :to="{ name: 'register' }">Registration</router-link>
            </p>
            <button @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import image from "@assets/img/login.jpg";
import { ref } from "@vue/reactivity";
import { useDark } from "@vueuse/core";
import { useStore } from "vuex";
const isDark = useDark();
const store = useStore();
const user = ref({
  email: null,
  password: null,
});
const messages = ref(null);
const login = () => {
  store.dispatch("login", {
    email: user.value.email,
    password: user.value.password,
  });
  messages.value = store.getters.getAuthMessage;
};
</script>