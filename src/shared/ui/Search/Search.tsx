import React, { VFC } from 'react';
import styled from 'styled-components';

const Search: VFC<{
  value?: string;
  onChange(value: string | undefined): void;
}> = ({ value, onChange }) => {
  const onClick = () => onChange(value);

  return (
    <SearchContainer>
      <SearchButton onClick={onClick} type="button">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#48BBFF"
              fillRule="nonzero"
              d="M15.64 13.537l-3.826-3.828c.577-.947.91-2.06.91-3.25 0-3.461-3-6.459-6.46-6.459A6.263 6.263 0 0 0 0 6.265c0 3.46 2.999 6.458 6.458 6.458a6.227 6.227 0 0 0 3.154-.854l3.847 3.85a.965.965 0 0 0 1.363 0l.955-.956c.376-.376.24-.85-.136-1.226zM1.929 6.265a4.337 4.337 0 0 1 4.336-4.338c2.396 0 4.531 2.134 4.531 4.531a4.338 4.338 0 0 1-4.337 4.338c-2.396 0-4.53-2.136-4.53-4.531z"
            />
          </svg>
        </span>
      </SearchButton>
      <SearchInput
        placeholder="Search"
        name="player_name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  position: relative;
`;

const SearchButton = styled.button`
  background-color: transparent;
  border-style: none;
  margin: 0;
  overflow: visible;
  display: block;
  border-radius: 4px;
  box-shadow: none;
  padding: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

const SearchInput = styled.input`
  background-color: transparent;
  border-style: none;
  margin: 0;
  overflow: visible;
  display: block;
  width: 100%;
  padding: 5px 5px 5px 24px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #788b99;
  border-bottom: 1px solid #48bbff;
  outline: none;
`;

export default Search;
