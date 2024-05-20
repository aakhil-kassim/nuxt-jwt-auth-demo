<template>
  <div>
    <AppInterface>
      <p v-if="logoutStatus">ℹ️&nbsp;<i>You have sucessfully logged out.</i></p>
      <p v-if="loginStatus">✅&nbsp;<i>You have successfully logged in.</i></p>
      <h1>Home</h1>
      <p>This is the home page. Everyone is allowed to view it.</p>
    </AppInterface>
  </div>
</template>

<script setup>
  import AppInterface from '~/components/AppInterface.vue';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const logoutStatus = ref(route.query.logout === 'true');
  const loginStatus = ref(route.query.login === 'true');

  watch(route, (newRoute) => {
    logoutStatus.value = newRoute.query.logout === 'true';
    loginStatus.value = newRoute.query.login === 'true';
  });
</script>