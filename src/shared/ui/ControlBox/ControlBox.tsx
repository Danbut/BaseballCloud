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

const ActiveControlBox: FC = ({ children }) => (
  <StyledControlBox bg="white" border="1px solid dodgerBlue">
    {children}
  </StyledControlBox>
);

const InactiveControlBox: FC = ({ children }) => (
  <StyledControlBox bg="athensGray" border="1px solid transparent">
    {children}
  </StyledControlBox>
);

const ControlBox: FC<ControlBoxProps> = ({ children, isActive }) =>
  isActive ? (
    <ActiveControlBox>{children}</ActiveControlBox>
  ) : (
    <InactiveControlBox>{children}</InactiveControlBox>
  );

export default ControlBox;
