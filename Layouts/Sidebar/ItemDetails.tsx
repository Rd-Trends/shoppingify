import React from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { BsArrowLeft } from "react-icons/bs";
import { itemInItemDetailsAtom, sidebarAtom } from "../../store";
import Button from "../../components/Button";
import Image from "next/image";
import useCategories from "../../hooks/useCategories";
import useItems from "../../hooks/useItems";
import useShoppingListItems from "../../hooks/useShoppingListItems";
import { item } from "../../interface";

const ItemDetails = () => {
  const setSidebar = useSetAtom(sidebarAtom);
  const { categories } = useCategories();
  const { deleItem: removeItem } = useItems();
  const { addItemToShoppingList } = useShoppingListItems();
  const item = useAtomValue(itemInItemDetailsAtom);

  const deleItem = async () => {
    await fetch(`/api/items/${item?._id}`, { method: "DELETE" })
      .then(() => {
        removeItem(item?._id!);
        setSidebar("CreateShoppingList");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="py-8 bg-white px-4 flex flex-col justify-between h-screen md:px-8">
      <div className="[&>*:not(:last-child)]:mb-8">
        <button
          className="bg-transparent flex items-center text-yellow"
          onClick={() => setSidebar("CreateShoppingList")}
        >
          <BsArrowLeft /> <span className="ml-2 text-sm">back</span>
        </button>

        {item?.image ? (
          <Image
            src={item.image}
            alt=""
            width={50}
            height={50}
            className=" w-full rounded-2xl "
          />
        ) : null}

        <div>
          <p className="text-grey font-medium mb-2 text-xs">Name</p>
          <p className=" text-font-color font-medium text-2xl">{item?.name}</p>
        </div>

        <div>
          <p className="text-grey font-medium mb-2 text-xs">Category</p>
          <p className="font-medium text-lg">
            {
              categories?.find((Category) => Category?._id === item?.category)
                ?.name
            }
          </p>
        </div>

        {item?.note ? (
          <div className="text-grey font-medium mb-2 text-xs">
            <p className=" ">Note</p>
            <p>{item.note}</p>
          </div>
        ) : null}
      </div>

      <div className="w-full flex items-center justify-center mt-8 md:mt-12 space-x-8">
        <button className=" font-semibold hover:font-bold " onClick={deleItem}>
          delete
        </button>
        <Button
          onClick={() => {
            addItemToShoppingList({
              item: item as item,
              quantity: 1,
              bought: false,
            });
            setSidebar("CreateShoppingList");
          }}
        >
          Add to List
        </Button>
      </div>
    </div>
  );
};

export default ItemDetails;
