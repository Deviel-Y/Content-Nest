import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-2 justify-center items-center">
      <div className="p-16">
        <p className="font-extrabold text-[70px]">CONTENT NEST</p>
        <p className="font-bold text-[27px]">
          Nest your content in happiness at Content Nest.
        </p>
        <p className="font-semibold text-[16px] mt-3">
          Nest your content in happiness at Content Nest, where every post is
          embraced by a positive and supportive community. It's a space designed
          for sharing your stories, connecting with like-minded people, and
          spreading joy. Here, your creativity thrives in an environment that
          celebrates the best moments of life.
        </p>
      </div>

      <div className="self-center mt-5">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
