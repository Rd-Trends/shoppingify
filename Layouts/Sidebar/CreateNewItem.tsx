import { Combobox, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetAtom } from "jotai";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsChevronBarDown, BsChevronBarUp } from "react-icons/bs";

import Button from "../../components/Button";
import Input from "../../components/Input";
import CreateNewCategory from "../../components/sidebarCreateNewItem/CreateNewCategory";
import useCategories from "../../hooks/useCategories";
import useItems from "../../hooks/useItems";
import { item } from "../../interface";
import { itemSchema } from "../../schema";
import { sidebarAtom } from "../../store";
import { motion } from "framer-motion";
import { SidebarAnimation } from "../../utils/variants";

const CreateNewItem = () => {
  const [query, setQuery] = useState("");
  const { categories } = useCategories();
  const { addNewItems: updateItems } = useItems();
  const setSidebar = useSetAtom(sidebarAtom);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<item>({
    resolver: yupResolver(itemSchema),
    defaultValues: { category: "" },
  });

  const filteredCategories = useMemo(() => {
    return categories?.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, categories]);

  const createItem = handleSubmit(async (data) => {
    const response = await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newItem = await response.json();
    updateItems(newItem);
    reset();
  });

  return (
    <motion.div
      variants={SidebarAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="py-8 px-4 h-screen bg-white lg:bg-transparent overflow-y-auto"
    >
      <h1 className=" text-xl font-medium mb-8">Add a new item</h1>
      <form onSubmit={createItem} className="flex flex-col justify-between">
        <div>
          <Input
            id="name"
            label="Name"
            placeholder="Enter a name"
            className="mb-4 py-3 border-2"
            {...register("name")}
          />
          {errors?.name && (
            <p className="w-full -mt-3 mb-3 text-red">{errors.name.message}</p>
          )}

          <Input
            tag="textarea"
            id="name"
            label="Note (optional)"
            className="mb-4 border-2"
            placeholder="Enter a note"
            rows={4}
            {...register("note")}
          />

          <Input
            id="image"
            label="Image (optional)"
            placeholder="Enter a url"
            className="mb-4 py-3 border-2"
            {...register("image")}
          />
          {errors?.image && (
            <p className="w-full -mt-3 mb-3 text-red">{errors.image.message}</p>
          )}

          <Controller
            render={({ field }) => (
              <Combobox as="div" {...field}>
                <Combobox.Label className="text-sm mb-1 block font-medium">
                  Category
                </Combobox.Label>
                <div className="w-full px-4 flex justify-between border-2 border-[#BDBDBD] rounded-md">
                  <Combobox.Input
                    className=" py-3 bg-transparent outline-none"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="select category"
                    //@ts-expect-error
                    displayValue={(id) =>
                      //@ts-expect-error
                      categories?.find((category) => category._id == id)?.name
                    }
                  />
                  <Combobox.Button>
                    <BsChevronBarUp />
                    <BsChevronBarDown />
                  </Combobox.Button>
                </div>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Combobox.Options className="bg-white px-2 py-1 w-full mt-[1rem] rounded-md max-h-52 overflow-y-auto">
                    {filteredCategories?.length ? (
                      filteredCategories.map((category, index) => {
                        return (
                          <Combobox.Option
                            key={category._id}
                            value={category._id}
                            className="py-3 px-4 rounded-md ui-active:bg-body_bg "
                          >
                            {category.name}
                          </Combobox.Option>
                        );
                      })
                    ) : (
                      <CreateNewCategory query={query} setQuery={setQuery} />
                    )}
                  </Combobox.Options>
                </Transition>
              </Combobox>
            )}
            control={control}
            name="category"
            defaultValue={""}
          />
          {errors?.category && (
            <p className="w-full mt-1 mb-3 text-red">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="w-full flex items-center justify-center mt-8 md:mt-12 space-x-4">
          <button
            className=" font-medium hover:font-bold"
            onClick={(e) => {
              e.preventDefault();
              setSidebar("CreateShoppingList");
            }}
          >
            cancel
          </button>
          <Button>Save</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateNewItem;
