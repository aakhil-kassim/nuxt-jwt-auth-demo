export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  deleteCookie(event, config.cookieName, { httpOnly: true, path: '/' });
  return sendRedirect(event, '/home?logout=true', 302);
});