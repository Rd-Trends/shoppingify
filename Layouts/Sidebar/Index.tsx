import React, { useState } from "react";
import CreateNewItem from "./CreateNewItem";
import CreateShoppingList from "./CreateShoppingList";
import { Transition } from "@headlessui/react";
import { useAtomValue } from "jotai";
import { isSideBarOpenAtom, sidebarAtom } from "../../store";
import ItemDetails from "./ItemDetails";
import ShoppingList from "./ShoppingList";

const SideBar = () => {
  const sidebar = useAtomValue(sidebarAtom);
  const isSidebarOpen = useAtomValue(isSideBarOpenAtom);
  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-[0%]" : "translate-x-[100%]"
      } fixed right-0 top-0 bottom-0 w-[calc(100%-3.5rem)] md:w-[20rem] h-full lg:sticky lg:translate-x-[0%] transition-transform duration-300 overflow-x-hidden`}
    >
      <Transition
        show={sidebar === "CreateShoppingList"}
        enter="-translate-x-[-100%] duration-300"
        enterFrom="-translate-x-[-100%]"
        enterTo="translate-x-0"
        leave=" translate-x-[100%] duration-100"
        leaveFrom=" translate-x-[100%]"
        leaveTo="-translate-x-[-100%]"
      >
        <CreateShoppingList />
      </Transition>
      <Transition
        show={sidebar === "CreateNewItem"}
        enter="-translate-x-[-100%] duration-300"
        enterFrom="-translate-x-[-100%]"
        enterTo="translate-x-0"
        leave=" translate-x-[100%] duration-100"
        leaveFrom=" translate-x-[100%]"
        leaveTo="-translate-x-[-100%]"
      >
        <CreateNewItem />
      </Transition>
      <Transition
        show={sidebar === "ItemDetails"}
        enter="-translate-x-[-100%] duration-300"
        enterFrom="-translate-x-[-100%]"
        enterTo="translate-x-0"
        leave=" translate-x-[100%] duration-100"
        leaveFrom=" translate-x-[100%]"
        leaveTo="-translate-x-[-100%]"
      >
        <ItemDetails />
      </Transition>
      <Transition
        show={sidebar === "ShoppingList"}
        enter="-translate-x-[-100%] duration-300"
        enterFrom="-translate-x-[-100%]"
        enterTo="translate-x-0"
        leave=" translate-x-[100%] duration-100"
        leaveFrom=" translate-x-[100%]"
        leaveTo="-translate-x-[-100%]"
      >
        <ShoppingList />
      </Transition>
    </div>
  );
};

export default SideBar;
