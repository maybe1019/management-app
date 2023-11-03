import styled from 'styled-components';

export const DropdownPanelContainer = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme: { colors } }) => colors['light-gray']};
  border-radius: 8px;
  .title {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-left: 16px;
    ${({ theme }) => ({
      ...theme.typography['xsmall-bold'],
      color: theme.colors.gray,
    })}
    padding-top: 4px;
    padding-bottom: 4px;
  }
  padding: 1px;
`;

export const DropdownPanelList = styled.ul`
  list-style: none;
  li {
    background: white;
    display: flex;
    padding: 16px 16px 12px 16px;
    margin-top: 1px;
  }
  .dropdown {
    padding-left: 8px;
    flex-direction: column;
  }
  .active-dropdown-title {
    padding-bottom: 8px;
  }
  &&& .dropdown-icon {
    align-items: center;
    height: 24px;
    width: 24px;
    transition: transform 0.2s;
    transform: rotate(-90deg);
  }
  &&& .active-dropdown-icon {
    transform: rotate(0deg);
  }
`;

export const DropdownPanelListItemContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  max-width: calc(100% - 24px);
  .child-content {
    height: 0px;
    transition: height 0.2s;
    overflow: hidden;
  }
  .active {
    height: auto;
    margin-left: 24px;
  }
`;

export const DropdownPanelController = styled.div`
  display: flex;
  cursor: pointer;
`;
