import React /* useContext */ from "react";
import CoffeeDisplay from "../Coffee/CoffeeDisplay/CoffeeDisplay";

const Home = ({ latestBrew }) => {
  return (
    <>
      <h1 className="text-center">Latest Coffee</h1>
      <CoffeeDisplay {...latestBrew} />
    </>
  );
};

export default Home;
