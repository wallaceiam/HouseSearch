import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Pie from "./Pie";

export default {
  title: "components/charts/Pie",
  component: Pie,
} as ComponentMeta<typeof Pie>;

const Template: ComponentStory<typeof Pie> = (args) => (
  <div className="bg-gray-50 dark:bg-gray-800">
    <Pie className="w-72 h-72" {...args} />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {
  roundStrokes: false,
  data: [],
};

const max = 10;

export const Mixed = Template.bind({});
Mixed.args = {
  roundStrokes: false,
  data: [
    { label: "Quality of education", value: Math.floor(Math.random() * max) },
    { label: "Behaviour &\n attitudes", value: Math.floor(Math.random() * max) },
    { label: "Personal development", value: Math.floor(Math.random() * max) },
    { label: "Leadership &\n management", value: Math.floor(Math.random() * max) },
    { label: "Safeguarding", value: Math.floor(Math.random() * max) },
  ],
};
