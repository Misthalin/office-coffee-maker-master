import React from "react";
import CoffeeInfo from "../components/Coffee/CoffeeInfo/CoffeeInfo";
import "../css/root.css";
import "../css/global.css";

export default {
  title: "Coffee/Coffee Info",
  component: CoffeeInfo,
};

const Template = (args) => <CoffeeInfo {...args} />;

export const Index = Template.bind({});
Index.args = {
  brewedAt: new Date(),
  litersBrewed: 1.6,
  typeOfCoffee: "Evergood Classic",
  coffeeLeft: "Unknown",
};
