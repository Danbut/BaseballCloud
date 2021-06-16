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

// TODO: 1) Сделать, чтобы active менялась done
// TODO: 2) Сделать контрол бокс как на сайте done
// TODO: 3) Сделать floating label done
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
  :focus::placeholder {
    color: transparent;
  }
  :disabled {
    pointer-events: none;
  }
`;

const StyledLabel = styled.label`
  max-width: 70%;
  text-overflow: ellipsis;
  transform: translate(17px, 15px) scale(1.15);
  position: absolute;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  color: #788b99;
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
