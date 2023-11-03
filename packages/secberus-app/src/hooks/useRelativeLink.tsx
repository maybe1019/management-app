import { useRouteMatch } from 'react-router-dom';

export const useRelativeLink: (to: string) => string = to => {
  // `url` lets us build relative links
  const { url } = useRouteMatch();

  if (to.startsWith('/')) return url + to;
  return `${url}/${to}`;
};
