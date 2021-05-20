import getTheme from 'helpers/getTheme';
import React, { VFC } from 'react';
import Flex from 'shared/primitives/Flex';
import styled from 'styled-components';
import ControlBox from '../ControlBox';

const FloatingLabelInputContainer = styled(Flex)``;

const StyledInput = styled.input`
  height: 40px;
  padding: 0 16px;
  transition: all 0.2s;
  width: 100%;
  border-radius: 4px;
  background-color: ${getTheme('colors.athensGray') as string};
  font-size: 16px;
  font-weight: 400;
  color: ${getTheme('colors.paleSky') as string};
  border: 1px solid transparent;
`;

const StyledLabel = styled.label`
  position: absolute;
  max-width: 70%;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(17px, 15px) scale(1.15);
  visibility: hidden;
`;

interface FloatingLabelInputProps {
  isActive: boolean;
}

const FloatingLabelInput: VFC<FloatingLabelInputProps> = ({ isActive }) => (
  <ControlBox isActive={isActive}>
    <StyledInput placeholder="test" />
    <StyledLabel />
  </ControlBox>
);

export default FloatingLabelInput;
