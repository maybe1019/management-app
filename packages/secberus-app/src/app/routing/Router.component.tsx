import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { orgPrefix } from './paths';
import { RouteGate } from './RouteGate.component';
import { routes } from './routes';

export const Router: React.FC = () => {
  return (
    <Switch>
      {routes.map(props => {
        let path: any = props.path;
        if (props.type === 'PROTECTED') {
          path = props.path?.includes(orgPrefix) ? path : orgPrefix + path;
        }
        return <RouteGate key={`${props.path}`} {...props} path={path} />;
      })}
      <Redirect to="/404" />
    </Switch>
  );
};
