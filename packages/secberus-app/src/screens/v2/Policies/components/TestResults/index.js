import React from 'react';
import { TimesLight } from '@secberus/icons';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  Text,
  BaseBadge,
  ViolationsBadge,
  DataTable,
} from '@secberus/components';
import {
  TestResultsWrapper,
  TestResultsHeader,
  TableContainer,
  ScrollableCell,
} from './TestResults.styled';
import useElementSize from '../../../../../hooks/useElementSize';
import { Flex } from '@chakra-ui/layout';
import { orderBy } from 'lodash';

const TestResults = ({ alerts, showResults, setShowResults }) => {
  const [container, setContainerNode] = React.useState();
  const containerRef = React.useCallback(node => {
    if (node !== null) {
      setContainerNode(node);
    }
  }, []);
  const containerSize = useElementSize(container);

  const colWidth = React.useMemo(
    () => (containerSize.width ?? 0) * 0.5,
    [containerSize]
  );

  const TestResultColumns = [
    {
      key: 'datasources',
      width: 200,
      title: 'Data sources',
      cellContent: ({ row }) => (
        <ScrollableCell fadeLeft>
          {row?.datasources?.map(({ name, type }) => (
            <BaseBadge
              className={row.suppressed ? 'suppressedViolation' : undefined}
              label={name}
              icon={type.toLowerCase()}
              transparent
            />
          ))}
        </ScrollableCell>
      ),
      sort: (ascending, sortData) =>
        orderBy(sortData, ['datasources.name'], [ascending ? 'asc' : 'desc']),
    },
    {
      key: 'resource_data',
      disableSort: true,
      title: 'Resource data',
      cellContent: ({ row }) => {
        const display = Object.entries(row.resource?.data ?? {}).map(
          ([key, val]) => `${key}: ${JSON.stringify(val)}`
        );
        return (
          <ScrollableCell
            className={row.suppressed ? 'suppressedViolation' : undefined}
            fadeLeft
          >
            <Flex sx={{ gap: '10px' }}>
              {display.map(displayed => (
                <BaseBadge label={displayed} />
              ))}
            </Flex>
          </ScrollableCell>
        );
      },
    },
  ];

  return (
    <AnimatePresence>
      {showResults && (
        <motion.div
          key="test-results"
          className="showResults"
          style={{
            position: 'fixed',
            bottom: '0px',
            width: '50%',
            margin: 'auto',
            left: 0,
            right: 0,
          }}
          initial={{ transform: 'translateY(100%)' }}
          animate={{ transform: 'translateY(0%)' }}
          transition={{ duration: 0.6 }}
          exit={{ transform: 'translateY(100%)' }}
        >
          <TestResultsWrapper ref={containerRef}>
            <TestResultsHeader>
              <Text type="bold" color="grey-black">
                Test results
              </Text>
              <ViolationsBadge violations={alerts.length} withViolations />
              <Button
                variant="tertiary"
                icon
                onClick={() => setShowResults(false)}
              >
                <TimesLight />
              </Button>
            </TestResultsHeader>
            <TableContainer>
              <DataTable
                height={220}
                alternatingRowColor={false}
                columns={TestResultColumns}
                data={alerts ?? []}
                placeholder="empty"
                key={`${colWidth}`}
              />
            </TableContainer>
          </TestResultsWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(TestResults);
