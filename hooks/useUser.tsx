import useSWR from "swr";

import { user } from "../interface";

const useUser = () => {
  const { data: user, error, mutate, isLoading } = useSWR<user>("/api/auth");

  return {
    user,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
