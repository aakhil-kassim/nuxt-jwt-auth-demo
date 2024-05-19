import { getUserFromSession } from '../../utils/authService';

export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event);
  return { user: user ? { id: user.id, username: user.username } : null };
});
