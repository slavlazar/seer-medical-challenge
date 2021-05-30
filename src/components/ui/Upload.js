import styled from 'styled-components';

import { ErrorContainer } from './Error';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3.5rem 0 0;
  padding: 1rem 0;
  border-top: 1px solid ${(props) => props.theme.colour.border};
`;

export const ConflictsContainer = styled(ErrorContainer)`
  margin: 0.5rem 0 1rem;
`;

export const SaveButton = styled.a`
  font-size: ${(props) => props.theme.font.size.small};
  background-color: ${(props) => props.theme.colour.secondary};
  color: #fff;
  border-radius: 1rem;
  font-weight: ${(props) => props.theme.font.weight.bold};
  line-height: ${(props) => props.theme.lineHeight.text};
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
  padding: 1.8rem 3.5rem;
`;
