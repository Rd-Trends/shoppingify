import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../Input";
import { itemQueryAtom } from "../../store";
import { useSetAtom } from "jotai";

const Header = () => {
  const setItemQuery = useSetAtom(itemQueryAtom);
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between space-y-4 md:space-y-0 md:space-x-8 mb-8 md:mb-12">
      <h1 className="text-lg md:text-2xl font-bold text-font_color md:w-8/12 lg:w-7/12">
        <span className="text-yellow font-bold">Shoppingify</span> allows you to
        take your shopping list wherever you go
      </h1>
      <div className="flex items-center bg-white rounded-xl pl-4">
        <AiOutlineSearch size={20} />
        <Input
          type="text"
          className="bg-transparent border-none outline-none py-3 px-4"
          placeholder="Search item"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItemQuery(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Header;
