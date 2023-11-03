import React from 'react';
import classNames from 'classnames';
import { Org, UserOrg, useGetAccountMetaQuery } from '@secberus/services';
import { ClickAwayListener } from '@secberus/components';
import { ServiceDown, Settings } from '@secberus/icons';
import { useAppDispatch, useTypedSelector, addNotification } from '../../store';
import { selectCurrentOrg } from '../organization/slice';
import { useSelf } from '../../app/core/wrappers/WithFindSelf';
import { ORG_PATH_REGEX } from '../organization/constants';
import { ORG_EVENTS, orgBroadcastChannel } from '../organization/orgListener';
import { usePermissions } from '../../app/rbac/definitions';
import { useAppRedirect } from '../../utils/useAppRedirect';
import { DEFAULT_ADMIN_ROUTE_PATH } from '../../app/routing/constants';
import { useClearFilters } from '../../hooks/useClearFilter';
import { OrganizationMenu } from './components/organization-menu/OrganizationMenu.component';
import {
  AnimatedIcon,
  Container,
  OrgName,
  SelectTrigger,
  AccountDisplayName,
  TextContainer,
} from './OrganizationSelect.styled';
import { OrganizationSelectProps } from './OrganizationSelect.types';

export const OrganizationSelect = ({
  dark,
  disabled,
  transformName,
}: OrganizationSelectProps) => {
  const dispatch = useAppDispatch();
  const currentOrg: UserOrg | undefined = useTypedSelector(selectCurrentOrg);
  const self = useSelf();
  const { accountOwner } = usePermissions();
  const { navigateTo } = useAppRedirect();

  const { data: accountMeta } = useGetAccountMetaQuery();

  const [dropdownListOpen, setDropdownListOpen] = React.useState(false);
  const controlRef = React.useRef<HTMLDivElement | null>(null);
  const [selected] = React.useState<Org>(
    currentOrg ?? { id: 'no-orgs', name: 'No orgs...' }
  );

  const isDisabled = React.useMemo(
    () => disabled || !currentOrg || self.orgs?.length === 0,
    [currentOrg, disabled, self.orgs?.length]
  );

  const { clearAllFilters } = useClearFilters();

  // TODO: will determine if this (include using preventScroll on Layout component) is still needed after integrated w/ both sidebars
  // const handleOnToggle = (isOpen: boolean) => {
  //   dispatch(setVisible({ key: 'sideNavOrgSelectList', value: isOpen }));
  // };

  const orgSwitch = React.useCallback(
    async (org: Org, notify?: boolean) => {
      const channel = orgBroadcastChannel();
      const newLocation = window.location.href.replace(
        ORG_PATH_REGEX,
        `/org/${org.id}`
      );
      window.location.assign(newLocation);

      channel.postMessage({
        event: ORG_EVENTS.userOrgChange,
        message: 'User initiated organization change',
      });
      if (notify)
        dispatch(
          addNotification({
            type: 'success',
            value: 'Organization has been updated',
          })
        );
    },
    [dispatch]
  );

  const handleOrgSwitch = (org: Org, notify?: boolean) => {
    clearAllFilters();
    orgSwitch(org, notify);
  };

  const toggleDropdownList = () => {
    setDropdownListOpen(prev => !prev);
  };

  return (
    <Container id="org-select-container">
      <ClickAwayListener onClickAway={() => setDropdownListOpen(false)}>
        <SelectTrigger
          id="org-select-trigger"
          ref={controlRef}
          role="button"
          className={classNames({
            dark,
            active: dropdownListOpen,
            disabled: isDisabled,
          })}
          onClick={!isDisabled ? toggleDropdownList : undefined}
        >
          <TextContainer>
            <OrgName>
              {transformName ? transformName(selected?.name) : selected?.name}
            </OrgName>
            <AccountDisplayName>{accountMeta?.name ?? '-'}</AccountDisplayName>
          </TextContainer>
          <AnimatedIcon open={dropdownListOpen}>
            <ServiceDown className="icon top-icon" width="10px" height="10px" />
            <ServiceDown
              className="icon bottom-icon"
              width="10px"
              height="10px"
            />
          </AnimatedIcon>
        </SelectTrigger>

        {dropdownListOpen && (
          <OrganizationMenu
            controlRef={controlRef}
            orgs={self.orgs ?? []}
            selected={selected}
            onSelected={handleOrgSwitch}
            actionItem={{
              label: 'Manage account',
              icon: <Settings width="24px" height="24px" />,
              show: accountOwner,
              onClick: () => navigateTo(DEFAULT_ADMIN_ROUTE_PATH),
            }}
            transformName={transformName}
          />
        )}
      </ClickAwayListener>
    </Container>
  );
};
