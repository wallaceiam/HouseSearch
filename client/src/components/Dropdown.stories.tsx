import React, { useCallback, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Dropdown from "./Dropdown";

export default {
  title: "components/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  // const toggleSelectedItem = useCallback(
  //   (v: number) => {
  //     console.log(v);
  //       setSelectedItem(selectedItem);
  //   },
  //   [selectedItem, setSelectedItem]
  // );

  const props = { ...args, selectedItem, onItemSelected: setSelectedItem };

  return (
    <div className="p-5 bg-gray-50 dark:bg-gray-800">
      <Dropdown {...props} />
    </div>
  );
};

export const Empty = Template.bind({});
Empty.args = {};

export const Standard = Template.bind({});
Standard.args = {
  label: "Rating",
  items: {
    4: "Inadequate",
    3: "Requires improvement",
    2: "Good",
    1: "Outstanding",
  },
  noneSelectedText: "Select"
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Rating",
  items: {
    4: "Inadequate",
    3: "Requires improvement",
    2: "Good",
    1: "Outstanding",
  },
  disabled: true
};

const largeItems = Array.from(Array(100).keys()).reduce((prev, cur) => {
  prev[`${cur + 1}`] = `Item ${cur + 1}`;
  return prev;
}, {} as any);

export const LargeNumberOfItems = Template.bind({});
LargeNumberOfItems.args = {
  label: "Larget number of items",
  items: largeItems
};
