import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig();
  const unprotectedPaths = config.public.unprotectedPaths || [];
  const { identity, authUser } = useAuth();

  if (!authUser.value) {
    await identity();
  }

  const isUnprotected = unprotectedPaths.some(path => {
    if (path.endsWith('*')) {
      const basePath = path.slice(0, -1);
      return to.path.startsWith(basePath);
    }
    return to.path === path;
  });

  if (!authUser.value && to.path !== '/login' && !isUnprotected) {
    return navigateTo({ path: '/login', query: { redirected: 'true' } });
  }
});
