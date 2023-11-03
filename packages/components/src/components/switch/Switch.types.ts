import React from 'react';

export interface SwitchProps {
  className?: string;
  initialChecked?: boolean;
  initialLoading?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => any;
  updateCheckboxState?: (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => Promise<boolean | void>;
}
