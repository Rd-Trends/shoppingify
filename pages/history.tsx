import DashboardLayout from "../Layouts/Index";
import ShoppingList from "../components/history/ShoppingList";
import Head from "next/head";

const History = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>History</title>
      </Head>
      <main className="py-4 md:py-8 px-4 md:px-8 lg:px-12">
        <h1 className="text-2xl md:text-2xl text-font_color font-bold mb-8">
          Shopping history
        </h1>
        <ShoppingList />
      </main>
    </DashboardLayout>
  );
};

export default History;
