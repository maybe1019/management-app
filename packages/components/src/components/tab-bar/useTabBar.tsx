import React from 'react';
import classNames from 'classnames';
import { Flex, Box } from '@chakra-ui/react';
import { useDeepMemo } from '@secberus/utils';
import { Tooltip } from '../tooltip';
import { Carousel } from '../carousel';
import { StyledTabBar, Tab, StyledTimesLight } from './useTabBar.styled';
import { Tabbar2Props } from './TabBar.types';

export const useTabBar = ({
  tabs,
  mode = 'light',
  defaultTabKey,
  defaultRender,
  customTabs,
  closeable = false,
  onTabClick,
  onTabClose,
  detachedTabBarContent,
  noMargin,
  tabWidth,
  useCarousel = false,
}: Tabbar2Props) => {
  const [currentTab, setCurrentTab] = React.useState<string>(
    defaultTabKey ?? Object.keys(tabs)[0]
  );

  const TabBarContent = tabs[currentTab]?.render ?? defaultRender;
  const BuiltTabBar = useDeepMemo(() => {
    return Object.entries(tabs).map(
      ([key, { title, onClick, closeable: tabCloseable, className }]) => (
        <Tab
          tabWidth={tabWidth}
          closeable={tabCloseable ?? closeable}
          key={key}
          className={classNames(
            currentTab === key ? `active_${mode}` : '',
            className
          )}
          onClick={() => {
            if (onTabClick) onTabClick(key);
            else {
              setCurrentTab(key);
              onClick?.(key);
            }
          }}
          data-tip={title}
          data-for={key}
        >
          <Tooltip
            id={key}
            place="bottom"
            {...(title?.length > 50 ? { longText: true } : {})}
          />
          <span className="tab-title">{title}</span>
          {(tabCloseable ?? closeable) && (
            <Box
              onClick={e => {
                e.stopPropagation();
                onTabClose?.(key);
              }}
              className="close-tab"
              padding="2px"
              borderRadius="100%"
            >
              <StyledTimesLight width="20px" height="20px" />
            </Box>
          )}
        </Tab>
      )
    );
  }, [closeable, currentTab, mode, onTabClose, tabWidth, tabs]);

  return {
    currentTab,
    setCurrentTab,
    TabBar: (
      <>
        <StyledTabBar
          tabWidth={tabWidth}
          closeable={closeable}
          className={`${mode}_tabbar tabbar-container`}
          noMargin={noMargin}
          useCarousel={useCarousel}
        >
          {useCarousel ? (
            <Carousel items={BuiltTabBar} />
          ) : (
            BuiltTabBar.map(c => c)
          )}
          {customTabs && (
            <Flex height="40px" mt="4px" mb="4px" gridGap="8px">
              {customTabs.map(renderCustomTab => renderCustomTab)}
            </Flex>
          )}
        </StyledTabBar>
        {!detachedTabBarContent ? TabBarContent : null}
      </>
    ),
    TabBarContent: detachedTabBarContent ? TabBarContent : null,
  };
};
