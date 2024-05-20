<template>
  <div id="app-area">
    <header>
      <span id="branding">My Site</span>
      <ul>
        <li><NuxtLink to="/home">Home</NuxtLink></li>
        <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/about">About Us</NuxtLink></li>
      </ul>
      <span class="horizontal-flex-spacer"></span>
      <ul>
        <li>
          <form v-if="user" action="/auth/logout" method="POST">
            <button type="submit">
              Log Out
            </button>
          </form>
          <form v-else action="/login" method="GET">
            <button type="submit">
              Log In
            </button>
          </form>
        </li>
      </ul>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <p>Nuxt JWT Authentication Demo</p>
    </footer>
  </div>
</template>

<script setup>
  import { useAuth } from '../composables/useAuth';
  const { authUser } = useAuth();

  const user = authUser;
</script>

<style scoped>
  #app-area {
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #f1f1f1;
    padding: 0;
    height: 40px;
    box-sizing: border-box;
  }

  header #branding {
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #009a5f;
    color: #ffffff;
    height: 100%;
    user-select: none;
  }

  header .horizontal-flex-spacer {
    flex-grow: 1;
  }

  header ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  header ul li, header ul li form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  header ul li a, header ul li form button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    text-align: center;
    padding: 0 14px;
    background-color: #f1f1f1;
    color: #000000;
    cursor: pointer;
    height: 100%;
    border: none;
    font: inherit;
  }

  header ul li a:hover, header ul li form button:hover {
    background-color: #ffffff;
  }

  header ul li a:active, header ul li form button:active {
    background-color: #ababab;
  }

  main {
    padding: 16px;
    flex-grow: 1;
    overflow-y: scroll;
  }

  footer {
    background-color: #f1f1f1;
    text-align: center;
    padding: 10px 0;
    margin-top: 20px;
  }

  footer p {
    margin: 0;
    color: #555555;
  }
</style>
