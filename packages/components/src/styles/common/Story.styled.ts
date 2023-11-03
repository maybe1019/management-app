import styled from 'styled-components';
import { Box } from '@chakra-ui/react';

export const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 2em;
  width: 100%;
  max-width: 1000px;
  justify-content: space-between;
  align-items: end;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-family: 'GothamMedium', sans-serif;
  color: #2a2d31;
  letter-spacing: 2px;
  margin-block-end: 0.5em;
  margin-block-start: 0em;
`;

export const Subtitle = styled.h4`
  font-size: 16px;
  font-family: 'GothamMedium', sans-serif;
  color: #2a2d31;
  margin-block-start: 0em;
`;

export const Divider = styled.hr`
  width: 100%;
  border: 1px solid #e8e8e8;
  margin: 1.5em 0;
`;

export const FormContainer = styled(Box)`
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border: 1px solid #e8e8e8;
  width: 50%;
  border-radius: 4px;
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  flex-flow: 1;
  & button {
    align-self: flex-end;
    margin-top: 1em;
  }
`;

export const Section = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const StoryComponentWrapper = styled(Wrapper)`
  grid-template-columns: repeat(5, 150px);
  max-width: 600px;
  margin-bottom: 36px;
`;
