import getTheme from 'helpers/getTheme';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
  VFC,
} from 'react';
import Box from 'shared/primitives/Box';
import Flex from 'shared/primitives/Flex';
import styled from 'styled-components';
import ControlBox from '../ControlBox';
import FloatingLabelControlBox from '../FloatingLabelControlBox';

const FloatingLabelInputContainer = styled(Flex)``;

const StyledInput = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  width: 100%;
  height: 100%;
  :focus::placeholder {
    color: transparent;
  }
  :disabled {
    pointer-events: none;
  }
  ::placeholder {
    color: #788b99;
  }
  color: #667784;
`;

const StyledLabel = styled.label`
  max-width: 70%;
  text-overflow: ellipsis;
  transform: translate(17px, 15px) scale(1.15);
  position: absolute;
  transition: all 0.2s;
  transition: color #788b99;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  color: #667784;
  display: inline-block;
  visibility: hidden;
  top: 0;
  left: 0;
`;

interface FloatingLabelInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  isActive: boolean;
  isRequire?: boolean;
  placeholder: string;
  isDisabled?: boolean;
}

const FloatingLabelInput = forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>((props, ref) => {
  const {
    isActive,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    isRequire,
    isDisabled,
  } = props;
  const label = `${placeholder}${isRequire ? ' *' : ''}`;
  return (
    <FloatingLabelControlBox isActive={isActive}>
      <StyledInput
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        title={label}
        placeholder={label}
        readOnly={isDisabled}
      />
      <StyledLabel>{label}</StyledLabel>
    </FloatingLabelControlBox>
  );
});

export default FloatingLabelInput;
