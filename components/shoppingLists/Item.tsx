import React from "react";

import { shoppingListItem } from "../../interface";

interface props {
  shoppingListItem: shoppingListItem;
}

const Item = ({ shoppingListItem }: props) => {
  return (
    <div
      className="bg-white p-4 flex items-start w-[calc(50%-0.5rem)] md:w-[calc(25%-.75rem)] justify-between rounded-xl"
      key={shoppingListItem.item.name}
    >
      <p className="capitalize font-medium">{shoppingListItem.item.name}</p>
      <p className="text-yellow text-sm">{shoppingListItem.quantity} pcs</p>
    </div>
  );
};

export default Item;
