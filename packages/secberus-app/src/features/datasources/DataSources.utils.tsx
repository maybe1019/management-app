import React from 'react';
import { Route, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import { RESOURCE_LOGO_BY_DATASOURCE } from '@secberus/components';
import { settingsPaths } from '../settings/routes';
import { AzureForm } from './Forms/azure/Azure.form';
import { AwsForm } from './Forms/aws/Aws.form';
import { GcpForm } from './Forms/gcp/Gcp.form';
import { GithubForm } from './components/github/components/Github.form';
import { GithubConfirm } from './components/github/components/Github.confirm';
import { datasourcePaths } from './routes';

interface FormOption {
  component: React.ElementType;
  logo: React.ElementType;
  label: string;
  dp: string;
  callbackComponent?: React.ElementType | React.FC | (() => JSX.Element);
}

export const formOptions: Record<string, FormOption> = {
  aws: {
    component: AwsForm,
    logo: RESOURCE_LOGO_BY_DATASOURCE.aws,
    label: 'AWS',
    dp: 'aws',
  },
  azure: {
    component: AzureForm,
    logo: RESOURCE_LOGO_BY_DATASOURCE.azure,
    label: 'Azure',
    dp: 'az',
  },
  gcp: {
    component: GcpForm,
    logo: RESOURCE_LOGO_BY_DATASOURCE.gcp,
    label: 'GCP',
    dp: 'gcp',
  },
  github: {
    component: GithubForm,
    logo: RESOURCE_LOGO_BY_DATASOURCE.github,
    label: 'Github',
    dp: 'github',
    callbackComponent: () => (
      <GithubConfirm redirectTo="/settings/data-sources" />
    ),
  },
};

export const useFormRoutes = (isDetailsPage = false) => {
  const { path } = useRouteMatch();
  const { datasourceId } = useParams<{ datasourceId?: string }>();
  const history = useHistory();

  const handleFormClose = (value: any) => {
    const baseUrl = `${settingsPaths.base}${datasourcePaths.datasourceManagement}`;

    if (typeof value === 'boolean' && value) {
      // The user confirms delete operation
      history.push(baseUrl);
    } else {
      history.push(
        `${baseUrl}${
          isDetailsPage ? `/data-source/details/${datasourceId}` : ''
        }`
      );
    }
  };

  const formRoutes = Object.entries(formOptions).reduce(
    (
      acc: JSX.Element[],
      [formType, { component: Component, callbackComponent: CallbackComponent }]
    ) => {
      if (CallbackComponent) {
        acc.push(
          <Route
            exact
            path={`/(org)?/:orgId?/settings/data-sources/form/${formType}/callback`}
            key={formType + '/callback'}
          >
            <CallbackComponent isOpen onRequestClose={handleFormClose} />
          </Route>
        );
      }

      acc.push(
        <Route path={`${path}/form/${formType}/(edit)?/:id?`} key={formType}>
          <Component isOpen onRequestClose={handleFormClose} />
        </Route>
      );

      return acc;
    },
    []
  );

  return formRoutes;
};
