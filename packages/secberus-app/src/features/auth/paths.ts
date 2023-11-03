const paths = {
  base: '/auth/:view?',
  entry: '/auth/entry',
  login: '/auth/login',
  reset: '/auth/reset',
  forgot: '/auth/forgot',
  callback: '/auth/callback',
  confirm: '/auth/confirm',
  newPassword: '/auth/newPassword',
} as const;

export { paths as authPaths };
