import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const motion = () => keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-left: -64px;
  margin-top: -64px;
  background-color: ${(props) => props.theme.colour.background};
  border: 1px solid ${(props) => props.theme.colour.border};
  padding: 1rem;
  z-index: 10;
  border-radius: 2rem;
`;

const RingSpinner = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${(props) => `${props.size}${props.sizeUnit}`};
  height: ${(props) => `${props.size}${props.sizeUnit}`};
  margin: 6px;
  border: 6px solid ${(props) => props.theme.colour.secondary};
  border-radius: 50%;
  animation: ${(props) => motion(props)} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${(props) => props.theme.colour.secondary} transparent transparent transparent;

  :nth-child(1) {
    animation-delay: -0.45s;
  }
  :nth-child(2) {
    animation-delay: -0.3s;
  }
  :nth-child(3) {
    animation-delay: -0.15s;
  }
`;

export const Spinner = ({ size, sizeUnit }) => (
  <Wrapper>
    <RingSpinner size={size} sizeUnit={sizeUnit} />
  </Wrapper>
);

Spinner.propTypes = {
  size: PropTypes.number,
  sizeUnit: PropTypes.string,
};

Spinner.defaultProps = {
  size: 50,
  sizeUnit: 'px',
};
