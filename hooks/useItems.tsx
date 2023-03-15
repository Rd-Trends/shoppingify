import useSWR from "swr";

import { item } from "../interface";

const useItems = () => {
  const {
    data: items,
    error,
    mutate,
    isLoading,
  } = useSWR<item[]>("/api/items",);

  const addNewItems = (newItem: item) => {
    mutate((items) => {
      return Array.isArray(items) ? [...items, newItem] : [newItem];
    });
  };

  const deleItem = (id: string) => {
    mutate((items) => items?.filter((item) => item._id !== id));
  };

  return {
    items,
    error,
    isLoading,
    mutate,
    addNewItems,
    deleItem,
  };
};

export default useItems;
