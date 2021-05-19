import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { VFC } from 'react';
import Box from 'shared/primitives/Box/Box';
import Flex from 'shared/primitives/Flex/Flex';

import styled from 'styled-components';
import ControlBox from '../ControlBox';

const InputContainer = styled(Flex)`
  position: relative;
`;

const IconContainer = styled(Box)`
  position: absolute;
  align-items: baseline;
`;

const validIcons = {
  email: (
    <IconContainer top="19px" left="17px" bottom="0px">
      <FontAwesomeIcon icon="user" color="textColor" />
    </IconContainer>
  ),
  password: (
    <IconContainer top="19px" left="17px" bottom="0px">
      <FontAwesomeIcon icon="lock" color="textColor" />
    </IconContainer>
  ),
  confirm: (
    <IconContainer top="19px" left="17px" bottom="0px">
      <FontAwesomeIcon icon="check" color="textColor" />
    </IconContainer>
  ),
} as const;

const StyledInput = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 400;
`;

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  icon?: keyof typeof validIcons;
  isActive: boolean;
}

const Input: VFC<InputProps> = ({
  icon,
  placeholder,
  onChange,
  type,
  isActive,
  onFocus,
  onBlur,
}) => (
  <InputContainer mb="15px">
    {icon && validIcons[icon]}
    <ControlBox isActive={isActive}>
      <StyledInput
        type={type}
        name="password"
        title="Password"
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </ControlBox>
  </InputContainer>
);

export default Input;
