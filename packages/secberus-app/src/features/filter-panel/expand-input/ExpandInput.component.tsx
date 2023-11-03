import React from 'react';
import { Search } from '@secberus/icons';
import { Button } from '@secberus/components';
import { InputSearchComponent } from '../search-input/InputSearchComponent';
import { InputSearchComponentProps } from '../search-input/InputSearchComponent.types';
import { Container } from './ExpandInput.styled';

export type ExpandInputProps = Omit<
  React.ComponentProps<typeof Button>,
  'onChange'
> &
  InputSearchComponentProps;

export const ExpandInput: React.FC<ExpandInputProps> = ({
  onChange,
  id,
  value,
  ...rest
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    if (value) {
      setIsExpanded(true);
    }
  }, [value]);

  const onClose = () => {
    setIsExpanded(false);
  };

  return (
    <Container id={id}>
      <Button
        variant="secondary"
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={isExpanded ? 'hidden' : ' '}
        desc="Search"
        icon
      >
        <Search height="24px" width="24px" />
      </Button>
      <InputSearchComponent
        value={value}
        onChange={onChange}
        className={isExpanded ? '' : 'hidden'}
        onClose={onClose}
        expands
        {...rest}
      />
    </Container>
  );
};
