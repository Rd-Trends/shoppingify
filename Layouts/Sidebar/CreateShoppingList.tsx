import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { motion } from "framer-motion";

import Button from "../../components/Button";
import NewShoppingListItemList from "../../components/sidebarCreateShoppingList/ItemList";
import { shoppingListStatus } from "../../interface";
import Source from "../../public/assets/source.svg";
import NoItemInCart from "../../public/assets/undraw_shopping_app_flsj 1.svg";
import { createShoppingListAtom, sidebarAtom } from "../../store";
import { SidebarAnimation } from "../../utils/variants";

const CreateShoppingList = () => {
  const [shoppingList, setShoppingList] = useAtom(createShoppingListAtom);
  const router = useRouter();
  const [isProcessing, setisProcessing] = useState(false);

  const createShoppingList = async () => {
    setisProcessing(true);
    const res = await fetch("/api/shopping-lists", {
      method: "POST",
      body: JSON.stringify(shoppingList),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      // reset
      setShoppingList({
        name: "Shopping List",
        items: [],
        status: shoppingListStatus.active,
      });
      setisProcessing(false);
      router.push("/history");
    } else setisProcessing(false);
  };

  const setSidebar = useSetAtom(sidebarAtom);
  return (
    <motion.div
      variants={SidebarAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-light_purple h-screen pt-8 flex flex-col relative "
    >
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

      {shoppingList.items.length ? (
        <div className=" h-full overflow-y-auto mt-8 py-4 px-8 flex flex-col space-y-4">
          <div className="flex justify-between space-x-8 items-start">
            <p className=" text-xl font-bold text-font_color">
              {shoppingList.name}
            </p>
            <button className="pt-2">
              <MdModeEdit />
            </button>
          </div>
          <NewShoppingListItemList items={shoppingList.items} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center relative h-full">
          <p className="mb-[15rem]">No items</p>
          <Image
            src={NoItemInCart}
            alt=""
            width={200}
            height={100}
            className="absolute z-[2] -bottom-[1rem] "
          />
        </div>
      )}

      <div className="bg-white sticky z-[1] bottom-0 flex flex-col justify-center h-[12rem] px-8">
        <div
          className={` border-2 ${
            shoppingList.items.length ? "border-yellow" : "border-[#C1C1C4]"
          } rounded-[14px]  flex items-center justify-between px-0 transition-colors duration-300`}
        >
          <input
            type="text"
            className="py-3 outline-none border-none bg-transparent w-full px-4 disabled:text-[#C1C1C4] "
            placeholder="Enter a name"
            disabled={Boolean(!shoppingList.items.length) || isProcessing}
            onChange={(e) =>
              setShoppingList((shoppingList) => {
                return { ...shoppingList, name: e.target.value };
              })
            }
          />
          <button
            disabled={Boolean(!shoppingList.items.length) || isProcessing}
            className="disabled:bg-[#C1C1C4] bg-yellow hover:opacity-70 h-full w-[8rem] max-w-[40%] transition-colors duration-300 rounded-xl flex items-center justify-center text-white border-none outline-none"
            onClick={createShoppingList}
          >
            {!isProcessing ? (
              "save"
            ) : (
              <span className=" w-5 h-5 border-4 border-gray-200 border-b-transparent rounded-full animate-spin"></span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateShoppingList;
