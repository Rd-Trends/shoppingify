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
    let curr = new Map<string, number>();
    shoppingLists?.map((shoppingList) => {
      shoppingList.items.map((list) => {
        curr.has(list.item.name)
          ? curr.set(list.item.name, curr.get(list.item.name)! + list.quantity)
          : curr.set(list.item.name, list.quantity);
      });
    });
    const items = Array.from(curr, ([name, quantity]) => ({ name, quantity }))
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
