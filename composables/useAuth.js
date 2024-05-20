export const useAuth = () => {
  const authUser = useState('user', () => null);

  const setUser = (user) => {
    authUser.value = user;
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

  return { identity, authUser };
};
