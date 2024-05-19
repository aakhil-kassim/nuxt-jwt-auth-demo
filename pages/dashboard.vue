<template>
  <div>
    <AppInterface>
      <h1>Dashboard</h1>
      <p v-if="user">Welcome, {{ user.username }}!</p>
      <p v-else>You aren't supposed to be on this page... something is broken!</p>
      <p>This is the dashboard. Only authenticated users are allowed to view it.</p>
    </AppInterface>
  </div>
</template>

<script setup>
  import AppInterface from '~/components/AppInterface.vue';
  import { useAuth } from '../composables/useAuth';

  const { authUser } = useAuth();
  const user = authUser;
</script>