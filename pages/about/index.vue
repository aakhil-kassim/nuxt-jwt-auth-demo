<template>
  <div>
    <AppInterface>
      <h1>About Us</h1>
      <p>Check out the following links to learn more about our organization:</p>
      <ul>
        <li><NuxtLink to="/about/history">History</NuxtLink></li>
        <li><NuxtLink to="/about/leadership">Leadership</NuxtLink></li>
      </ul>
    </AppInterface>
  </div>
</template>

<script setup>
  import AppInterface from '~/components/AppInterface.vue';
</script>