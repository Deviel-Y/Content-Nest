import { Button, Card, Divider, Input, Link } from "@nextui-org/react";
import { AiOutlineEye, AiOutlineKey, AiOutlineMail } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <form className="w-2/3">
        <Card isBlurred className="flex flex-col p-5" shadow="lg">
          <h1 className="font-bold text-[25px]">Login</h1>

          <p className="text-[13px] mt-2 mb-5">
            Log in to your account to continue
          </p>

          <Button variant="bordered" className="mb-3">
            <FcGoogle size={28} /> Continue with Google
          </Button>

          <Button variant="bordered" className="mb-5">
            <DiGithubBadge size={28} /> Continue with Github
          </Button>

          <div className="flex flex-row align-middle justify-center my-5">
            <Divider className="w-2/5 self-center" />
            <p className="text-sm text-gray-500 mx-3">Or</p>
            <Divider className="w-2/5 self-center" />
          </div>

          <Input
            startContent={<AiOutlineMail size={19} />}
            type="email"
            className="mb-3"
            label="Email Address"
            placeholder="Enter Your Email"
            variant="underlined"
          />

          <Input
            startContent={<AiOutlineKey size={19} />}
            endContent={<AiOutlineEye size={19} />}
            type="Password"
            label="Password"
            placeholder="Enter Your Password"
            variant="underlined"
          />
          <p className="text-blue-700 text-sm mt-4 text-end">
            Forget Password?
          </p>

          <Button variant="solid" color="primary" className="mt-7">
            Log In
          </Button>

          <p className="text-sm text-center mt-3">
            Need to create an account?{"  "}
            <Link size="sm" href="#">
              Sign Up
            </Link>
          </p>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
