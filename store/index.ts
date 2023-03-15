import { atom } from "jotai";
import { item, shoppingList, shoppingListStatus } from "../interface";

export const isSideBarOpenAtom = atom(false);

export const itemQueryAtom = atom("");

export const sidebarAtom = atom<
  "ShoppingList" | "CreateNewItem" | "ItemDetails" | "CreateShoppingList"
>("CreateShoppingList");

export const itemInItemDetailsAtom = atom<item | undefined>(undefined);

export const createShoppingListAtom = atom<shoppingList>({
  items: [],
  name: "Shopping List",
  status: shoppingListStatus.active,
});

export const shoppingListAtom = atom<shoppingList | undefined>(undefined);
