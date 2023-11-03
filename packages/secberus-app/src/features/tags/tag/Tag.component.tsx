import React from 'react';
import { Times } from '@secberus/icons';
import { Tooltip } from '@secberus/components';
import {
  TagContainer,
  TagText,
  TimesContainer,
  DataKeyTagText,
} from './Tag.styled';

interface TagProps {
  onClick: (e: any) => void;
  value?: string;
  close?: boolean;
}
export const Tag: React.FC<TagProps> = ({
  onClick,
  close = true,
  value,
  children,
}) => {
  const kv = value?.split(':');
  const [key, ...val] = kv || [];

  return (
    <TagContainer data-for={value} data-tip={value} onClick={onClick}>
      <TagText type="xsmall-regular">
        {children ? (
          children
        ) : kv?.length && kv.length >= 2 ? (
          <DataKeyTagText>
            {key}: <b>{val.length > 1 ? val.join(':') : val}</b>
          </DataKeyTagText>
        ) : (
          value
        )}
      </TagText>
      {close && (
        <TimesContainer>
          <Times height="16px" width="16px" />
        </TimesContainer>
      )}
      {value && <Tooltip id={value} place="top" />}
    </TagContainer>
  );
};
