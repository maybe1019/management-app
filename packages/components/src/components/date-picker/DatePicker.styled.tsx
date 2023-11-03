import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export const DatepickerContainer = styled.div`
  * .react-datepicker {
    z-index: 300;
    border: none;
    border-radius: 16px;
    .react-datepicker__day-names {
      padding-top: 16px;
      margin: 0;
    }
    .react-datepicker__day-name {
      width: 48px;
      ${({ theme }) => theme.typography['caption']};
      color: ${({ theme }) => theme.colors.gray};
    }
    .react-datepicker__input-time-container {
      padding: 16px;
      margin: 0px;
    }
    .react-datepicker__current-month,
    .react-datepicker-time__caption {
      ${({ theme }) => theme.typography['small-bold']};
      color: ${({ theme }) => theme.colors['dark']};
    }
    .react-datepicker__header {
      border-radius: 16px 16px 0px 0px;
      border: none;
      padding-top: 16px;
      padding-bottom: 8px;
      background: ${({ theme }) => theme.colors['light-gray']};
    }
    .react-datepicker__triangle {
        top: 1px;
        &::before {
            border-bottom-color: ${({ theme }) => theme.colors['light-gray']}
        }
    }
    .react-datepicker__day {
      color: ${({ theme }) => theme.colors.dark};
      ${({ theme }) => theme.typography['small-regular']}
      width: 48px;
      height: 40px;
      line-height: 40px;
      &:hover{
        background: ${({ theme }) => theme.colors['light-blue']}
      }
    }
    .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
      &:hover {
        background: ${({ theme }) => theme.colors.blue}
      }
    }
    .react-datepicker__day--outside-month, .react-datepicker__day--disabled {
      color: ${({ theme }) => theme.colors['medium-gray']};
    }
    .react-datepicker__month-container {
        margin-bottom: 8px;
    }
    .react-datepicker-time__input-container {
      padding: 8px;
      border-radius: 24px;
      margin-left: 16px;
      background: ${({ theme }) => theme.colors['light-gray']};
      color: ${({ theme }) => theme.colors.dark};
      ${({ theme }) => theme.typography['small-bold']}
    }
    .react-datepicker-time__input {
      background: ${({ theme }) => theme.colors['light-gray']};
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-range,
    .react-datepicker__day--keyboard-selected {
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
      ${({ theme }) => theme.typography['small-bold']};
      line-height: 40px;
    }
    .react-datepicker__navigation {
      margin-top: 8px;
    }
    .react-datepicker__navigation-icon--previous, .react-datepicker__navigation-icon--next, .react-datepicker__navigation-icon {
        top: 7px;
        &::before {
            border-color: ${({ theme }) => theme.colors.dark};
            border-width: 2px 2px 0 0;
        }
    },
  }
  * .react-datepicker__input-container {
    input {
      ${({ theme }) => theme.typography['small-bold']};
      background: ${({ theme }) => theme.colors['light-gray']};
      border: 1px solid transparent;
      border-radius: 24px;
      padding: 12px 24px;
      height: 48px;
      width: 100%;
      box-sizing: border-box;
      ${({ theme }) => theme.typography['small-bold']};
      outline: none;
      color: ${({ theme }) => theme.colors.dark};
      transition: border 0.3s;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray};
      }
      &:hover {
        border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
      }
      &:focus {
        border: ${({ theme }) => `1px solid ${theme.colors.blue}`};
      }
      &:disabled,
      :read-only {
        background: ${({ theme }) => `${theme.colors['medium-gray']}`};
      }
    }
  }
`;
