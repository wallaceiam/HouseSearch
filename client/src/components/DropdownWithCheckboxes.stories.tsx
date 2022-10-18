import React, { useCallback, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DropdownWithCheckboxes from "./DropdownWithCheckboxes";

export default {
  title: "components/DropdownWithCheckboxes",
  component: DropdownWithCheckboxes,
} as ComponentMeta<typeof DropdownWithCheckboxes>;

const Template: ComponentStory<typeof DropdownWithCheckboxes> = (args) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const toggleSelectedItem = useCallback(
    (v: string) => {
      if (selectedItems.includes(v)) {
        setSelectedItems(selectedItems.filter((s) => s !== v));
      } else {
        setSelectedItems([...selectedItems, v]);
      }
    },
    [selectedItems, setSelectedItems]
  );

  const props = { ...args, selectedItems, onItemSelected: toggleSelectedItem };

  return (
    <div className="p-5 bg-gray-50 dark:bg-gray-800">
      <DropdownWithCheckboxes {...props} />
    </div>
  );
};

export const Empty = Template.bind({});
Empty.args = {};

export const Standard = Template.bind({});
Standard.args = {
  label: "Rating",
  items: {
    "4": "Inadequate",
    "3": "Requires improvement",
    "2": "Good",
    "1": "Outstanding",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Rating",
  items: {
    "4": "Inadequate",
    "3": "Requires improvement",
    "2": "Good",
    "1": "Outstanding",
  },
  disabled: true
};

const largeItems = Array.from(Array(100).keys()).reduce((prev, cur) => {
  prev[`${cur + 1}`] = `Item ${cur + 1}`;
  return prev;
}, {} as any);
console.log(largeItems);

export const LargeNumberOfItems = Template.bind({});
LargeNumberOfItems.args = {
  label: "Larget number of items",
  items: largeItems
};
