import useSWR from "swr";

import { shoppingList } from "../interface";

const useShoppingLists = () => {
  const { data: shoppingLists, isLoading } = useSWR<shoppingList[]>(
    "/api/shopping-lists"
  );

  return { shoppingLists, isLoading };
};

export default useShoppingLists;
