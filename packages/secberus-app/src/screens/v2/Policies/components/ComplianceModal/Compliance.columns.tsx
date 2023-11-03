import React from 'react';
import { constructUseColumnsHook, Radio, Text } from '@secberus/components';
import { UseFormMethods } from 'react-hook-form';
import {
  RequirementRow,
  CellData,
  ComplianceOption,
} from '../../Form/AddEditPolicy/AddEditPolicy.styled';
import {
  MaybeComplianceControlOrFrameworkWithTracking,
  isControl,
} from '../../../../../utils/flattenFramework';

export const useColumns = ({ register }: Pick<UseFormMethods, 'register'>) =>
  constructUseColumnsHook<MaybeComplianceControlOrFrameworkWithTracking>([
    {
      key: 'id',
      title: 'Control ID',
      cellContent: ({ row }) => {
        const label = isControl(row) ? row.identifier! : row.name!;
        return (
          // @ts-expect-error component not typed
          <RequirementRow depth={row.depth - 1} maxDepth={10}>
            {/* @ts-expect-error component not typed */}
            <CellData depth={row.depth}>
              {row.depth > 1 ? (
                <>
                  {!row.children?.length ? (
                    <ComplianceOption>
                      <Radio
                        id={row.id}
                        name="framework"
                        value={row.id}
                        ref={register}
                        //@ts-expect-error generated type mismatch with available info
                        label={`${row.ordinal} ${label}`}
                      />
                    </ComplianceOption>
                  ) : (
                    <Text type="small-bold" color="dark">
                      {/* @ts-expect-error generated type mismatch with available info */}
                      {`${row.ordinal} ${label}`}
                    </Text>
                  )}
                </>
              ) : (
                <Text type="small" color="dark">
                  {label}
                </Text>
              )}
            </CellData>
          </RequirementRow>
        );
      },
    },
  ])();
