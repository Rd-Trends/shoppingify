import { useSetAtom } from "jotai";

import { shoppingList, shoppingListItem } from "../interface";
import { createShoppingListAtom } from "../store";

const useShoppingListItems = () => {
  const setShoppingList = useSetAtom(createShoppingListAtom);

  const increase = (
    shoppingList: shoppingList,
    shoppingListItem: shoppingListItem
  ) => {
    return {
      ...shoppingList,
      items: shoppingList.items.map((item) => {
        if (item.item._id === shoppingListItem.item._id) {
          item.quantity++;
        }
        return item;
      }),
    };
  };

  const addItemToShoppingList = (shoppingListItem: shoppingListItem) => {
    setShoppingList((shoppingList) => {
      const itemExists = shoppingList.items.find(
        (item) => item.item._id === shoppingListItem.item._id
      );
      if (itemExists) {
        return increase(shoppingList, shoppingListItem);
      } else {
        return {
          ...shoppingList,
          items: [...shoppingList.items, shoppingListItem],
        };
      }
    });
  };

  const incrementQuantity = (shoppingListItem: shoppingListItem) => {
    setShoppingList((shoppingList) => {
      return increase(shoppingList, shoppingListItem);
    });
  };

  const decrementQuantity = (shoppingListItem: shoppingListItem) => {
    setShoppingList((shoppingList) => {
      return {
        ...shoppingList,
        items: shoppingList.items.map((item) => {
          if (
            item.item._id === shoppingListItem.item._id &&
            item.quantity > 1
          ) {
            item.quantity--;
          }
          return item;
        }),
      };
    });
  };

  const deleteItem = (shoppingListItem: shoppingListItem) => {
    setShoppingList((shoppingList) => {
      return {
        ...shoppingList,
        items: shoppingList.items.filter(
          (item) => item.item._id !== shoppingListItem.item._id
        ),
      };
    });
  };

  return {
    addItemToShoppingList,
    incrementQuantity,
    decrementQuantity,
    deleteItem,
  };
};

export default useShoppingListItems;
