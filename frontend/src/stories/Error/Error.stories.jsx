import React from "react";
import Error from "../../components/Error/Error";
import "../../css/root.css";
import "../../css/global.css";

export default {
  title: "Coffee/Error",
  component: Error,
};

const Template = (args) => <Error {...args} />;

export const Index = Template.bind({});
