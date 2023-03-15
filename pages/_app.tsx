import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "@next/font/google";
import PrivateRoute from "../components/PrivateRoute";
import { SWRConfig } from "swr";
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
      <SWRConfig value={{ fetcher }}>
        <PrivateRoute
          protectedRoutes={["/history", "/statistics", "/shopping-lists/[id]"]}
        >
          <Component {...pageProps} />
        </PrivateRoute>
      </SWRConfig>
    </div>
  );
}
