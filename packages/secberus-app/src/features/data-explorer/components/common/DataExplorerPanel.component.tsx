import React from 'react';
import {
  Button,
  useTabBar,
  SlidePanel,
  SlidePanelScrollbox,
  SlidePanelContent,
  SlidePanelBody,
  SlidePanelHeader,
  SlidePanelHeaderControls,
  SlidePanelTitle,
} from '@secberus/components';
import { AnyFn } from '@secberus/utils';
import { Box } from '@chakra-ui/react';
import { TimesLight } from '@secberus/icons';
import { useFeatureFlags } from '../../../feature-flags/hooks/useFeatureFlags';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { QueriesPanelContent } from './tabs/QueriesPanelContent';
import { PoliciesPanelContent } from './tabs/PoliciesPanelContent';
import { ViewsPanelContent } from './tabs/ViewsPanelContent';

type DataExplorerPanelProps = {
  isVisible: boolean;
  onClose: AnyFn;
};

const PANEL_TAB_KEYS: { id: string; name: string }[] = [
  {
    id: 'queries',
    name: 'Queries',
  },
  {
    id: 'views',
    name: 'Views',
  },
  {
    id: 'policies',
    name: 'Policies',
  },
];

export interface PanelContentProps {
  open?: boolean;
  onClose?: AnyFn;
}

export const DataExplorerPanelComponent = ({
  isVisible,
  onClose,
}: DataExplorerPanelProps) => {
  const features = useFeatureFlags();
  const rev1Enabled = features?.['data-explorer-rev1'];
  const rev2Enabled = features?.['data-explorer-rev2'];
  const { TabBar, TabBarContent } = useTabBar({
    noMargin: true,
    detachedTabBarContent: true,
    defaultRender: null,
    tabs: PANEL_TAB_KEYS.reduce((acc, { id, name }) => {
      // "open" prevents requests from initial tab from firing since panel isn't removed from DOM
      let render = null;
      switch (id) {
        case 'queries':
          if (!rev1Enabled) return acc;
          render = <QueriesPanelContent open={isVisible} onClose={onClose} />;
          break;
        case 'views':
          if (!rev2Enabled) return acc;
          render = <ViewsPanelContent open={isVisible} onClose={onClose} />;
          break;
        case 'policies':
          render = <PoliciesPanelContent open={isVisible} onClose={onClose} />;
          break;
      }

      acc[id] = {
        title: name,
        render,
      };
      return acc;
    }, {} as Record<string, any>),
  });

  return (
    <SlidePanel
      key="data-explorer-panel"
      isVisible={isVisible}
      onClose={e => {
        /**
         * Close only when clicking on the overlay because pagination row select
         * uses a portal and will also fire onClose after triggering the ClickAwayListener.
         */
        if ((e?.target as HTMLElement).id === 'modal-overlay') {
          onClose();
        }
      }}
    >
      <SlidePanelContent width={864}>
        <SlidePanelHeader padding="40px 40px 0px">
          <SlidePanelHeaderControls>
            <Button
              className="close-icon"
              variant="tertiary"
              onClick={onClose}
              icon
            >
              <TimesLight />
            </Button>
          </SlidePanelHeaderControls>
          <SlidePanelTitle>Open existing</SlidePanelTitle>
          <Box mt="40px">{TabBar}</Box>
        </SlidePanelHeader>
        <SlidePanelBody>
          <SlidePanelScrollbox>{TabBarContent}</SlidePanelScrollbox>
        </SlidePanelBody>
      </SlidePanelContent>
    </SlidePanel>
  );
};
export const DataExplorerPanel = (props: DataExplorerPanelProps) => {
  return (
    <ErrorBoundary height="100%" message="Something unexpected went wrong.">
      <DataExplorerPanelComponent {...props} />
    </ErrorBoundary>
  );
};
