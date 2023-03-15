import Head from "next/head";
import DashboardLayout from "../Layouts/Index";
import ItemList from "../components/home/ItemList";
import Header from "../components/home/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Shoppingify</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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