import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { ChevronRightDark, TimesDark } from '@secberus/icons';
import { secberusApiGW, ComplianceFramework } from '@secberus/services';
import { Button, Text } from '@secberus/components';
import {
  FlexContainer,
  ComplianceFrameworkLabelContainer,
} from '../AddEditDetails.styled';

type FrameworkListItemProps = {
  framework: ComplianceFramework;
  onRemove: (frameworkId: string, index: number) => void;
  index: number;
};

type FrameworkListProps = {
  frameworks: ComplianceFramework[];
  onRemove: (frameworkId: string, index: number) => void;
};

const FrameworkListItem: React.FC<FrameworkListItemProps> = ({
  framework,
  onRemove,
  index,
}) => {
  const { data: ancestry, isLoading } =
    secberusApiGW.useGetControlAncestryQuery({
      controlId: framework.id!,
    });

  if (isLoading) return <Spinner />;
  return (
    <FlexContainer>
      <ComplianceFrameworkLabelContainer>
        <Flex flexWrap="wrap" alignItems="flex-end">
          {ancestry?.map(({ identifier }, idx) => (
            <>
              {idx ? <ChevronRightDark height="22px" width="22px" /> : ' '}
              <Text type="small-bold" color="white">
                {identifier}
              </Text>
            </>
          ))}
        </Flex>
        <Button
          icon
          variant="tertiary"
          size="small"
          onClick={() => onRemove(framework.id!, index)}
        >
          <TimesDark height="24px" width="24px" />
        </Button>
      </ComplianceFrameworkLabelContainer>
    </FlexContainer>
  );
};

export const FrameworkList: React.FC<FrameworkListProps> = ({
  frameworks,
  onRemove,
}) => {
  return (
    <>
      {frameworks?.map((framework, idx) => (
        <FrameworkListItem
          framework={framework}
          index={idx}
          onRemove={onRemove}
        />
      ))}
    </>
  );
};
