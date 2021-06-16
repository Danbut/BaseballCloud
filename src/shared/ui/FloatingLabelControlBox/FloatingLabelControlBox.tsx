import React, { FC } from 'react';
import Box from 'shared/primitives/Box';

import styled from 'styled-components';

interface ControlBoxProps {
  isActive: boolean;
}

const StyledControlBox = styled(Box)`
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  padding: 0 16px;
  position: relative;
  :focus-within label {
    transform-origin: left top;
    visibility: visible;
    transform: translate(4px, 2px) scale(0.8);
  }
`;

const FloatingLabelControlBox: FC<ControlBoxProps> = ({
  children,
  isActive,
}) => (
  <StyledControlBox
    bg={isActive ? 'white' : 'athensGray'}
    border={`1px solid ${isActive ? 'dodgerBlue' : 'transparent'}`}
  >
    {children}
  </StyledControlBox>
);

export default FloatingLabelControlBox;
