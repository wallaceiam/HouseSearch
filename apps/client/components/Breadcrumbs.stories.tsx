import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Breadcrumbs from './Breadcrumbs';

export default {
  title: 'component/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  crumbs: [
    {
      title: "Jobs",
    },
    {
      title: "Enginering",
      href: "/engineering",
    },
  ]
};
