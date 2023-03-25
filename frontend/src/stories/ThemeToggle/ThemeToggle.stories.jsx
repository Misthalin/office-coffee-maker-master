import React from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import "../../css/root.css";
import "../../css/global.css";

export default {
  title: "Coffee/Theme Toggle",
  component: ThemeToggle,
};

const Template = (args) => <ThemeToggle {...args} />;

export const Index = Template.bind({});
