import dayjs from "dayjs";
import Link from "next/link";
import React, { useMemo } from "react";

import useShoppingLists from "../../hooks/useShoppingLists";
import Loader from "../Loader";
import ShoppingListCard from "./ShoppingListCard";

const ShoppingList = () => {
  const { shoppingLists, isLoading } = useShoppingLists();

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

  if (isLoading) {
    return (
      <div className="absolute right-1/2 translate-x-full lg:-translate-x-full top-1/2 -translate-y-1/2">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {formattedShoppingLists.length ? (
        formattedShoppingLists.map((list) => (
          <section className="mb-8" key={list.date}>
            <p className="text-xs md:text-sm font-medium mb-4">{list.date}</p>
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
      ) : (
        <div className="flex items-center justify-center py-16">
          <p className="text-xl font-medium text-center max-w-md">
            No Shopping history yet,{" "}
            <Link href="/" className="font-bold">
              Create a shopping list
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default ShoppingList;
