import { useSetAtom } from "jotai";
import React, { useMemo } from "react";
import useCategories from "../../hooks/useCategories";
import { shoppingListItem } from "../../interface";
import { shoppingListAtom } from "../../store";
import CheckBox from "../CheckBox";

interface props {
  items: shoppingListItem[];
  updateShoppingListItem(items: shoppingListItem[]): Promise<void>;
}

const ShoppingListItemList = ({ items, updateShoppingListItem }: props) => {
  const setShoppingList = useSetAtom(shoppingListAtom);
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

  const changeBoughtStatus = (shoppingListItem: shoppingListItem) => {
    setShoppingList((shoppingList) => {
      console.log(shoppingList);

      const newItems = shoppingList!.items.map((list) => {
        if (list._id === shoppingListItem._id) {
          list = { ...list, bought: !list.bought };
        }
        return list;
      });

      updateShoppingListItem(newItems);
      return { ...shoppingList!, items: newItems };
    });
  };

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
                  <div
                    key={shoppingListItem._id}
                    className=" flex items-start justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <CheckBox
                        onClick={() => changeBoughtStatus(shoppingListItem)}
                        checked={shoppingListItem.bought}
                        readOnly
                      />
                      <p
                        className={`text-sm md:text-lg font-medium ${
                          shoppingListItem.bought ? " line-through" : ""
                        }`}
                      >
                        {shoppingListItem.item.name}
                      </p>
                    </div>
                    <p className="bg-transparent text-xs font-medium text-yellow border-2 border-yellow py-[2px] px-3 rounded-full">
                      {shoppingListItem.quantity}pcs
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default ShoppingListItemList;
