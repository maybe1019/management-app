import React from 'react';
import { CheckBall, ErrorBall } from '@secberus/icons';
import { Text } from '../../';
import { ControlsMain } from './Controls.types';
import {
  ControlContainer,
  ControlRow,
  ControlTextContainer,
  ControlDivider,
  ControlsContent,
} from './Controls.styled';

export const ControlsSubwidget: React.FC<ControlsMain> = ({ pass, fail }) => (
  <ControlContainer>
    <ControlsContent>
      <ControlRow>
        <ControlTextContainer>
          <CheckBall height="20" width="20" />
          <Text type="small-bold" color="gray">
            Pass
          </Text>
        </ControlTextContainer>

        <span>{pass}</span>
      </ControlRow>
      <ControlDivider />
      <ControlRow>
        <ControlTextContainer>
          <ErrorBall height="20" width="20" />
          <Text type="small-bold" color="gray">
            Fail
          </Text>
        </ControlTextContainer>

        <span>{fail}</span>
      </ControlRow>
    </ControlsContent>
  </ControlContainer>
);
