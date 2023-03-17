import { useSetAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import CancelShoopingListModal from "../../components/sidebarShoppingList/CancelListModal";
import ShoppingListItemList from "../../components/sidebarShoppingList/ShoppingListItemList";
import { shoppingListItem, shoppingListStatus } from "../../interface";
import Source from "../../public/assets/source.svg";
import { shoppingListAtom, sidebarAtom } from "../../store";

const ShoppingList = () => {
  const shoppingList = useAtomValue(shoppingListAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const updateShoppingListItem = async (items: shoppingListItem[]) => {
    await fetch(`/api/shopping-lists/${shoppingList?._id}`, {
      method: "PATCH",
      body: JSON.stringify({ items }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw err;
      });
    return;
  };

  const cancelShoppingList = async () => {
    await fetch(`/api/shopping-lists/${shoppingList?._id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: shoppingListStatus.cancelled }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => router.push("/history"))
      .catch((err) => {
        throw err;
      });
    return;
  };

  const completeShoppingList = async () => {
    await fetch(`/api/shopping-lists/${shoppingList?._id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: shoppingListStatus.completed }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => router.push("/history"))
      .catch((err) => {
        throw err;
      });
    return;
  };

  const setSidebar = useSetAtom(sidebarAtom);
  return (
    <div className="bg-light_purple h-screen pt-8 flex flex-col relative ">
      <div className=" bg-purple rounded-3xl flex items-start py-4 space-x-8 mx-8">
        <Image
          src={Source}
          alt=""
          width={70}
          height={150}
          priority
          quality={100}
          className="-mt-8 h-full"
        />
        <div>
          <p className="text-white mb-4">{"Didn't find what you want?"}</p>
          <Button color="default" onClick={() => setSidebar("CreateNewItem")}>
            Add item
          </Button>
        </div>
      </div>

      {shoppingList?.items.length ? (
        <div className=" h-full overflow-y-auto mt-8 py-4 px-8 flex flex-col space-y-4">
          <div className="flex justify-between space-x-8 items-start">
            <p className=" text-xl font-bold text-font_color">
              {shoppingList.name}
            </p>
            <button className="pt-2">
              <MdModeEdit />
            </button>
          </div>
          <ShoppingListItemList
            items={shoppingList.items}
            updateShoppingListItem={updateShoppingListItem}
          />
        </div>
      ) : (
        <Loader />
      )}

      <div className="bg-white sticky z-[1] bottom-0 flex items-center space-x-4 justify-center h-[12rem] px-8 ">
        <button
          className=" font-semibold hover:font-bold"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          cancel
        </button>
        <button
          className="bg-cyan text-white border-2 border-cyan rounded-xl py-2 px-4 hover:bg-transparent hover:text-cyan"
          onClick={completeShoppingList}
        >
          Complete
        </button>
      </div>

      <CancelShoopingListModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        cancelShoppingList={cancelShoppingList}
      />
    </div>
  );
};

export default ShoppingList;
