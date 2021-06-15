import getTheme from 'helpers/getTheme';
import React, { VFC } from 'react';
import Box from 'shared/primitives/Box';
import Flex from 'shared/primitives/Flex';
import styled from 'styled-components';
import ControlBox from '../ControlBox';
import FloatingLabelControlBox from '../FloatingLabelControlBox';

const FloatingLabelInputContainer = styled(Flex)``;

// TODO: 1) Сделать, чтобы active менялась done
// TODO: 2) Сделать контрол бокс как на сайте done
// TODO: 3) Сделать floating label
// TODO: 4) Сделать сетку
// TODO: 5) Сверстать остальные 3 инпута
// TODO: 6) Сделать работающим choose photo
// TODO: 7) Сверстать шапку, когда залогинен
// TODO:
// TODO:
// TODO:
// TODO:
// TODO:
// TODO:

const StyledInput = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  width: 100%;
  height: 100%;
  transition: all 0.2s;
`;

const StyledLabel = styled.label`
  /* position: absolute; */
  max-width: 70%;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(17px, 15px) scale(1.15);
  visibility: hidden;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  color: #788b99;
`;

interface FloatingLabelInputProps extends React.HTMLProps<HTMLInputElement> {
  isActive: boolean;
  isRequire?: boolean;
  placeholder: string;
}

const FloatingLabelInput: VFC<FloatingLabelInputProps> = ({
  isActive,
  placeholder,
  onChange,
  onBlur,
  onFocus,
}) => (
  <FloatingLabelControlBox isActive={isActive}>
    <StyledInput
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      title={placeholder}
      placeholder={placeholder}
    />
    <StyledLabel>{placeholder}</StyledLabel>
  </FloatingLabelControlBox>
);

export default FloatingLabelInput;
