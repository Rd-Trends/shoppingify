import dayjs from "dayjs";
import React, { useMemo } from "react";
import useShoppingLists from "../../hooks/useShoppingLists";
import ShoppingListCard from "./ShoppingListCard";

const ShoppingList = () => {
  const { shoppingLists } = useShoppingLists();

  const formattedShoppingLists = useMemo(() => {
    const dateArr = Array.from(
      new Set(
        shoppingLists?.map((shoppingList) =>
          dayjs(shoppingList.createdAt).format("MMMM YYYY")
        )
      )
    );
    return dateArr.map((date) => {
      const items = shoppingLists?.filter(
        (shoppingList) =>
          dayjs(shoppingList.createdAt).format("MMMM YYYY") === date
      );
      return {
        date,
        items,
      };
    });
  }, [shoppingLists]);
  return (
    <>
      {formattedShoppingLists.length
        ? formattedShoppingLists.map((list) => (
            <section className="mb-8" key={list.date}>
              <p className="text-xs md:text-sm font-medium mb-4">
                {list.date}
              </p>
              <div className=" space-y-4 md:space-y-6">
                {list.items?.length
                  ? list.items.map((shoppingList) => (
                      <ShoppingListCard
                        key={shoppingList.name}
                        shoppingList={shoppingList}
                      />
                    ))
                  : null}
              </div>
            </section>
          ))
        : null}
    </>
  );
};

export default ShoppingList;
