const ComponentToCallHook = ({ hook, args }) => {
  hook(...args);

  return null;
};

export default ComponentToCallHook;
