import { authenticate, createSessionToken } from '../../utils/authService';

export default defineEventHandler(async (event) => {
  const { username, password, rememberMe } = await readBody(event);

  const user = await authenticate(username, password);
  if (!user) {
    return sendRedirect(event, '/login?fail=true');
  }

  const token = await createSessionToken(user.id, rememberMe);
  if (!token) {
    return sendRedirect(event, '/login?fail=true');
  }

  const config = useRuntimeConfig();
  setCookie(event, config.cookieName, token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: rememberMe
    ? (parseInt(config.cookieRememberMeExpires) / 1000)
    : (parseInt(config.cookieExpires) / 1000)
  });

  return sendRedirect(event, '/home?login=true');
});
