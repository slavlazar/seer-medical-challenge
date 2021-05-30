import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.section`
  margin: 0;
  padding: 3rem;
  background-color: ${(props) => darken(0.1, props.theme.colour.background)};
`;

export const Container = styled.div`
  border: 2px dashed ${(props) => props.theme.colour.border};
  border-radius: 0.8rem;
  padding: 3rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  background-color: ${(props) => darken(0.02, props.theme.colour.background)};
  font-size: ${(props) => props.theme.font.size.small};
`;

export const DropboxInputContainer = styled.div`
  padding: 1rem 0 0;
`;

export const DropboxSpan = styled.span`
  margin: 0;
  padding: 0;
`;

export const DropboxLabel = styled.label`
  color: ${(props) => props.theme.colour.secondary};
  text-decoration: underline;
  display: inline-block;
  padding-left: 0.4rem;
  cursor: pointer;
`;
