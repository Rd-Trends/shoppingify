import Head from "next/head";
import React from "react";

import Loader from "../components/Loader";
import MonthlySummary from "../components/statistics/MonthlySummary";
import TopCategories from "../components/statistics/TopCategories";
import TopItems from "../components/statistics/TopItems";
import useShoppingLists from "../hooks/useShoppingLists";
import DashboardLayout from "../Layouts/Index";

const Statistics = () => {
  const { shoppingLists, isLoading } = useShoppingLists();

  return (
    <DashboardLayout>
      <Head>
        <title>Statistics</title>
      </Head>
      {!isLoading ? (
        <main className="py-4 md:py-8 px-4 md:px-8 lg:px-12">
          {shoppingLists?.length ? (
            <>
              <div className="space-y-12 md:flex md:items-start md:justify-between md:space-y-0 md:gap-16 mb-12 md:mb-16">
                <TopItems shoppingLists={shoppingLists} />
                <TopCategories shoppingLists={shoppingLists} />
              </div>
              <MonthlySummary shoppingLists={shoppingLists} />
            </>
          ) : (
            <div className="flex items-center justify-center py-16">
              <p className="text-xl font-medium text-center max-w-md">
               No statistics to show yet
              </p>
            </div>
          )}
        </main>
      ) : (
        <div className="absolute right-1/2 translate-x-full lg:-translate-x-full top-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Statistics;
