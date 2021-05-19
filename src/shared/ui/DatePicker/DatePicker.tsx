import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState, VFC } from 'react';
import LibDatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker: VFC<{ value: Date; onChange(value: Date): void }> = ({
  value,
  onChange,
}) => {
  const [isActive, setIsActive] = useState(false);
  const icon = isActive ? 'up' : 'down';
  return (
    <SelectContainer>
      <SelectButton onClick={() => setIsActive(!isActive)}>
        {`Date (${moment(value).format('DD/MM/YYYY')})`}&nbsp;
        {validIcons[icon]}
      </SelectButton>
      {isActive && (
        <DatePickerContainer>
          <LibDatePicker
            selected={value}
            onChange={(date) => {
              if (date) {
                onChange(date as Date);
                setIsActive(false);
              }
            }}
            inline
          />
        </DatePickerContainer>
      )}
    </SelectContainer>
  );
};

const DatePickerContainer = styled.div`
  position: absolute;
`;

const SelectContainer = styled.div`
  position: relative;
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

export default DatePicker;
