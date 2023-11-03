import React from 'react';
import { useParams } from 'react-router';
import {
  SlidePanel,
  ViolationPanelProps,
  ViolationPanelComponent,
} from '@secberus/components';
import { policiesApi2, violationsApi, Violation } from '@secberus/services';
import { useIsLoading, useDeepEffect } from '@secberus/utils';
import { omit } from 'lodash';
import { useHistory } from 'react-router-dom';
import { logger } from 'workbox-core/_private';
import { useGetViolationPage } from '../../screens/v2/Policies/Details/tabs/hooks/useGetViolationsPage';
import { notifySuccess } from '../../store';
import moment from '.././../utils/moment';
import { useHasPermissions } from '../../app/abac/hooks/useHasPermissions';
import { ResourcesContext } from '../../app/core/wrappers/WithResources';

export const ViolationPanel: React.FC<
  ViolationPanelProps & { baseUrl: string }
> = props => {
  const { id: policyId, violationId } =
    useParams<{ id?: string; violationId: string }>();
  const history = useHistory();
  const resources = React.useContext(ResourcesContext);
  const [dataCache, setDataCache] = React.useState<{
    [key: number]: Violation[];
  }>({});
  const [cursorPage, setCursorPage] = React.useState(
    Number(props.data?.startingPage || 1)
  );
  const [currentPage, setCurrentPage] = React.useState<number>(cursorPage);
  const [currentViolationIndex, setCurrentViolationIndex] = React.useState(0);
  const [totalViolations, setTotalViolations] = React.useState(0);
  const [showRemediation, setShowRemediation] = React.useState(false);
  const [showResourceData, setShowResourceData] = React.useState(false);
  const showMarkException = useHasPermissions('api:exceptions:create');
  const [nextPageDirection, setNextPageDirection] = React.useState<string>();

  const {
    getViolationsByPage,
    limit,
    page,
    data: { cursor, results: violations },
    isLoading: isViolationsLoading,
    isFetching: isViolationsFetching,
  } = useGetViolationPage();

  React.useEffect(() => {
    if (violations && !isViolationsLoading) {
      setDataCache(prevState => ({
        ...prevState,
        [Number(page)]: violations,
      }));

      setCurrentPage(Number(cursor?.page));
      setTotalViolations(cursor?.total ?? 0);
    }
  }, [violations, isViolationsLoading, cursor?.total, page, cursor?.page]);

  React.useEffect(() => {
    const cachedPages: number[] = Object.keys(dataCache).map(int =>
      Number(int)
    );

    cachedPages.forEach((key: number) => {
      // Find where the index exists and return the page number
      if (dataCache[key].length) {
        const index = dataCache[key].findIndex(
          (v: { id: string }) => v.id === violationId
        );

        if (index !== -1) {
          setCurrentViolationIndex((currentPage - 1) * Number(limit) + index);
        } else {
          if (nextPageDirection) {
            const currentIndex =
              nextPageDirection === 'increment' ? 0 : Number(limit) - 1;
            history.push(
              `${props.baseUrl}/${dataCache[key][currentIndex]?.id}`
            );
          }
        }
      }
    });
  }, [
    currentPage,
    dataCache,
    history,
    limit,
    nextPageDirection,
    props.baseUrl,
    violationId,
  ]);

  useDeepEffect(() => {
    getViolationsByPage({
      ...props.data.tableFilters,
      page: String(cursorPage),
      limit,
      policyId,
    });
  }, [policyId, cursorPage, limit, props.data.tableFilters]);

  const panelProps = omit({ ...props }, 'onClose');

  const {
    data: violation,
    isSuccess: isGetViolationSuccess,
    isError: isGetViolationError,
  } = violationsApi.useGetViolationQuery({
    violationId,
  });

  const { data: policy, isLoading: isPoliciesLoading } =
    policiesApi2.useGetPolicyQuery(
      {
        id: violation?.policy_id as string,
      },
      { skip: !violation }
    );

  const [suppressViolations] = violationsApi.useSuppressViolationsMutation();
  const [unsuppressViolations] =
    violationsApi.useUnsuppressViolationsMutation();

  const resourceType = resources[policy?.resource_id as string]?.description;

  const notifyLinkCopySuccess = () => {
    notifySuccess('Violation link copied to clipboard');
  };

  const toggleMarkException = React.useCallback(
    (violationId: string, isSuppressed: boolean) => {
      switch (isSuppressed) {
        case false:
          suppressViolations({ idList: [violationId] });
          break;
        default:
          unsuppressViolations({ idList: [violationId] });
      }
    },
    [suppressViolations, unsuppressViolations]
  );

  const handlePaginate = React.useCallback(
    (operation: 'increment' | 'decrement') => {
      const cachedPages: number[] = Object.keys(dataCache).map(int =>
        Number(int)
      );
      const data: Violation[] = cachedPages.map(page => dataCache[page]).flat();
      const currentIndex = data.findIndex(
        (v: { id: string }) => v.id === violationId
      );

      switch (operation) {
        case 'increment': {
          setNextPageDirection('increment');
          if (
            currentIndex === Number(limit) - 1 &&
            cursorPage < Number(cursor.pages)
          ) {
            setCursorPage(Number(currentPage) + 1);
            return;
          } else {
            const index =
              currentIndex === Number(limit) - 1 || currentIndex === -1
                ? 0
                : currentIndex + 1;
            history.push(`${props.baseUrl}/${data[index].id}`);
          }
          break;
        }
        case 'decrement': {
          setNextPageDirection('decrement');
          if (currentPage > 1 && currentIndex <= 0) {
            setCursorPage(Number(currentPage) - 1);
            return;
          } else {
            const index =
              currentIndex === 0 ? Number(limit) - 1 : currentIndex - 1;
            history.push(`${props.baseUrl}/${data[index]?.id}`);
          }
          break;
        }
      }
    },
    [
      dataCache,
      violationId,
      limit,
      cursorPage,
      cursor.pages,
      currentPage,
      history,
      props.baseUrl,
    ]
  );

  const isLoading = useIsLoading([
    isViolationsLoading,
    !isGetViolationSuccess,
    isPoliciesLoading,
  ]);

  React.useEffect(() => {
    if (isGetViolationError) logger.error('No violation found');
  }, [isGetViolationError]);

  const data = React.useMemo(() => {
    const getFromNowTime = (timestamp: number): string => {
      return moment.unix(timestamp).isValid()
        ? moment.unix(timestamp).fromNow()
        : '-';
    };

    // Preserve the pagination object passed in data
    const pagination: React.ComponentProps<
      typeof ViolationPanelComponent
    >['data']['pagination'] = {
      ...props.data.pagination,
      currentIndex: currentViolationIndex,
      total: totalViolations,
      loading: isLoading || isViolationsFetching,
    };

    const time = {
      lastDetected: getFromNowTime(violation?.seen_timestamp as number),
      exposure: getFromNowTime(violation?.create_timestamp as number),
    };

    return {
      ...props.data,
      showRemediation,
      showResourceData,
      showMarkException,
      resourceType,
      violation,
      violations,
      policy,
      time,
      pagination,
      callbacks: {
        notifyLinkCopySuccess,
        toggleMarkException,
        handlePaginate,
        setShowRemediation,
        setShowResourceData,
      },
    };
  }, [
    props.data,
    currentViolationIndex,
    totalViolations,
    isLoading,
    isViolationsFetching,
    violation,
    showRemediation,
    showResourceData,
    showMarkException,
    resourceType,
    violations,
    policy,
    toggleMarkException,
    handlePaginate,
  ]);

  const handleClose = () => props.onClose?.();

  return (
    <SlidePanel
      key="violation-panel"
      isVisible={props.isVisible}
      onClose={handleClose}
      clickaway={false}
      unmount
    >
      <ViolationPanelComponent
        {...panelProps}
        isLoading={isLoading} //@ts-expect-error fun times
        data={data}
        key={violationId}
      />
    </SlidePanel>
  );
};
