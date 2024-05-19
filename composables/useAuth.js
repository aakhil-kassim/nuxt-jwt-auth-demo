export const useAuth = () => {
  const authUser = useState('user', () => null);

  const setUser = (user) => {
    authUser.value = user;
  };

  const login = async (username, password, rememberMe) => {
    try {
      const data = await $fetch('/auth/login', {
        method: 'POST',
        body: { username, password, rememberMe },
      });

      setUser(data.user);
      return authUser;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid username or password');
      }
      throw new Error('An error occurred during login');
    }
  };

  const logout = async () => {
    await $fetch('/auth/logout', { method: 'POST' });
    setUser(null);
  };

  const identity = async () => {
    if (!authUser.value) {
      try {
        const data = await $fetch('/auth/id', {
          headers: useRequestHeaders(['cookie']),
        });

        setUser(data.user);
      } catch {
        setUser(null);
      }
    }
    return authUser;
  };

  return { login, logout, identity, authUser };
};
