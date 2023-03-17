import React, { useMemo } from "react";

import useCategories from "../../hooks/useCategories";
import { shoppingListItem } from "../../interface";
import NewShoppingListItem from "./Item";

const NewShoppingListItemList = ({ items }: { items: shoppingListItem[] }) => {
  const { categories } = useCategories();

  const formattedItems = useMemo(() => {
    return categories?.map((category) => {
      let itemsArr: shoppingListItem[] = [];
      items?.map((shoppingListItem) => {
        if (shoppingListItem.item.category === category._id)
          itemsArr.push(shoppingListItem);
      });
      return {
        category: category,
        items: itemsArr,
      };
    });
  }, [categories, items]);

  return (
    <>
      {formattedItems?.map((shoppingListItem, index) => (
        <div
          key={index}
          className={`${shoppingListItem.items.length ? "mb-4" : "hidden"} `}
        >
          {shoppingListItem.items.length ? (
            <>
              <p className="text-sm pb-4 font-medium text-[#828282]">
                {shoppingListItem.category.name}
              </p>
              <div className="flex flex-col space-y-4 mb-2">
                {shoppingListItem.items.map((shoppingListItem) => (
                  <NewShoppingListItem
                    key={shoppingListItem.item._id}
                    shoppingListItem={shoppingListItem}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default NewShoppingListItemList;
