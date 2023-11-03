import React from 'react';
import { Download } from '@secberus/icons';
import {
  Button,
  Text,
  BaseModal,
  RadioGroup,
  RadioProps,
} from '@secberus/components';
import {
  RequestCsvExportApiArg,
  RequestPoliciesCsvApiArg,
  RequestPolicyViolationsCsvApiArg,
  secberusApiGW,
} from '@secberus/services';
import styled from 'styled-components';
import { Flex } from '@chakra-ui/react';
import { useSelf } from '../../app/core/wrappers/WithFindSelf';

type ReportType = 'risk' | 'violations' | 'compliance' | 'policyViolations';

const StyledModal = styled(BaseModal)`
  width: 490px;

  .radio-group {
    margin-left: 0;
  }
  background-color: ${({ theme }) => theme.colors.white};
`;

const Confirmation = ({ onClose }: { onClose: (arg: boolean) => void }) => {
  const { email } = useSelf();
  return (
    <StyledModal
      handleClose={() => onClose(false)}
      title="Report generation in progress"
    >
      <Flex gridGap="48px" flexDirection="column">
        <Text type="small-regular">
          The report you requested is being generated. You will receive an email
          to <b>{email}</b> when your report is ready to download.
        </Text>
        <Button variant="primary" onClick={() => onClose(false)}>
          Close
        </Button>
      </Flex>
    </StyledModal>
  );
};

const Error = ({ onClose }: { onClose: () => void }) => (
  <StyledModal handleClose={onClose} title="Error generating report">
    <Flex gridGap="48px" flexDirection="column">
      <Text type="small-regular">
        Something went wrong generating your report. Please try again. If the
        issue persists, contact support.
      </Text>
      <Button variant="primary" onClick={onClose}>
        Close
      </Button>
    </Flex>
  </StyledModal>
);

const reportOptionsMap: Partial<Record<ReportType, RadioProps>> = {
  risk: {
    label: 'Policy list',
    subtext: 'Table data as shown on screen (.csv)',
  },
  violations: {
    label: 'Violation list',
    subtext: 'List of violations from enabled policies (.csv)',
  },
};

type SelectExportCSVProps = {
  onSubmit: (arg: ReportType) => void;
  onCancel: () => void;
  types: ReportType[];
  isLoading: boolean;
};
const SelectExportCSV = ({
  types,
  onSubmit,
  onCancel,
  isLoading,
}: SelectExportCSVProps) => {
  const [selected, setSelected] = React.useState<string | number>(types[0]);

  const handleSubmit = () => {
    onSubmit(selected as ReportType);
  };

  return (
    <StyledModal
      handleClose={onCancel}
      title="Choose report format"
      loading={isLoading}
    >
      <RadioGroup
        name="report-type"
        options={types.map((t, idx) => ({
          checked: selected === t,
          label: reportOptionsMap[t]?.label ?? '',
          subtext: reportOptionsMap[t]?.subtext ?? '',
          value: t,
        }))}
        onChange={e => setSelected(e.target.value)}
      />
      <Flex marginTop="48px" gridGap="8px">
        <Button variant="primary" onClick={handleSubmit}>
          Generate report
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Flex>
    </StyledModal>
  );
};

type ExportCSVProps = {
  type: ReportType | ReportType[];
  arg:
    | RequestPolicyViolationsCsvApiArg
    | RequestPoliciesCsvApiArg
    | RequestCsvExportApiArg;
};

export const ExportCSV: React.FC<ExportCSVProps> = ({ type, arg = {} }) => {
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const [openMultiSelectModal, setOpenMultiSelectModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const complianceMutation = secberusApiGW.useRequestCsvExportMutation();
  const policiesMutation = secberusApiGW.useRequestPoliciesCsvMutation();
  const violationsMutation = secberusApiGW.useRequestViolationsCsvMutation();
  const policyViolationsMutation =
    secberusApiGW.useRequestPolicyViolationsCsvMutation();

  const exportRequest = {
    risk: policiesMutation,
    violations: violationsMutation,
    compliance: complianceMutation,
    policyViolations: policyViolationsMutation,
  };

  const onClick = () => {
    if (typeof type === 'string') {
      handleExport(type);
    } else {
      setOpenMultiSelectModal(true);
    }
  };

  const handleExport = async (type: ReportType) => {
    setIsLoading(true);
    const resp = await exportRequest[type][0](arg as any);
    setIsLoading(false);
    if ('error' in resp) {
      setOpenErrorModal(true);
    } else {
      setOpenConfirmModal(true);
      if (openMultiSelectModal) setOpenMultiSelectModal(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={onClick}
        desc="Export to .csv"
        isLoading={isLoading}
        icon
      >
        <Download />
      </Button>
      {openErrorModal && <Error onClose={() => setOpenErrorModal(false)} />}
      {openConfirmModal && (
        <Confirmation onClose={() => setOpenConfirmModal(false)} />
      )}
      {openMultiSelectModal && (
        <SelectExportCSV
          onSubmit={handleExport}
          onCancel={() => setOpenMultiSelectModal(false)}
          types={type as ReportType[]}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
