import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
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
    return <h1>loading</h1>;
  }

  return <>{pathIsProtected ? user && children : children} </>;
};

export default PrivatRoute;
