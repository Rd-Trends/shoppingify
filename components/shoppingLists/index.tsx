import React, { useMemo } from "react";
import dayjs from "dayjs";
import useCategories from "../../hooks/useCategories";
import { shoppingList, shoppingListItem } from "../../interface";
import { BsCalendar2Event } from "react-icons/bs";
import Item from "./Item";

const ShoppingList = ({
  shoppingList,
}: {
  shoppingList: shoppingList | undefined;
}) => {
  const { categories } = useCategories();

  const formattedItems = useMemo(() => {
    return categories?.map((category) => {
      let itemsArr: shoppingListItem[] = [];
      shoppingList?.items.map((list) => {
        if (list.item.category === category._id) itemsArr.push(list);
      });
      return {
        category: category,
        items: itemsArr,
      };
    });
  }, [categories, shoppingList]);

  return (
    <main className="py-8">
      <h1 className="text-lg md:text-2xl font-bold mb-4">
        {shoppingList?.name}
      </h1>
      <p className="flex items-center space-x-2 text-sm text-[#c1c1c1]">
        <BsCalendar2Event size={20} />
        <span>{dayjs(shoppingList?.createdAt).format("ddd DD.MM.YYYY")}</span>
      </p>

      <section className="mt-8 md:mt-10">
        {formattedItems?.length
          ? formattedItems?.map((formattedItem) => (
              <div key={formattedItem.category._id}>
                {formattedItem.items.length ? (
                  <div className="mb-8" key={formattedItem.category._id}>
                    <p className="mb-4 capitalize text-lg font-medium">
                      {formattedItem.category.name}
                    </p>
                    <div className="flex items-start flex-wrap gap-4">
                      {formattedItem.items.map((shoppingListItem) => (
                        <Item
                          key={shoppingListItem._id}
                          shoppingListItem={shoppingListItem}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          : null}
      </section>
    </main>
  );
};

export default ShoppingList;
