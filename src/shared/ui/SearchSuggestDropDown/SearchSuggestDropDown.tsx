import usePrevious from 'hooks/usePrevious';
import isEqual from 'lodash/isEqual';
import React, { useEffect, useState, VFC } from 'react';
import Box from 'shared/primitives/Box';

import styled from 'styled-components';
import Search from '../Search';

const SearchSuggestDropDown: VFC<{
  value: string;
  onChange(value: string): void;
  items: string[];
}> = ({ value, onChange, items }) => {
  const [isActive, setIsActive] = useState(false);
  const prevItems = usePrevious(items);
  useEffect(() => {
    if (isEqual(prevItems, items)) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
    // eslint-disable-next-line
  }, [items]);

  return (
    <SelectContainer>
      <Search value={value} onChange={onChange} />
      {isActive && items.length ? (
        <DropDownMenu>
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

export default SearchSuggestDropDown;
