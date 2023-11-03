import React from 'react';
import { Box } from '@chakra-ui/react';
import { MenuPortal, Text, Input } from '@secberus/components';
import { Org } from '@secberus/services';
import { Search, CheckMarkDark } from '@secberus/icons';
import {
  OrganizationMenuActionItem,
  OrganizationMenuProps,
} from './OrganizationMenu.types';
import {
  CardBody,
  CardContainer,
  CardFooter,
  OrgsDropdownList,
  OrgsListItem,
  StyledActionItem,
} from './OrganizationMenu.styled';

interface OrgIndexTable {
  [id: string]: number;
}

const ActionItem: React.FC<OrganizationMenuActionItem> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <StyledActionItem onClick={onClick ? onClick : undefined}>
      {icon}
      <Text type="small-bold">{label}</Text>
    </StyledActionItem>
  );
};

export const OrganizationMenu: React.FC<OrganizationMenuProps> = ({
  menuPortalTarget,
  controlRef,
  orgs,
  selected,
  onSelected,
  actionItem,
  transformName,
}) => {
  const maxListItems = 6;
  const listItemRefs = React.useRef<{ id: string; height: number }[]>([]);
  const activeListItemRef = React.useRef<HTMLLIElement | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dropdownHeight, setDropdownHeight] = React.useState(0);
  const Menu = menuPortalTarget ? MenuPortal : React.Fragment;

  const menuProps = menuPortalTarget
    ? { appendTo: menuPortalTarget, controlElement: controlRef?.current }
    : {};

  const handleSelect = (org: Org) => {
    if (typeof onSelected === 'function') {
      onSelected(org, false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleListItemRef = React.useCallback(
    (org: { id: string | undefined }) => (ref: HTMLLIElement | null) => {
      if (ref && !listItemRefs.current.some(o => o.id === org.id)) {
        listItemRefs.current.push({
          id: org.id as string,
          height: ref?.offsetHeight || 49,
        });
      }

      if (selected?.id === org.id) {
        activeListItemRef.current = ref;
      }
    },
    [selected?.id]
  );

  const filteredOrgs = React.useMemo(() => {
    const collator = new Intl.Collator(undefined, {
      ignorePunctuation: true,
      sensitivity: 'base',
    });

    // Filter and sort alphabetically by org name
    return orgs
      .filter(org =>
        org.name.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => collator.compare(a.name, b.name));
  }, [orgs, searchQuery]);

  const orgIndexTable: OrgIndexTable = React.useMemo(
    () =>
      filteredOrgs.reduce(
        (acc, org, index) => ({ ...acc, [org.id]: index }),
        {}
      ),
    [filteredOrgs]
  );

  React.useEffect(() => {
    const selectedIndex = selected?.id ? orgIndexTable[selected?.id] : 0;
    const startIndex =
      selectedIndex < maxListItems ? 0 : selectedIndex - maxListItems + 1;
    const items = listItemRefs.current
      .map(o => o.height)
      .slice(startIndex, startIndex + maxListItems);

    setDropdownHeight(items.reduce((a, b) => a + b, 0));
  }, [filteredOrgs, orgIndexTable, selected]);

  React.useEffect(() => {
    // On initial render, scroll to the selected item
    setTimeout(() => {
      if (activeListItemRef.current) {
        activeListItemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }, 150);
  }, []);

  return (
    <Menu {...menuProps}>
      <CardContainer id="org-select-menu">
        <CardBody>
          <Input
            noMargin
            autoFocus
            placeholder="Find organization"
            value={searchQuery}
            onChange={handleSearch}
            icon={<Search width="24px" height="24px" color="#6A6A88" />}
          />
          {filteredOrgs.length > 0 ? (
            <OrgsDropdownList maxHeight={dropdownHeight}>
              {filteredOrgs.map(org => {
                const isSelected = selected?.id === org.id;
                return (
                  <OrgsListItem
                    key={org.id}
                    ref={handleListItemRef(org)}
                    className={isSelected ? 'selected' : ''}
                    onClick={() => handleSelect(org)}
                  >
                    <Text type="small-bold" color="dark">
                      {transformName ? transformName(org.name) : org.name}
                    </Text>
                    {isSelected && <CheckMarkDark height="22px" width="22px" />}
                  </OrgsListItem>
                );
              })}
            </OrgsDropdownList>
          ) : (
            <Box padding="20px 16px 12px">
              <Text type="small-bold">No results...</Text>
            </Box>
          )}
        </CardBody>
        {actionItem && actionItem.show && (
          <CardFooter>
            <ActionItem {...actionItem} />
          </CardFooter>
        )}
      </CardContainer>
    </Menu>
  );
};
