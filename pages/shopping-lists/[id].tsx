import React, { useEffect } from "react";
import DashboardLayout from "../../Layouts/Index";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { useSetAtom } from "jotai";
import ShoppingList from "../../components/shoppingLists";
import { shoppingListAtom, sidebarAtom } from "../../store";
import { useRouter } from "next/router";
import useSWR from "swr";
import { shoppingList } from "../../interface";
import Loader from "../../components/Loader";
import Head from "next/head";

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
