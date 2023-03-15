import React from "react";
import { item } from "../../interface";
import { useMemo } from "react";
import Item from "./Item";
import useItems from "../../hooks/useItems";
import useCategories from "../../hooks/useCategories";
import { useAtomValue } from "jotai";
import { itemQueryAtom } from "../../store";

const ItemList = () => {
  const { items } = useItems();
  const { categories } = useCategories();
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
  return (
    <section className="">
      {items?.length
        ? formattedItems?.map((formattedItem) => (
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
        : null}
    </section>
  );
};

export default ItemList;
