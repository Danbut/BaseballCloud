import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import union from 'lodash/union';
import React, { useRef, VFC } from 'react';
import Box from 'shared/primitives/Box';
import Flex from 'shared/primitives/Flex';
import styled from 'styled-components';
import FloatingLabelControlBox from '../FloatingLabelControlBox';

interface FloatingLabelMultiDropDown {
  isActive: boolean;
  isRequire?: boolean;
  placeholder: string;
  onChange: (...args: any[]) => any;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
  values?: string[];
  items?: string[];
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

const DeleteIcon = styled.span`
  font-size: 0.9em;
  color: #007eff;
  vertical-align: middle;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
  border-right: 1px solid rgba(0, 126, 255, 0.24);
  padding: 1px 5px 3px;
  z-index: 9;
  position: relative;
`;

const ChopContainer = styled.div`
  background-color: rgba(0, 126, 255, 0.08);
  border-radius: 2px;
  border: 1px solid rgba(0, 126, 255, 0.24);
  color: #007eff;
  margin-left: 5px;
  margin-top: 5px;
  vertical-align: top;
  display: inline-block;
`;

const Label = styled.div`
  color: #007eff;
  font-size: 0.9em;
  vertical-align: middle;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  cursor: default;
  padding: 2px 5px;
  display: inline-block;
`;

interface ChopProps {
  value: string;
  onDelete: () => void;
}

const Chop: VFC<ChopProps> = ({ value, onDelete }) => (
  <ChopContainer>
    <DeleteIcon
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      x
    </DeleteIcon>
    <Label>{value}</Label>
  </ChopContainer>
);

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

const StyledInput = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  /* width: 100%;
  height: 100%; */
  :focus::placeholder {
    color: transparent;
  }
  :disabled {
    pointer-events: none;
  }
  ::placeholder {
    color: #788b99;
  }
  color: transparent;

  height: 100%;
  width: 100%;
  padding: 0 16px;
  z-index: 1;
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

const SelectInput = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const FloatingLabelMultiDropDown: VFC<FloatingLabelMultiDropDown> = ({
  isActive,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  isRequire,
  values,
  items,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const sevValueAndDispatchEvent = (value: string) => {
    /* eslint-disable @typescript-eslint/unbound-method */
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    nativeInputValueSetter?.call(
      input.current,
      `${union(values, [value]).join(' ')}`
    );
    const change = new Event('input', { bubbles: true });
    input.current?.dispatchEvent(change);
  };

  const icon = isActive ? 'up' : 'down';

  const label = `${placeholder}${isRequire ? ' *' : ''}`;

  const onDelete = (value: string) => {
    /* eslint-disable @typescript-eslint/unbound-method */
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    nativeInputValueSetter?.call(
      input.current,
      `${(values?.join(' ') ?? '').replace(value, '')}`
    );
    const change = new Event('input', { bubbles: true });
    input.current?.dispatchEvent(change);
  };

  return (
    <InputContainer mb="15px">
      {validIcons[icon]}
      <FloatingLabelControlBox isActive={isActive}>
        {values?.map((v) => (
          <Chop value={v} onDelete={() => onDelete(v)} />
        ))}
        <SelectInput>
          <StyledInput
            ref={input}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            title={label}
            readOnly
            placeholder={placeholder}
          />
          <StyledLabel>{label}</StyledLabel>
        </SelectInput>
      </FloatingLabelControlBox>
      {isActive ? (
        <DropDownMenu>
          {items?.map((i) => (
            <Option
              bg="white"
              p="8px 10px"
              mt="8px"
              mb="6px"
              onMouseDown={() => {
                sevValueAndDispatchEvent(i);
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

export default FloatingLabelMultiDropDown;
