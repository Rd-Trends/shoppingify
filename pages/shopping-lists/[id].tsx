import React, { Suspense, useEffect } from "react";
import DashboardLayout from "../../Layouts/Index";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { useSetAtom } from "jotai";
import ShoppingList from "../../components/shoppingLists";
import { sidebarAtom } from "../../store";

const ShoppingListPage = () => {
  const setSidebar = useSetAtom(sidebarAtom);

  useEffect(() => {
    setSidebar("ShoppingList");
  }, []);

  return (
    <DashboardLayout>
      <Suspense fallback={<h1>Loading</h1>}>
        <section className="py-4 md:py-8 px-4 md:px-8 lg:px-12">
          <Link
            className="bg-transparent flex items-center text-yellow"
            href="/history"
          >
            <BsArrowLeft /> <span className="ml-2 text-sm">back</span>
          </Link>
          <ShoppingList />
        </section>
      </Suspense>
    </DashboardLayout>
  );
};

export default ShoppingListPage;
