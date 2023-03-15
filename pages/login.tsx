import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/Button";
import Input from "../components/Input";
import useUser from "../hooks/useUser";
import { loginData } from "../interface";
import { loginSchema } from "../schema";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user, mutate } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<loginData>({ resolver: yupResolver(loginSchema) });

  const handleLogin = handleSubmit(async (data) => {
    setLoading(true);
    clearErrors("customError");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const user = await response.json();
      setLoading(false);
      mutate(user);
      router.push("/");
    }
    if (response.status >= 400) {
      const err = await response.json();
      setLoading(false);
      setError("customError", { type: "custom", message: err.message });
    }
  });

  return (
    <section className=" flex flex-col items-center justify-center min-h-screen text-[#454545] bg-white md:bg-bg-body">
      <div className="bg-white md:shadow-2xl px-4 py-4 md:px-8 md:py-8 rounded-lg flex flex-col items-center w-full md:w-[450px]">
        <div className="flex flex-col items-center space-y-1">
          <Image src="/assets/logo.svg" alt="" width={40} height={40} />
          <h1 className=" text-2xl font-bold">Welcome back</h1>
          <p className=" font-medium">
            Enter your details to sign in to your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          action=""
          className="flex flex-col items-center my-4 w-full"
        >
          <Input
            label="email"
            placeholder="name@example.com"
            id="email"
            showLabel={false}
            aria-label="email"
            className="border-gray-300 mb-4"
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-left w-full -mt-3 mb-3  text-red">
              {errors.email.message}
            </p>
          )}

          <div className="mt-1 border border-gray-300 flex items-center rounded-md w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="********"
              className="block border-none w-full outline-none py-2 px-4 rounded-md bg-transparent"
              aria-label="password"
              {...register("password")}
            />
            <button
              className="mr-4 outline-none bg-transparent h-full py-2"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
          {errors?.password && (
            <p className="w-full -mt-3 mb-3 text-red">
              {errors.password.message}
            </p>
          )}

          <Button className="font-semibold w-full" loading={loading}>
            Login
          </Button>
          {errors?.customError && (
            <p className="mt-2 text-red">{errors?.customError?.message}</p>
          )}
        </form>

        <div className="h-4 border-b border-gray-500 text-center my-5 mb-8 w-full">
          <span className="px-3 bg-white uppercase text-sm">
            or continue with
          </span>
        </div>

        <Link
          href="/api/auth/google"
          className="flex items-center justify-center space-x-2 rounded-md border border-gray-300 py-2 w-full"
        >
          <FcGoogle size={25} />
          <span className=" font-bold">Google</span>
        </Link>

        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
