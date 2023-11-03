const supportEmailSubject = (email?: string): string =>
  `Support request ${email ? `from ${email}` : ''}`;

const supportEmailBody =
  (): string => `We're sorry you have run into an issue. If possible, please describe your experience below in detail.
===
URL: ${window.location}
Client: ${window.navigator.userAgent}
===
Short Summary:

Steps to reproduce (optional): `;

const mailTo = 'mailto:support@secberus.com';

export const getEmailLink = (email?: string): string => {
  const emailHref = `${mailTo}?subject=${supportEmailSubject(
    email
  )}&body=${supportEmailBody()}`;
  return encodeURI(emailHref);
};
