"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Divider, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiFillEyeInvisible,
  AiOutlineEye,
  AiOutlineMail,
} from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { DiGithubBadge } from "react-icons/di";
import { FcGoogle } from "react-icons/fc";
import { signInUserSchema, SignInUserSchemaType } from "../validationSchema";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInUserSchemaType>({
    resolver: zodResolver(signInUserSchema),
  });
  return (
    <div className="w-full flex justify-center items-center">
      <form
        className="w-2/3"
        onSubmit={handleSubmit((data) => {
          signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: true,
            callbackUrl: "/",
          });
        })}
      >
        <Card isBlurred className="flex flex-col p-5" shadow="lg">
          <h1 className="font-bold text-[25px]">Login</h1>

          <p className="text-[13px] mt-2 mb-5">
            Log in to your account to continue
          </p>

          <Button
            onPress={() => {
              signIn("google", { redirect: true, callbackUrl: "/" });
            }}
            variant="bordered"
            className="mb-3"
          >
            <FcGoogle size={28} /> Continue with Google
          </Button>

          <Button
            onPress={() => {
              signIn("github", { redirect: true, callbackUrl: "/" });
            }}
            variant="bordered"
            className="mb-5"
          >
            <DiGithubBadge size={28} /> Continue with Github
          </Button>

          <div className="flex flex-row align-middle justify-center my-5">
            <Divider className="w-2/5 self-center" />
            <p className="text-sm text-gray-500 mx-3">Or</p>
            <Divider className="w-2/5 self-center" />
          </div>

          <Input
            {...register("email")}
            isRequired
            startContent={<AiOutlineMail size={19} />}
            type="email"
            className="mb-3 !transition-all"
            label="Email Address"
            placeholder="Enter Your Email"
            variant="underlined"
            isInvalid={!!errors.email?.message}
          />
          <p
            className={`${
              errors.email?.message?.length ? "opacity-100" : "opacity-0"
            } transition-opacity duration-250 ease-in-out -mt-3 mb-3 text-[13px] text-[#F31260] h-2`}
          >
            {errors.email?.message}
          </p>

          <Input
            {...register("password")}
            isRequired
            startContent={<BsKey size={19} />}
            endContent={
              <Button
                onPress={() => setIsVisible(!isVisible)}
                size="sm"
                isIconOnly
                type="button"
                radius="full"
              >
                {isVisible ? (
                  <AiFillEyeInvisible size={19} />
                ) : (
                  <AiOutlineEye size={19} />
                )}
              </Button>
            }
            type={isVisible ? "text" : "Password"}
            label="Password"
            placeholder="Enter Your Password"
            variant="underlined"
            isInvalid={!!errors.password?.message}
          />
          <p
            className={`${
              errors.password?.message?.length ? "opacity-100" : "opacity-0"
            } transition-opacity duration-250 ease-in-out text-[13px] text-[#F31260] h-2`}
          >
            {errors.password?.message}
          </p>

          <p className="text-blue-700 text-sm mt-4 text-end">
            Forget Password?
          </p>

          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
            variant="solid"
            color="primary"
            className="mt-7"
          >
            Log In
          </Button>

          <p className="text-sm text-center mt-3">
            Need to create an account?{"  "}
            <Link size="sm" href="/userSignup">
              Sign Up
            </Link>
          </p>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
