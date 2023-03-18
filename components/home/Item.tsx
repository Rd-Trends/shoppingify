import { useSetAtom } from "jotai";
import React from "react";
import { BsPlus } from "react-icons/bs";

import useShoppingListItems from "../../hooks/useShoppingListItems";
import { item } from "../../interface";
import {
  isSideBarOpenAtom,
  itemInItemDetailsAtom,
  sidebarAtom,
} from "../../store";

const Item = ({ item }: { item: item }) => {
  const setSidebar = useSetAtom(sidebarAtom);
  const setItemInItemDetails = useSetAtom(itemInItemDetailsAtom);
  const setIsSidebarOpen = useSetAtom(isSideBarOpenAtom);
  const { addItemToShoppingList } = useShoppingListItems();

  return (
    <div
      onClick={() => {
        setSidebar("ItemDetails");
        setItemInItemDetails(item);
        setIsSidebarOpen(true);
      }}
      className=" bg-white text-sm md:text-base p-4 flex items-start w-[calc(50%-0.5rem)] md:w-[calc(25%-.75rem)] justify-between rounded-xl"
    >
      <p className=" capitalize font-medium">{item.name}</p>
      <button
        className="outline-none bg-transparent border-none -mt-[3px] text-grey hover:text-yellow "
        onClick={(e) => {
          e.stopPropagation();
          addItemToShoppingList({ item, quantity: 1, bought: false });
          setSidebar("CreateShoppingList");
          setIsSidebarOpen(true);
        }}
      >
        <BsPlus size={30} />
      </button>
    </div>
  );
};

export default Item;
