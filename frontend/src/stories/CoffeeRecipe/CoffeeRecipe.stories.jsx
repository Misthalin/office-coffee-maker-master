import React from "react";
import CoffeeRecipe from "./CoffeeRecipe";
import "../../css/root.css";
import "../../css/global.css";

export default {
  title: "Coffee/Coffee Recipe",
  component: CoffeeRecipe,
};

const Template = (args) => <CoffeeRecipe {...args} />;

export const Index = Template.bind({});
Index.args = {
  grindingSettings: 7,
  litresWater: 1.6,
  coffeeBrand: "Evergood",
  rating: 3,
};
