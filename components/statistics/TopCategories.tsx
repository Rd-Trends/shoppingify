import React, { useMemo, useState } from "react";
import useCategories from "../../hooks/useCategories";
import { shoppingList } from "../../interface";
import ProgressBar from "./ProgressBar";

interface props {
  shoppingLists: shoppingList[] | undefined;
}

const TopCategories = ({ shoppingLists }: props) => {
  const { categories } = useCategories();
  const [totalItems, setTotalItems] = useState(0);

  const topItems = useMemo(() => {
    let curr = new Map<string, number>();
    shoppingLists?.map((shoppingList) => {
      shoppingList.items.map((list) => {
        curr.has(list.item.category)
          ? curr.set(list.item.category, curr.get(list.item.category)! + 1)
          : curr.set(list.item.category, 1);
      });
    });
    const categories = Array.from(curr, ([id, quantity]) => ({
      id,
      quantity,
    }))
      .sort((a, b) => b.quantity - a.quantity)
      .splice(0, 3);

    const totalCategories = categories.reduce((currentTotal, item) => {
      return currentTotal + item.quantity;
    }, 0);

    setTotalItems(totalCategories);

    return categories;
  }, [shoppingLists]);

  const MappedCategories = new Map(
    categories?.map((category) => [category._id, category.name])
  );

  return (
    <div className="w-full">
      <h2 className=" text-2xl font-medium mb-8">Top Categories</h2>
      <div className="space-y-6">
        {topItems.length
          ? topItems.map((item) => (
              <ProgressBar
                key={item.id}
                name={MappedCategories.get(item.id)!}
                quantity={item.quantity}
                totalQuantity={totalItems}
                color="cyan"
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default TopCategories;
