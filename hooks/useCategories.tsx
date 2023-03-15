import useSWR from "swr";

import { category } from "../interface";

const useCategories = () => {
  const {
    data: categories,
    error,
    mutate,
    isLoading,
  } = useSWR<category[]>("/api/categories");

  const updateCategories = (category: category) => {
    mutate((categories) =>
      Array.isArray(categories) ? [...categories, category] : [category]
    );
  };

  return {
    categories,
    error,
    isLoading,
    mutate,
    updateCategories,
  };
};

export default useCategories;
