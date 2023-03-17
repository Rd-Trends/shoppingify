import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { BsCalendar2Event, BsChevronRight } from "react-icons/bs";

import { shoppingList } from "../../interface";

interface props {
  shoppingList: shoppingList;
}

const ShoppingListCard = ({ shoppingList }: props) => {
  const statusClassname = clsx(
    "py-[2px] px-2 text-sm rounded-lg border font-medium",
    {
      "text-yellow border-yellow": shoppingList.status === "active",
      "text-red border-red": shoppingList.status === "cancelled",
      "text-cyan border-cyan": shoppingList.status === "completed",
    }
  );
  return (
    <div className="py-4 px-4 rounded-lg bg-white flex items-center justify-between space-x-6">
      <div className=" w-full flex flex-col md:flex-row space-y-2 md:items-center justify-between">
        <h3 className=" text-base font-medium">{shoppingList.name}</h3>
        <div className="flex items-center space-x-4">
          <p className="flex items-center space-x-2 text-sm text-grey">
            <BsCalendar2Event size={20} />
            <span>
              {dayjs(shoppingList.createdAt).format("ddd DD.MM.YYYY")}
            </span>
          </p>
          <p className={statusClassname}>{shoppingList.status}</p>
        </div>
      </div>
      <Link href={`/shopping-lists/${shoppingList._id}`}>
        <BsChevronRight size={20} className="text-yellow" />
      </Link>
    </div>
  );
};

export default ShoppingListCard;
