import React from 'react';
import { secberusApi } from '@secberus/services';
import { AnyFn } from '@secberus/utils';

export type PolicyControls = secberusApi.Policy['controls'];

export interface PolicyEditorProps {
  isLoading?: boolean;
  isFormSubmitting?: boolean;
  policy: Partial<secberusApi.Policy>;
  clone: any;
  onSubmit: AnyFn;
  onDelete: AnyFn;
  prevPath: string;
}

export interface PolicyEditorBlockProps {
  title?: string;
  text?: React.ReactNode;
  children?: React.ReactNode;
}
