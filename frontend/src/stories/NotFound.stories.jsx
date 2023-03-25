import React from "react";
import NotFound from "../components/NotFound/NotFound";
import "../css/root.css";
import "../css/global.css";

export default {
  title: "Coffee/Not Found",
  component: NotFound,
};

const Template = (args) => <NotFound {...args} />;

export const Index = Template.bind({});
