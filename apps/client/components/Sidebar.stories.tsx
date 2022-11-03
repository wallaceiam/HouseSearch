import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Sidebar from './Sidebar';

export default {
  title: 'component/School Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar />;

export const Default = Template.bind({});
