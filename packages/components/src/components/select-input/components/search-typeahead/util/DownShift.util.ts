import Downshift from 'downshift';

export const stateReducer = (state: any, changes: any) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.mouseUp:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        inputValue: '',
        isOpen: false,
      };
    case Downshift.stateChangeTypes.blurInput:
      return {
        ...changes,
        isOpen: state.isOpen,
        highlightedIndex: state.highlightedIndex,
        inputValue: state.inputValue,
      };
    default:
      return changes;
  }
};
