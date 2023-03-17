import "../styles/output.css";

import { Quicksand } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import PrivateRoute from "../components/PrivateRoute";
import { fetcher } from "../utils/fetcher";

const quickSand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-quicksand",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${quickSand.variable} font-sans`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo.svg" />
      </Head>
      <SWRConfig value={{ fetcher }}>
        <PrivateRoute
          protectedRoutes={[
            "/",
            "/history",
            "/statistics",
            "/shopping-lists/[id]",
            "/test",
          ]}
        >
          <Component {...pageProps} />
        </PrivateRoute>
      </SWRConfig>
    </div>
  );
}
