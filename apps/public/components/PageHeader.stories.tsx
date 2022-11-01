import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PageHeader from './PageHeader';

export default {
  title: 'component/PageHeader',
  component: PageHeader,
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => <PageHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Full Time Developer",
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
