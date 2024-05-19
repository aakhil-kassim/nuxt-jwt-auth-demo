import { authenticate, createSessionToken } from '../../utils/authService';

export default defineEventHandler(async (event) => {
  const { username, password, rememberMe } = await readBody(event);

  const user = await authenticate(username, password);
  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const token = await createSessionToken(user.id, rememberMe);
  if (!token) {
    throw createError({ statusCode: 500, message: 'Failed to create session token' });
  }

  const config = useRuntimeConfig();
  setCookie(event, config.cookieName, token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: rememberMe ? parseInt(config.cookieRememberMeExpires, 10) : parseInt(config.cookieExpires, 10),
  });

  return { user: { id: user.id, username: user.username } };
});
