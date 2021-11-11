import React from 'react';
import {Meta, Story} from '@storybook/react';
import styled from 'styled-components';

import * as interface_icons from './components/interface-icons-list';
import * as module_icons from './components/module-icons-list';

export default {
  title: 'Components/Icons',
  component: interface_icons.IconAdd,
} as Meta;

const InterfaceList: Story = args => (
  <IconListContainer>
    {Object.entries(interface_icons).map(([name, Icon]) => (
      <IconContainer>
        <Icon />
        <span>{name}</span>
      </IconContainer>
    ))}
  </IconListContainer>
);

const ModuleList: Story = args => (
  <IconListContainer>
    {Object.entries(module_icons).map(([name, Icon]) => (
      <IconContainer>
        <Icon />
        <span>{name}</span>
      </IconContainer>
    ))}
  </IconListContainer>
);

export const Interface = InterfaceList.bind({});
export const Module = ModuleList.bind({});

const IconListContainer = styled.div.attrs({
  className: 'flex flex-wrap grid grid-cols-4 gap-4',
})``;

const IconContainer = styled.div.attrs({
  className: 'flex flex-col items-center justify-center p-2',
})``;
