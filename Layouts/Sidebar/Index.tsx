import { useAtomValue } from "jotai";
import React from "react";

import { isSideBarOpenAtom, sidebarAtom } from "../../store";
import CreateNewItem from "./CreateNewItem";
import CreateShoppingList from "./CreateShoppingList";
import ItemDetails from "./ItemDetails";
import ShoppingList from "./ShoppingList";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";

const SideBar = () => {
  const sidebar = useAtomValue(sidebarAtom);
  const isSidebarOpen = useAtomValue(isSideBarOpenAtom);

  const sidebarClassName = clsx(
    `fixed right-0 top-0 bottom-0 w-[calc(100%-3.5rem)] md:w-[20rem] h-full lg:sticky lg:translate-x-[0%] transition-transform duration-300 overflow-x-hidden`,
    { "translate-x-[0%]": isSidebarOpen, "translate-x-[100%]": !isSidebarOpen }
  );

  return (
    <div className={sidebarClassName}>
      <AnimatePresence mode="wait" initial={false}>
        {sidebar === "CreateShoppingList" && (
          <CreateShoppingList key="CreateShoppingList" />
        )}
        {sidebar === "CreateNewItem" && <CreateNewItem key="CreateNewItem" />}
        {sidebar === "ItemDetails" && <ItemDetails key="ItemDetails" />}
        {sidebar === "ShoppingList" && <ShoppingList key="ShoppingList" />}
      </AnimatePresence>
    </div>
  );
};

export default SideBar;
