import { VariableSizeNodeData } from 'react-vtree';
import type { CustomerLogEvent } from '@secberus/services';
import { BadgeIcon } from '../../types';

export interface MessageFragment {
  message: string;
  icon?: BadgeIcon;
}

export interface AuditLogProps {
  data: CustomerLogEvent[];
  className?: string;
}

interface AuditEventComponentData extends VariableSizeNodeData {
  hasChildren: boolean;
  nestingLevel: number;
  name: string;
  trace_id: string;
  error: boolean;
  message: string;
  timestamp: number;
  defaultHeight: number;
  context?: {
    [key: string]: any;
  };
}

export interface AuditEventComponent {
  isOpen: boolean;
  setOpen: any;
  data: AuditEventComponentData;
  style: any;
}
