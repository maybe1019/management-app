import React from 'react';
import { Box } from '@chakra-ui/react';
import { Text, TileSelect } from '@secberus/components';
import { Controller } from 'react-hook-form';
import { Section, EditLink, StyledTileWrapper } from '../ReportForm.styled';
import { OverviewSVG } from '../icons/Overview.svg';
import { ComplianceSVG } from '../icons/Compliance.svg';
import { ReportFormProps } from './StepsForm.types';

export const ReportSelectionForm: React.FC<ReportFormProps> = ({
  isEdit,
  report,
  control,
  handleEdit,
  isCompleted,
  isCurrent,
  handleStepIncrement,
}) => {
  const type = report?.type;

  const selectType = (onChange: () => void) => {
    onChange();
    handleStepIncrement?.('NEXT');
  };

  return (
    <>
      <Box display={isCompleted ? 'none' : isCurrent ? 'block' : 'none'}>
        <StyledTileWrapper
          direction="row"
          align="center"
          justify="space-around"
        >
          <Controller
            name="type"
            control={control}
            render={({ onChange }) => {
              return (
                <>
                  <TileSelect
                    onClick={e => {
                      e.preventDefault();
                      selectType(() => onChange('OVERVIEW'));
                    }}
                    label="Trends and metrics for the organization"
                  >
                    <OverviewSVG />
                    <Text type="bold" className="report-title">
                      Overview report
                    </Text>
                  </TileSelect>
                  <TileSelect
                    onClick={e => {
                      e.preventDefault();
                      selectType(() => onChange('COMPLIANCE'));
                    }}
                    label="Compliance details for all monitored data sources"
                  >
                    <ComplianceSVG />
                    <Text type="bold" className="report-title">
                      Compliance summary
                    </Text>
                  </TileSelect>
                </>
              );
            }}
          />
        </StyledTileWrapper>
      </Box>
      {isCompleted && (
        <>
          <Section className="report-type">
            <Text type="small-bold">Report type</Text>
            {!isEdit && <EditLink onClick={handleEdit}>Edit</EditLink>}
          </Section>
          <Text type="small-regular">
            {type === 'COMPLIANCE' ? 'Compliance summary' : 'Overview report'}
          </Text>
        </>
      )}
    </>
  );
};
