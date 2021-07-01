import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, VFC } from 'react';
import Box from 'shared/primitives/Box';

import styled from 'styled-components';

interface SelectProps {
  value?: string;
  items: string[];
  onChange(value: string | undefined): void;
  placeholder?: string;
  mask?: string;
  withoutNone?: boolean;
}

const Select: VFC<SelectProps> = ({
  value,
  items,
  onChange,
  placeholder,
  mask,
  withoutNone,
}) => {
  const [isActive, setIsActive] = useState(false);

  const icon = isActive ? 'up' : 'down';

  const maskText = mask ? `${mask} ${value as string}` : null;

  const placeholderText = value
    ? `${placeholder as string} (${value})`
    : placeholder;

  return (
    <SelectContainer>
      <SelectButton onClick={() => setIsActive(!isActive)}>
        {placeholder ? placeholderText : maskText}&nbsp;
        {validIcons[icon]}
      </SelectButton>
      {isActive ? (
        <DropDownMenu
          onMouseLeave={() => {
            setIsActive(false);
          }}
        >
          {!withoutNone && (
            <Option
              p="8px 10px"
              mt="8px"
              mb="6px"
              onMouseDown={() => {
                onChange(undefined);
                setIsActive(false);
              }}
            >
              None
            </Option>
          )}
          {items?.map((i) => (
            <Option
              p="8px 10px"
              mt="8px"
              mb="6px"
              onMouseDown={() => {
                onChange(i);
                setIsActive(false);
              }}
            >
              {i}
            </Option>
          ))}
        </DropDownMenu>
      ) : null}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
`;

const Option = styled(Box)`
  :focus {
    background-color: dodgerBlue;
    opacity: 0.1;
  }
`;

const DropDownMenu = styled.div`
  width: 178px;
  position: absolute;
  top: 100%;
  right: 0;
  box-sizing: border-box;
  z-index: 10;
  margin-top: 6px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #eff1f3;
  border-radius: 4px;
  overflow-y: auto;
  background: white;
`;

const validIcons = {
  up: <FontAwesomeIcon icon="chevron-up" color="#48bbff" />,
  down: <FontAwesomeIcon icon="chevron-down" color="#48bbff" />,
} as const;

const SelectButton = styled.button`
  background-color: transparent;
  margin: 0;
  overflow: visible;
  font-weight: 400;
  padding: 0;
  font-size: 16px;
  color: #48bbff;
  white-space: nowrap;
  display: flex;
  align-items: flex-start;
  outline: none;
  box-shadow: none;
  border: none;
  position: relative;
`;

export default Select;
