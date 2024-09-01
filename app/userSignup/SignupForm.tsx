"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Divider, Input, Link } from "@nextui-org/react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiFillEyeInvisible,
  AiOutlineEye,
  AiOutlineMail,
} from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signUpUserSchema, SignUpUserSchemaType } from "../validationSchema";

const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUserSchemaType>({
    resolver: zodResolver(signUpUserSchema),
  });
  return (
    <div className="w-full flex justify-center items-center">
      <form
        className="w-2/3"
        onSubmit={handleSubmit(({ email, password, confirmPassword }) => {
          axios
            .post("/api/user", { email, password, confirmPassword })
            .then(() => {
              signIn("credentials", { email, password });
              router.push("/");
            });
        })}
      >
        <Card isBlurred className="flex flex-col p-5" shadow="lg">
          <h1 className="font-bold text-[25px]">Create Account</h1>

          <p className="text-[13px] mt-2 mb-5">
            Sign up for a new account to get started
          </p>

          <Button
            onPress={() =>
              signIn("google", { redirect: true, callbackUrl: "/" })
            }
            variant="bordered"
            className="mb-3"
          >
            <FcGoogle size={28} /> Continue with Google
          </Button>

          <div className="flex flex-row align-middle justify-center my-2">
            <Divider className="w-2/5 self-center" />
            <p className="text-sm text-gray-500 mx-3">Or</p>
            <Divider className="w-2/5 self-center" />
          </div>

          <Input
            {...register("email")}
            isRequired
            startContent={<AiOutlineMail size={19} />}
            type="email"
            label="Email Address"
            placeholder="Enter Your Email"
            variant="underlined"
            isInvalid={!!errors.email?.message}
          />
          <p
            className={`${
              errors.email?.message?.length ? "opacity-100" : "opacity-0"
            } transition-opacity duration-250 ease-in-out text-[13px] text-[#F31260] h-2`}
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
            isInvalid={!!errors.password?.message}
            className="my-3"
            placeholder="Create a Password"
            variant="underlined"
          />
          <p
            className={`${
              errors.password?.message?.length ? "opacity-100" : "opacity-0"
            } transition-opacity duration-250 ease-in-out -mt-3 mb-5 text-[13px] text-[#F31260] h-2`}
          >
            {errors.password?.message}
          </p>

          <Input
            {...register("confirmPassword")}
            isRequired
            isInvalid={!!errors.confirmPassword?.message}
            type="Password"
            label="Password"
            placeholder="Confirm Your Password"
            variant="underlined"
          />
          <p
            className={`${
              errors.confirmPassword?.message?.length
                ? "opacity-100"
                : "opacity-0"
            } transition-opacity duration-250 ease-in-out text-[13px] text-[#F31260] h-2`}
          >
            {errors.confirmPassword?.message}
          </p>

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
            Already have an account?{"  "}
            <Link size="sm" href="/api/auth/signin">
              Log In
            </Link>
          </p>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
