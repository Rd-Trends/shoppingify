import React from "react";
import TopCategories from "../components/statistics/TopCategories";
import TopItems from "../components/statistics/TopItems";
import DashboardLayout from "../Layouts/Index";
import useShoppingLists from "../hooks/useShoppingLists";
import MonthlySummary from "../components/statistics/MonthlySummary";

const Statistics = () => {
  const { shoppingLists } = useShoppingLists();
  return (
    <DashboardLayout>
      <main className="py-4 md:py-8 px-4 md:px-8 lg:px-12">
        <div className="space-y-12 md:flex md:items-start md:justify-between md:space-y-0 md:gap-16 mb-12 md:mb-16">
          <TopItems shoppingLists={shoppingLists} />
          <TopCategories shoppingLists={shoppingLists} />
        </div>
        <MonthlySummary shoppingLists={shoppingLists} />
      </main>
    </DashboardLayout>
  );
};

export default Statistics;
