import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LogosGcp } from '@secberus/icons';
import { IconTag } from '../../components';

export default {
  title: 'IconTag/IconTag',
  component: IconTag,
} as ComponentMeta<typeof IconTag>;

const Template: ComponentStory<typeof IconTag> = args => (
  <IconTag {...args}>{args.children}</IconTag>
);

export const IconTagBlock = Template.bind({});
IconTagBlock.args = {
  children: <LogosGcp />,
  value: '23',
  textProps: {
    type: 'xsmall',
  },
};
