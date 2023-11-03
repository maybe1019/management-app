// Replace state without pushing or popping history.
export const replaceWindowState = (
  newUrl: string,
  origin = window.location.origin,
  title = document.title
): void => {
  window.history.replaceState(origin, title, newUrl);
};
