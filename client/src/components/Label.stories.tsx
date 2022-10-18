import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Label from "./Label";

export default {
  title: "components/Label",
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => (
  <div className="p-5 bg-gray-50 dark:bg-gray-800">
    <Label {...args} />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {
  label: "Label",
};

export const WithHtmlFor = Template.bind({});
WithHtmlFor.args = {
  label: "Label",
  htmlFor: "control-id",
};
