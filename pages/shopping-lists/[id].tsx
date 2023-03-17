import { useSetAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import useSWR from "swr";

import Loader from "../../components/Loader";
import ShoppingList from "../../components/shoppingLists";
import { shoppingList } from "../../interface";
import DashboardLayout from "../../Layouts/Index";
import { shoppingListAtom, sidebarAtom } from "../../store";

const ShoppingListPage = () => {
  const setSidebar = useSetAtom(sidebarAtom);
  const setShoppingList = useSetAtom(shoppingListAtom);

  const router = useRouter();

  const { data: shoppingList, isLoading } = useSWR<shoppingList>(
    router.query.id ? `/api/shopping-lists/${router.query.id}` : null
  );

  useEffect(() => {
    if (shoppingList) {
      setShoppingList(shoppingList);
    }
  }, [shoppingList]);

  useEffect(() => {
    setSidebar("ShoppingList");
    return () => setSidebar("CreateShoppingList");
  }, []);

  return (
    <DashboardLayout>
      <Head>
        <title>{shoppingList?.name}</title>
      </Head>
      {!isLoading ? (
        <section className="py-4 md:py-8 px-4 md:px-8 lg:px-12">
          <Link
            className="bg-transparent flex items-center text-yellow"
            href="/history"
          >
            <BsArrowLeft /> <span className="ml-2 text-sm">back</span>
          </Link>
          <ShoppingList shoppingList={shoppingList} />
        </section>
      ) : (
        <div className="absolute right-1/2 translate-x-full lg:-translate-x-full top-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
    </DashboardLayout>
  );
};

export default ShoppingListPage;
