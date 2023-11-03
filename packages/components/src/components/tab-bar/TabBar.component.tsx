import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import classNames from 'classnames';
import {
  Switch,
  Route,
  useParams,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { StyledTabBar, Tab } from './TabBar.styled';
import { TabBarProps } from './TabBar.types';

interface ParamTypes {
  view: string;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  mode = 'light',
  className,
  hasChildren = true,
}) => {
  const params = useParams<ParamTypes>();
  const { pathname } = useLocation();

  const filteredTabs = Object.entries(tabs).filter(
    ([_k, value]) =>
      !Object.prototype.hasOwnProperty.call(value, 'show') || value?.show
  );

  const tabsFormatted = React.useMemo(
    () => (
      <>
        {filteredTabs.map(([key, value]) => {
          const withoutQueryParams = value.route.split('?')[0];
          const isActive = params.view === withoutQueryParams;
          return (
            <Tab
              key={key}
              to={value.route}
              className={classNames(
                {
                  [`active_${mode}`]: isActive,
                },
                `${mode}_tab`
              )}
              mode={mode}
            >
              <div>{value.title}</div>
            </Tab>
          );
        })}
      </>
    ),
    [filteredTabs, params.view, mode]
  );

  if (!hasChildren)
    return (
      <>
        <StyledTabBar
          mode={mode}
          className={classNames(className, `${mode}_tabbar`)}
        >
          {tabsFormatted}
        </StyledTabBar>
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          {filteredTabs.map(([key, value]) => {
            return (
              <Route key={key} path={value.path}>
                {value.component}
              </Route>
            );
          })}
        </Switch>
      </>
    );

  return (
    <Grid templateRows="repeat(10, 1fr)" h="100%">
      <GridItem rowSpan={1}>
        <StyledTabBar
          mode={mode}
          className={classNames(className, `${mode}_tabbar`)}
        >
          {tabsFormatted}
        </StyledTabBar>
      </GridItem>
      <GridItem rowSpan={9}>
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          {filteredTabs.map(([key, value]) => (
            <Route key={key} path={value.path}>
              {value.component}
            </Route>
          ))}
        </Switch>
      </GridItem>
    </Grid>
  );
};
