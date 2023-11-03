import { AnyFn } from '@secberus/utils';
import { Control } from 'react-hook-form';
import React from 'react';

export type Interval = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type ReportType = 'OVERVIEW' | 'COMPLIANCE';

export type ReportScheduleWithRecords = {
  interval: {
    id: Interval;
    label: string;
  };
  emails: any[];
  type: ReportType;
  name: string;
  header_image?: string;
  include_recommendations?: boolean;
  frameworks?: string[];
  datasources?: string[];
};

export type ModalStep = {
  title: string;
  name: string;
  RenderComponent: React.ElementType;
  key: string;
};

export interface SteppedReportingModalProps {
  isEdit?: boolean;
  onClose?: AnyFn;
}

export type StepComponentRefType = Record<string, number>;

export interface ReportFormProps extends SteppedReportingModalProps {
  control?: Control;
  register: any;
  errors: any;
  onDelete?: (...args: any) => void;
  handleEdit?: (...args: any) => void;
  report: ReportScheduleWithRecords;
  handleSubmit: AnyFn;
  handleStepIncrement?: (arg: string | number) => any;
  isCompleted: boolean;
  isCurrent: boolean;
  name: string;
  setStepComponentRef: React.Dispatch<
    React.SetStateAction<StepComponentRefType>
  >;
}
