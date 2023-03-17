import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineBars, AiOutlineReload } from "react-icons/ai";
import { MdOutlineAnalytics, MdOutlineShoppingCart } from "react-icons/md";

import Tooltip from "../components/Tooltip";
import { createShoppingListAtom, isSideBarOpenAtom } from "../store";

const Nav = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSideBarOpenAtom);
  const shoppingList = useAtomValue(createShoppingListAtom);

  const itemTotal = shoppingList.items.length
    ? shoppingList.items.reduce((total, list) => {
        return list.quantity + total;
      }, 0)
    : 0;

  return (
    <nav className="w-[3.5rem] md:w-20 bg-white h-screen sticky top-0 flex flex-col justify-between items-center py-4 md:py-8">
      <Image
        src="/assets/logo.svg"
        alt=""
        width={40}
        height={40}
        priority={true}
        quality={100}
      />

      <div className="[&>*]:my-12 [&>*]:block ">
        <Link
          href="/"
          className={`w-[3.5rem] md:w-20 border-4 border-transparent ${
            router.asPath === "/" ? "border-l-yellow" : "border-transparent"
          } py-2 relative`}
        >
          <AiOutlineBars size={20} color="#454545" className="mx-auto block" />
          <Tooltip text="items" />
        </Link>
        <Link
          href="/history"
          className={`w-[3.5rem] md:w-20 border-4 border-transparent ${
            router.asPath === "/history"
              ? "border-l-yellow"
              : "border-transparent"
          } py-2 relative`}
        >
          <AiOutlineReload
            size={20}
            color="#454545"
            className="mx-auto block"
          />
          <Tooltip text="history" />
        </Link>
        <Link
          href="/statistics"
          className={`w-[3.5rem] md:w-20 border-4 border-transparent ${
            router.asPath === "/statistics"
              ? "border-l-yellow"
              : "border-transparent"
          } py-2 relative`}
        >
          <MdOutlineAnalytics
            size={20}
            color="#454545"
            className="mx-auto block"
          />
          <Tooltip text="statistics" />
        </Link>
      </div>

      <button
        className=" relative bg-yellow w-11 h-11 rounded-full flex items-center justify-center"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <MdOutlineShoppingCart size={20} />
        <span className="absolute py-[2px] px-[6px] -top-1 -right-1 text-[10px] rounded-sm bg-red text-white">
          {itemTotal}
        </span>
      </button>
    </nav>
  );
};

export default Nav;
