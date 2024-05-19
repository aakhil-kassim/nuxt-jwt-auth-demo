// Always redirect user to '/home' if they try to visit '/'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo('/home');
  }
});
