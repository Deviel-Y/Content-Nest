import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-2 justify-center items-center">
      <div className="p-24">
        <p className="font-extrabold text-[70px]">CONTENT NEST</p>
        <p className="font-bold text-[28px]">
          Where smiles and content find their nest.
        </p>
        <p className="font-semibold text-[16px] mt-3">
          Content Nest is where smiles and creativity come together. It&apos;s a
          welcoming community where your content finds its perfect home, and
          every post spreads joy. Nest your content here, and let it thrive in a
          space that celebrates positivity and connection.
        </p>
      </div>

      <div className="self-center mt-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
