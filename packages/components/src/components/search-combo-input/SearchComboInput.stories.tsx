import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Plus } from '@secberus/icons';
import { SearchComboInput } from './';

const books = [
  { author: 'Harper Lee', title: 'To Kill a Mockingbird' },
  { author: 'Lev Tolstoy', title: 'War and Peace' },
  { author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
  { author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
  { author: 'George Orwell', title: '1984' },
  { author: 'Jane Austen', title: 'Pride and Prejudice' },
  { author: 'Marcus Aurelius', title: 'Meditations' },
  { author: 'Fyodor Dostoevsky', title: 'The Brothers Karamazov' },
  { author: 'Lev Tolstoy', title: 'Anna Karenina' },
  { author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SearchDropdown',
  component: SearchComboInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof SearchComboInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchComboInput> = args => (
  <div>
    <div style={{ width: '300px' }}>
      <SearchComboInput {...args} />
    </div>
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  items: books,
  label: 'Name',
  onSelectItem(selectedItem) {
    console.log('selectedItem', selectedItem);
  },
  anchorListItemProps: {
    text: 'Create new user',
    icon: <Plus height="24px" width="24px" />,
    onClick: () => console.log('action!'),
  },
  itemToString(item: any) {
    return item ? item.title : '';
  },
  getItemFilterPredicate(inputValue?) {
    return (item: any) => {
      return (
        !inputValue ||
        item.title.toLowerCase().includes(inputValue) ||
        item.author.toLowerCase().includes(inputValue)
      );
    };
  },
};
