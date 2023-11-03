import React from 'react';
import { CheckedMultiSelect } from '@secberus/components';
import { UserOrg } from '@secberus/services';
import { differenceBy } from 'lodash';
import { useSelf } from '../../app/core/wrappers/WithFindSelf';

type OrgPickerProps = {
  onChange: (orgs?: UserOrg[]) => void;
  exclude: UserOrg[];
  selectLimit?: number;
};
export const OrgPicker: React.FC<OrgPickerProps> = ({
  onChange,
  exclude,
  selectLimit,
}) => {
  const [selected, setSelected] = React.useState<string[]>();
  const { orgs } = useSelf();

  React.useEffect(() => {
    const _tempUntilMultiSelectUpdates = selected?.reduce((acc, curr) => {
      const org = orgs!.find(_org => _org.id! === curr);

      if (org) return acc.concat(org);

      return acc;
    }, [] as UserOrg[]);

    onChange && onChange(_tempUntilMultiSelectUpdates);
  }, [onChange, orgs, selected]);

  return (
    <CheckedMultiSelect
      name="organizations"
      data={differenceBy(orgs, exclude, 'id')}
      label="Organizations"
      displayKey="name"
      placeholder="Select organizations"
      selectAllLabel="Select all organizations"
      valueKey="id"
      value={selected}
      minItemsShown={5}
      onChange={setSelected}
      selectLimit={selectLimit}
    />
  );
};
