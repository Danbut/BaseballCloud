import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, VFC } from 'react';
import Box from 'shared/primitives/Box';
import Flex from 'shared/primitives/Flex';
import styled from 'styled-components';
import FloatingLabelInput from '../FloatingLabelInput';

export interface Item {
  id: number;
  name: string;
}

interface FloatingLabelDropDownProps {
  isActive: boolean;
  isRequire?: boolean;
  placeholder: string;
  onChange: (...args: any[]) => any;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
  value?: Item;
  items?: Item[];
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
      <FontAwesomeIcon icon="chevron-up" color="#788b99" />
    </IconContainer>
  ),
  down: (
    <IconContainer right="16px" bottom="10px">
      <FontAwesomeIcon icon="chevron-down" color="#788b99" />
    </IconContainer>
  ),
} as const;

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

const FloatingLabelDropDown: VFC<FloatingLabelDropDownProps> = ({
  isActive,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  isRequire,
  value,
  items,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const sevValueAndDispatchEvent = (changingValue: string) => {
    /* eslint-disable @typescript-eslint/unbound-method */
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    nativeInputValueSetter?.call(input.current, changingValue);
    const change = new Event('input', { bubbles: true });
    input.current?.dispatchEvent(change);
  };

  const icon = isActive ? 'up' : 'down';

  return (
    <InputContainer mb="15px">
      {validIcons[icon]}
      <FloatingLabelInput
        onFocus={onFocus}
        isActive={isActive}
        onBlur={onBlur}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value?.name}
        placeholder={placeholder}
        isRequire={isRequire}
        isDisabled
        ref={input}
      />
      {isActive ? (
        <DropDownMenu>
          {items?.map((i) => (
            <Option
              bg={i === value ? 'rgba(72, 187, 255, 0.1)' : 'white'}
              p="8px 10px"
              mt="8px"
              mb="6px"
              onMouseDown={() => {
                sevValueAndDispatchEvent(i.name);
              }}
            >
              {i.name}
            </Option>
          ))}
        </DropDownMenu>
      ) : null}
    </InputContainer>
  );
};

export default FloatingLabelDropDown;
