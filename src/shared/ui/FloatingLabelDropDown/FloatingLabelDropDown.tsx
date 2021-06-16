import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEventHandler, useRef, useState, VFC } from 'react';
import Box from 'shared/primitives/Box';
import Flex from 'shared/primitives/Flex';
import styled from 'styled-components';
import FloatingLabelInput from '../FloatingLabelInput';

interface FloatingLabelDropDownProps {
  isActive: boolean;
  isRequire?: boolean;
  placeholder: string;
  onChange(value: string): void;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
  value?: string;
}

const InputContainer = styled(Flex)`
  position: relative;
`;

const IconContainer = styled(Box)`
  position: absolute;
  z-index: 9;
  pointer-events: none;
`;

const validIcons = {
  up: (
    <IconContainer right="16px" bottom="10px">
      <FontAwesomeIcon icon="chevron-up" color="black" />
    </IconContainer>
  ),
  down: (
    <IconContainer right="16px" bottom="10px">
      <FontAwesomeIcon icon="chevron-down" color="black" />
    </IconContainer>
  ),
} as const;

interface OptionProps {
  isSelected?: boolean;
  isFocus?: boolean;
  label: string;
}

const Option = styled(Box)`
  :focus {
    background-color: dodgerBlue;
    opacity: 0.1;
  }
`;

const DropDownMenu = styled.div`
  max-height: 200px;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
  margin-top: 6px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #eff1f3;
  border-radius: 4px;
  overflow-y: auto;
  background: white;
`;

// TODO: Что я не понимаю???
// TODO: почему компонент перерендеривается нескоько раз и пропсы становятся андефайнд

const FloatingLabelDropDown: VFC<FloatingLabelDropDownProps> = ({
  isActive,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  isRequire,
  value,
}) => {
  const items = ['1', '2', '3', '4', '5', '6', '7'];
  const selectedItem = '3';
  const input = useRef<HTMLInputElement>(null);

  const icon = isActive ? 'up' : 'down';
  console.info('value', value);
  console.info('active', isActive);
  return (
    <InputContainer mb="15px">
      {validIcons[icon]}
      <FloatingLabelInput
        onFocus={onFocus}
        isActive={isActive}
        onBlur={(e) => {
          if (e.isTrusted) {
            e.preventDefault();
          } else {
            onBlur(e);
          }
        }}
        value={value}
        placeholder={placeholder}
        isRequire={isRequire}
        isDisabled
        ref={input}
      />
      {isActive ? (
        <DropDownMenu>
          {items.map((i) => (
            <Option
              bg={i === selectedItem ? '' : 'white'}
              p="8px 10px"
              mt="8px"
              mb="6px"
              onClick={() => {
                console.log('dfdfd');
                onChange(i);
                input.current?.blur();
              }}
            >
              {i}
            </Option>
          ))}
        </DropDownMenu>
      ) : null}
    </InputContainer>
  );
};

export default FloatingLabelDropDown;
