import React, { useEffect, useMemo, useState } from "react";

import useShoppingLists from "../../hooks/useShoppingLists";
import { shoppingList } from "../../interface";
import ProgressBar from "./ProgressBar";

interface props {
  shoppingLists: shoppingList[] | undefined;
}

const TopItems = ({ shoppingLists }: props) => {
  const [totalItems, setTotalItems] = useState(0);

  const topItems = useMemo(() => {
    let itemCounter = new Map<string, number>();
    shoppingLists?.map((shoppingList) => {
      shoppingList.items.map((list) => {
        itemCounter.has(list.item?.name)
          ? itemCounter.set(list.item?.name, itemCounter.get(list.item?.name)! + list.quantity)
          : itemCounter.set(list.item?.name, list.quantity);
      });
    });
    const items = Array.from(itemCounter, ([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .splice(0, 3);

    const totalItems = items.reduce((currentTotal, item) => {
      return currentTotal + item.quantity;
    }, 0);

    setTotalItems(totalItems);

    return items;
  }, [shoppingLists]);

  return (
    <div className="w-full">
      <h2 className=" text-2xl font-medium mb-8">Top Items</h2>
      <div className="space-y-6">
        {topItems.length
          ? topItems.map((item) => (
              <ProgressBar
                key={item.name}
                name={item.name}
                quantity={item.quantity}
                totalQuantity={totalItems}
                color="yellow"
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default TopItems;
