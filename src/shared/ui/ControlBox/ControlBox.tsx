import React, { FC } from 'react';
import Box from 'shared/primitives/Box';
import styled from 'styled-components';

interface ControlBoxProps {
  isActive: boolean;
}

const StyledControlBox = styled(Box)`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 6px 12px 10px 37px;
`;

const ControlBox: FC<ControlBoxProps> = ({ children, isActive }) => (
  <StyledControlBox
    bg="athensGray"
    border={`1px solid ${isActive ? 'dodgerBlue' : 'transparent'}`}
  >
    {children}
  </StyledControlBox>
);

export default ControlBox;
