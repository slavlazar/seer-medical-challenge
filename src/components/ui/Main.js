import styled from 'styled-components';

import logoAsset from '../../assets/img/seer-logo.svg';

export const Wrapper = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
  background-color: transparent;
  font-size: ${(props) => props.theme.font.size.medium};
`;

export const Header = styled.section`
  margin: 0;
  background: ${(props) => props.theme.colour.header};
`;

export const Logo = styled.a`
  display: block;
  margin: 1.5rem;
  background: transparent url(${logoAsset}) 0 0;
  width: 188px;
  height: 28px;
  text-indent: -9999em;
  box-sizing: border-box;
`;
