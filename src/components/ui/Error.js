import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorContainer = styled.div`
  padding: 3rem 1.5rem;
  border: 1px solid ${(props) => darken(0.2, props.theme.colour.primary)};
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colour.primary};
  color: ${(props) => lighten(0.5, props.theme.colour.primary)};
  border-radius: 2rem;
  font-size: ${(props) => props.theme.font.size.small};
`;

export const ErrorMessage = styled.p`
  margin: 0;
  padding: 0.4rem 0;
`;
