import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { BsDash, BsPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import useShoppingListItems from "../../hooks/useShoppingListItems";
import { shoppingListItem } from "../../interface";
import { AnimatePresence, motion } from "framer-motion";
import { createShoppingListAtom } from "../../store";

const NewShoppingListItem = ({
  shoppingListItem,
}: {
  shoppingListItem: shoppingListItem;
}) => {
  const { incrementQuantity, decrementQuantity, deleteItem } =
    useShoppingListItems();
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="flex items-start justify-between space-x-4 relative">
      <p className="text-sm md:text-lg font-medium">
        {shoppingListItem.item.name}
      </p>
      <button
        className="outline-none bg-transparent text-xs font-medium text-yellow border-2 border-yellow py-[2px] px-3 rounded-full"
        onClick={() => setShowControls(true)}
      >
        {shoppingListItem.quantity}pcs
      </button>
      <AnimatePresence mode="wait" initial={false}>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0  text-yellow bg-white rounded-xl flex items-center space-x-2"
          >
            <button
              className="border-none outline-none bg-yellow text-white py-3 px-2 rounded-xl"
              onClick={() => deleteItem(shoppingListItem)}
            >
              <MdDeleteOutline size={18} />
            </button>
            <button
              className="border-none outline-none"
              onClick={() => decrementQuantity(shoppingListItem)}
            >
              <BsDash size={20} />
            </button>
            <button
              className="text-xs font-medium text-yellow border-2 border-yellow py-[2px] px-3 rounded-full outline-none "
              onClick={() => setShowControls(false)}
            >
              {shoppingListItem.quantity} pcs
            </button>
            <button
              className="border-none outline-none pr-2"
              onClick={() => incrementQuantity(shoppingListItem)}
            >
              <BsPlus size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewShoppingListItem;
