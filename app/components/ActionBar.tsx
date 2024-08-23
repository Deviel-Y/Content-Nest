import SearchBox from "./SearchBox";

const ActionBar = () => {
  return (
    <div className="my-5 grid grid-cols-2">
      <div className="w-1/2 ps-5">
        <SearchBox />
      </div>
    </div>
  );
};

export default ActionBar;
