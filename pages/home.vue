<template>
  <div>
    <AppInterface>
      <p v-if="logout">✨&nbsp;<i>You have sucessfully logged out.</i></p>
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
  const logout = ref(route.query.logout === 'true');

  watch(route, (newRoute) => {
    logout.value = newRoute.query.logout === 'true';
  });
</script>