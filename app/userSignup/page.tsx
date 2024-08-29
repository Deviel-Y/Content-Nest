import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 justify-center items-center">
      <div className="p-16 max-lg:p-12 max-md:hidden">
        <h1 className="font-extrabold text-[70px] max-lg:text-[50px]">
          CONTENT NEST
        </h1>
        <p className="font-bold text-[27px]">
          Nest your content in happiness at Content Nest.
        </p>
        <article className="font-semibold text-[16px] mt-3">
          Nest your content in happiness at Content Nest, where every post is
          embraced by a positive and supportive community. It&apos;s a space
          designed for sharing your stories, connecting with like-minded people,
          and spreading joy. Here, your creativity thrives in an environment
          that celebrates the best moments of life.
        </article>
      </div>

      <div className="mt-10">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
