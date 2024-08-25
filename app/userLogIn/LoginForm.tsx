"use client";

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

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();
  return (
    <div className="w-full flex justify-center items-center">
      <form
        className="w-2/3"
        onSubmit={handleSubmit((data) => {
          signIn("credentials", {
            email: data.email,
            password: data.password,
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
              signIn("google");
            }}
            variant="bordered"
            className="mb-3"
          >
            <FcGoogle size={28} /> Continue with Google
          </Button>

          <Button
            onPress={() => {
              signIn("github");
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
            className="mb-3"
            label="Email Address"
            placeholder="Enter Your Email"
            variant="underlined"
          />

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
          />
          <p className="text-blue-700 text-sm mt-4 text-end">
            Forget Password?
          </p>

          <Button
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
