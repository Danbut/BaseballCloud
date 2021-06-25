import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, VFC } from 'react';
import Box from 'shared/primitives/Box';

import styled from 'styled-components';

interface SelectProps {
  value: string;
  items: string[];
  onChange(value: string): void;
}

const Select: VFC<SelectProps> = ({ value, items, onChange }) => {
  const [isActive, setIsActive] = useState(false);

  const icon = isActive ? 'up' : 'down';
  return (
    <div>
      <SelectButton>
        {value}
        {validIcons[icon]}
      </SelectButton>
      {isActive ? (
        <DropDownMenu>
          {items?.map((i) => (
            <Option
              p="8px 10px"
              mt="8px"
              mb="6px"
              onMouseDown={() => {
                console.log('dsdas');
              }}
            >
              {i}
            </Option>
          ))}
        </DropDownMenu>
      ) : null}
    </div>
  );
};

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

const IconContainer = styled(Box)`
  position: absolute;
  z-index: 9;
  pointer-events: none;
`;

const validIcons = {
  up: (
    <IconContainer right="16px" bottom="10px">
      <FontAwesomeIcon icon="chevron-up" color="#48bbff" />
    </IconContainer>
  ),
  down: (
    <IconContainer right="16px" bottom="10px">
      <FontAwesomeIcon icon="chevron-down" color="#48bbff" />
    </IconContainer>
  ),
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
`;

export default Select;
