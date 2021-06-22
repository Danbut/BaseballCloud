import React, { forwardRef } from 'react';
import styled from 'styled-components';
import FloatingLabelControlBox from '../FloatingLabelControlBox';

const StyledTextArea = styled.textarea`
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  overflow: auto;
  width: 100%;
  padding: 12px 16px;
  min-height: 110px;
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
  resize: none;
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

interface FloatingLabelTextAreaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  isActive: boolean;
  isRequire?: boolean;
  placeholder: string;
  isDisabled?: boolean;
}

const FloatingLabelTextArea = forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextAreaProps
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
      <StyledTextArea
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

export default FloatingLabelTextArea;
