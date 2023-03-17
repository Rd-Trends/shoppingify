import Head from "next/head";

import Header from "../components/home/Header";
import ItemList from "../components/home/ItemList";
import DashboardLayout from "../Layouts/Index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Items</title>
        <meta
          name="description"
          content="Create new shopping lists and new items"
        />
      </Head>
      <DashboardLayout>
        <main className="py-4 md:py-8 px-4 md:px-8 lg:px-12">
          <Header />
          <ItemList />
        </main>
      </DashboardLayout>
    </>
  );
}
