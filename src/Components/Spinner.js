// src/Components/Spinner.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const SpinnerIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid lightgray;
  border-top-color: black;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Spinner = () => (
  <SpinnerWrapper>
    <SpinnerIcon />
  </SpinnerWrapper>
);

export default Spinner;
