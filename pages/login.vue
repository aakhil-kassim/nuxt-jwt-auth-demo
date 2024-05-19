<template>
  <div>
    <AppInterface>
      <div v-if="user">
        <p>You are already logged in. Please continue.</p>
      </div>
      <div v-else>
        <p v-if="redirected">⚠️&nbsp;<i>You must be logged in to view that page!</i></p>
        <h1>Login</h1>
        <form @submit.prevent="onLoginClick" class="login-form">
          <input v-model="form.username" type="text" placeholder="Username" required />
          <input v-model="form.password" type="password" placeholder="Password" required />
          <label>
            <input v-model="form.rememberMe" type="checkbox" /> Remember me
          </label>
          <button type="submit">Login</button>
        </form>
        <p v-if="form.error">{{ form.error }}</p>
      </div>
    </AppInterface>
  </div>
</template>

<script setup>
  import AppInterface from '~/components/AppInterface.vue';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuth } from '../composables/useAuth';

  const form = ref({
    username: '',
    password: '',
    rememberMe: false,
    error: '',
    pending: false,
  });

  const route = useRoute();
  const redirected = ref(route.query.redirected === 'true');

  watch(route, (newRoute) => {
    redirected.value = newRoute.query.redirected === 'true';
  });

  const { authUser, login } = useAuth();

  const user = authUser;

  async function onLoginClick() {
  try {
    form.value.error = '';
    form.value.pending = true;
    await login(form.value.username, form.value.password, form.value.rememberMe);
    navigateTo('/dashboard');
  } catch (error) {
    form.value.error = error.message;
  } finally {
    form.value.pending = false;
  }
}
  
</script>

<style scoped>
  .login-form {
    width: 200px;
  }

  .login-form input[type="text"],
  .login-form input[type="password"] {
    display: block;
    width: 100%;
    padding: 4px;
    margin-bottom: 12px;
    border: 1px solid #7e7e7e;
    border-radius: 0;
    box-sizing: border-box;
  }

  .login-form label {
    display: block;
    margin-bottom: 12px;
  }

  .login-form button {
    display: block;
    cursor: pointer;
  }

  .login-form p {
    margin-top: 16px;
    color: red;
  }
</style>
