import React, { useCallback, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Breadcrumbs from "./Breadcrumbs";

export default {
  title: "components/Breadcrumbs",
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => {
  return (
    <div className="p-5 bg-gray-50 dark:bg-gray-800">
      <Breadcrumbs {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const LocalAuthority = Template.bind({});
LocalAuthority.args = {
  localAuthority: "Nottinghamshire",
};

export const SchoolType = Template.bind({});
SchoolType.args = {
  localAuthority: "Nottinghamshire",
  schoolType: "Full day care",
};


