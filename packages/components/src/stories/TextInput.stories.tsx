import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Search } from '@secberus/icons';
import { Input } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/TextInput',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = args => (
  <div style={{ width: 330 }}>
    <Input {...args} />
  </div>
);

export const Default = Template.bind({});
export const WithIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const props = {
  placeholder: 'Search organizations',
};

Default.args = { ...props };
WithIcon.args = {
  ...props,
  icon: <Search width="24px" height="24px" color="#6A6A88" />,
  iconPlacement: 'left',
};
