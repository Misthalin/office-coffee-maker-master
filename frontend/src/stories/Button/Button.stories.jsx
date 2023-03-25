import React from "react";

import Button from "../../components/Button/Button";
import "./Button.css";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Coffee/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      options: ["small", "long", "initial"],
      control: { type: "radio" },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  title: "Button",
  disabled: false,
};
export const Long = Template.bind({});
Long.args = {
  title: "Button",
  variant: "long",
  disabled: false,
};
export const Small = Template.bind({});
Small.args = {
  title: "Button",
  variant: "small",
  disabled: false,
};
export const Inverted = Template.bind({});
Inverted.args = {
  title: "Button",
  variant: "inverted",
  disabled: false,
};
export const Disabled = Template.bind({});
Disabled.args = {
  title: "Button",
  disabled: true,
};
