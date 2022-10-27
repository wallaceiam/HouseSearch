import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TopNav from './TopNav';

export default {
  title: 'component/TopNav',
  component: TopNav,
} as ComponentMeta<typeof TopNav>;

const Template: ComponentStory<typeof TopNav> = (args) => <TopNav />;

export const Default = Template.bind({});
