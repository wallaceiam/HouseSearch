import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Radar from "./Radar";

export default {
  title: "components/charts/Radar",
  component: Radar,
} as ComponentMeta<typeof Radar>;

const Template: ComponentStory<typeof Radar> = (args) => (
  <div className="p-5 bg-gray-50 dark:bg-gray-800">
    <Radar className="w-48 h-48" {...args} />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {
  axis: [
    "Outstanding",
    "Good",
    "Requires Improvement",
    "Inadequet",
  ],
  roundStrokes: false,
  labels: [
    "Quality of education",
    "Behaviour &\n attitudes",
    "Personal development",
    "Leadership &\n management",
    "Safeguarding",
  ],
  data: [
    {
      label: "",
      points: [1, 1, 1, 1, 1],
    },
  ],
};

export const Mixed = Template.bind({});
Mixed.args = {
  axis: [
    "Outstanding",
    "Good",
    "Requires Improvement",
    "Inadequet",
  ],
  roundStrokes: false,
  labels: [
    "Quality of education",
    "Behaviour &\n attitudes",
    "Personal development",
    "Leadership &\n management",
    "Safeguarding",
  ],
  data: [
    {
      label: "",
      points: [4, 3, 2, 1, 0],
    },
  ],
};
