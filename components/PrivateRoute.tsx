import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import useUser from "../hooks/useUser";
import Loader from "./Loader";
// import Loader from "./Loader";

interface props {
  protectedRoutes?: string[];
  children: React.ReactNode;
}

const PrivatRoute = ({ protectedRoutes, children }: props) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const pathIsProtected = protectedRoutes?.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!user && !isLoading && pathIsProtected) {
      router.push("/login");
    }
  }, [user, isLoading, router, pathIsProtected]);

  if (isLoading && !user && pathIsProtected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex items-center space-x-4 mb-2">
          <Image src="/assets/logo.svg" alt="" width={40} height={40} />
          <span className="text-yellow text-3xl font-bold">Shoppingify</span>
        </div>
        <div className="h-[100px]">
          <Loader />
        </div>
      </div>
    );
  }

  return <>{pathIsProtected ? user && children : children} </>;
};

export default PrivatRoute;
