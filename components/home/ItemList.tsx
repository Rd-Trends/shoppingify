import { useAtomValue } from "jotai";
import React, { useMemo } from "react";

import useCategories from "../../hooks/useCategories";
import useItems from "../../hooks/useItems";
import { item } from "../../interface";
import { itemQueryAtom } from "../../store";
import Loader from "../Loader";
import Item from "./Item";

const ItemList = () => {
  const { items, isLoading: isItemsLoading } = useItems();
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const itemQuery = useAtomValue(itemQueryAtom);

  const formattedItems = useMemo(() => {
    return categories?.map((category) => {
      let itemsArr: item[] = [];
      items?.map((item) => {
        if (
          item.category === category._id &&
          item.name.toLowerCase().includes(itemQuery.toLowerCase())
        )
          itemsArr.push(item);
      });
      return {
        category: category,
        items: itemsArr,
      };
    });
  }, [categories, items, itemQuery]);

  if (isItemsLoading || isCategoriesLoading) {
    return (
      <div className="absolute right-1/2 translate-x-full lg:-translate-x-full top-1/2 -translate-y-1/2">
        <Loader />
      </div>
    );
  }

  return (
    <section className="">
      {items?.length ? (
        formattedItems?.map((formattedItem) => (
          <div key={formattedItem.category._id}>
            {formattedItem.items.length ? (
              <div className="mb-8" key={formattedItem.category._id}>
                <p className="mb-4 capitalize text-lg font-medium">
                  {formattedItem.category.name}
                </p>
                <div className="flex items-start flex-wrap gap-4">
                  {formattedItem.items.map((item) => (
                    <Item item={item} key={item._id} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center py-16">
          <p className="text-xl font-medium text-center max-w-md">
            No items added yet, click on add item in the side bar to add a new
            item.
          </p>
        </div>
      )}
    </section>
  );
};

export default ItemList;
