import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Logo from './Logo';

export default {
  title: 'component/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo />;

export const Default = Template.bind({});
