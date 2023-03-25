import React from "react";
import CoffeeDisplay from "./CoffeeDisplay";
import "../../css/root.css";
import "../../css/global.css";

export default {
  title: "Coffee/Coffee Display",
  component: CoffeeDisplay,
};

const Template = (args) => <CoffeeDisplay {...args} />;

export const Index = Template.bind({});
Index.args = {
  brewedAt: new Date(),
  typeOfBean: "Evergood",
  litresWater: 1.6,
  grindingSettings: 5,
  rating: 3,
};
