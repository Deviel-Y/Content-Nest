import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 justify-stretch items-center">
      <div className="p-24 max-lg:p-12 max-md:hidden">
        <h1 className="font-extrabold text-[70px] max-lg:text-[50px]">
          CONTENT NEST
        </h1>
        <p className="font-bold text-[28px]">
          Where smiles and content find their nest.
        </p>
        <article className="font-semibold text-[16px] mt-3">
          Content Nest is where smiles and creativity come together. It&apos;s a
          welcoming community where your content finds its perfect home, and
          every post spreads joy. Nest your content here, and let it thrive in a
          space that celebrates positivity and connection.
        </article>
      </div>

      <div className="mt-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
