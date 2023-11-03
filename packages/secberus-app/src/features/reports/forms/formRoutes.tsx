import React from 'react';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import { AnyFn } from '@secberus/utils';
import { SteppedReportingModal } from './SteppedReportingModal';

interface FormOption {
  component: React.ElementType;
  name: string;
}

const EditReportForm: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  return <SteppedReportingModal isEdit onClose={onRequestClose} />;
};

const AddReportForm: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  return <SteppedReportingModal onClose={onRequestClose} />;
};

const formOptions: FormOption[] = [
  {
    component: AddReportForm,
    name: 'add',
  },
  {
    component: EditReportForm,
    name: 'edit',
  },
];

export const useFormRoutes = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleFormClose = () => {
    history.push('/reports');
  };

  const formRoutes = formOptions.reduce(
    (acc: JSX.Element[], { component: Component, name }) => {
      acc.push(
        <Route path={`${path}/${name}/(edit)?/:reportId?`} key={name}>
          <Component onRequestClose={handleFormClose} />
        </Route>
      );
      return acc;
    },
    []
  );

  return formRoutes;
};
