import { useParams } from 'react-router-dom';
import { LoadingOverlay } from '@secberus/components';
import { Grid, GridItem } from '@chakra-ui/react';
import { policiesApi2 } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { HeaderComponent } from './header/Header.component';
import { RequiredPolicy, TabBarComponent } from './tab-bar/TabBar.component';

const PolicyDetails = () => {
  const { id }: { id: string } = useParams();

  const {
    data,
    isLoading: isGetPoliciesLoading,
    isUninitialized: isGetPoliciesUninit,
  } = policiesApi2.useGetPolicyQuery(
    {
      id,
    },
    {
      skip: !id,
    }
  );

  const isLoading = useIsLoading([isGetPoliciesLoading, isGetPoliciesUninit]);

  if (isLoading) return <LoadingOverlay />;

  return (
    <Grid w="100%" h="100%" templateRows="repeat(5, 1fr)">
      <GridItem height="100%" rowSpan={1} bg="#F1F6FA" padding="32px">
        <HeaderComponent policy={data as RequiredPolicy} />
      </GridItem>
      <GridItem height="100%" rowSpan={2}>
        <TabBarComponent policy={data as RequiredPolicy} />
      </GridItem>
    </Grid>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <PolicyDetails />
  </ErrorBoundary>
);

export { WithBoundary as PolicyDetailsScreen };

export default WithBoundary;
