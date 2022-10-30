import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropdownMenu from './DropdownMenu';

export default {
  title: 'component/DropdownMenu',
  component: DropdownMenu,
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = (args) => <DropdownMenu>Hello</DropdownMenu>;

export const Default = Template.bind({});
