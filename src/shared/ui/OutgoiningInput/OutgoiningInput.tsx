import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, VFC } from 'react';
import Flex from 'shared/primitives/Flex';
import styled from 'styled-components';

const OutgoininigInput: VFC<{
  placeholder: string;
  name: string;
  value?: string;
  numeric?: boolean;
  onChange(value: string): void;
}> = ({ placeholder, name, value, onChange, numeric }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Flex>
      <StyledInput
        pattern={numeric ? '[0-9]*' : undefined}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Flex alignItems="center">{icons.get(isActive)}</Flex>
    </Flex>
  );
};

const icons = new Map([
  [true, <FontAwesomeIcon icon={faChevronUp} color="#48bbff" />],
  [false, <FontAwesomeIcon icon={faChevronDown} color="#48bbff" />],
]);

const StyledInput = styled.input`
  background-color: transparent;
  border-style: none;
  margin: 0;
  overflow: visible;
  display: block;
  width: 66px;
  padding: 5px 5px 7px 0;
  font-size: 16px;
  min-height: 38px;
  font-weight: 400;
  color: #788b99;
  ::placeholder {
    color: #48bbff;
    opacity: 1;
  }
  :focus-within {
    transition: width 0.5s;
    border-bottom: 1px solid #48bbff;
    color: #788b99;
    outline: none;
    padding-bottom: 6px;
  }
`;

export default OutgoininigInput;
