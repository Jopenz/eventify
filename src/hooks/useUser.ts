import { useUserStore } from '../store/useUserStore';

const useUser = () => {
  const user = useUserStore((state) => state.user);

  return {
    user,
  };
};

export default useUser;
