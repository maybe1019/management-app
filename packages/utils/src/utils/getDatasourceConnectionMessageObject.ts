type ConnectionStatusType = 'success' | 'partial' | 'failure' | 'default';

type ConnectionStatus = { message: string; reason?: string | undefined };

type ReturnType = { type: ConnectionStatusType; status: ConnectionStatus };

export const getDatasourceConnectionMessageObject = (
  status: ConnectionStatusType,
  verified?: boolean
): ReturnType => {
  let type: ConnectionStatusType = status;
  let message: ConnectionStatus['message'] = '';
  let reason: ConnectionStatus['reason'];

  switch (status) {
    case 'success':
      message = 'Successful';
      reason = 'All resources collected';
      break;
    case 'partial':
      message = 'Partial';
      reason = 'Permission issues';
      break;
    case 'failure':
      message = 'Unable to connect';
      reason = verified ? 'Connectivity issues' : 'Invalid credentials';
      break;
    default:
      type = 'default';
      message = 'N/A';
      reason = 'Not available';
  }

  return { type, status: { message, reason } };
};
