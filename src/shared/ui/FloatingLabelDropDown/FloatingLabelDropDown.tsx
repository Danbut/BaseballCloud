import React, { VFC } from 'react';
import styled from 'styled-components';

interface FloatingLabelDropDownProps extends React.HTMLProps<HTMLInputElement> {
  isActive: boolean;
  isRequire?: boolean;
}

// CONTAINER
// cursor: default;

// line-height: 1.42857143;
// color: #333;
// font-size: 1.6rem;
// font-family: 'Lato', sans-serif;
// background-repeat: no-repeat;
// background-color: #fff;
// max-height: 200px;
// position: absolute;
// left: 0;
// top: 100%;
// width: 100%;
// box-sizing: border-box;
// z-index: 10;
// margin-top: 6px;
// box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
// border: solid 1px #eff1f3;
// border-radius: 4px;

// LIST
// cursor: default;

// line-height: 1.42857143;
// color: #333;
// font-size: 1.6rem;
// font-family: 'Lato', sans-serif;
// background-repeat: no-repeat;
// touch-action: manipulation;
// max-height: 198px;
// overflow-y: auto;
// box-sizing: border-box;

// OPTION

// background-color: #fff;
// display: block;
// padding: 8px 10px;
// box-sizing: border-box;
// font-size: 16px;
// color: #788b99;
// margin-bottom: 6px;
// margin-top: 8px;

// <div class="Select-menu-outer">
//    <div class="Select-menu" id="react-select-18">
//       <div class="Select-option" role="option" aria-label="Catcher" id="react-select-18" />
//       <div class="Select-option" role="option" aria-label="First Base" id="react-select-18" />
//       <div class="Select-option" role="option" aria-label="Second Base" id="react-select-18"/>
//       <div class="Select-option is-selected is-focused" role="option" aria-label="Shortstop" id="react-select-18"/>
//       <div class="Select-option" role="option" aria-label="Third Base" id="react-select-18"/>
//       <div class="Select-option" role="option" aria-label="Outfield" id="react-select-18"/>
//       <div class="Select-option" role="option" aria-label="Pitcher" id="react-select-18"/>
//    </div>
// </div>

// const DropDownMenu = styled.div`
//   z-index: 10;
// `;

// const DropDownOptionList = ({ children }) => (
//   <DropDownMenu>{children}</DropDownMenu>
// );

const FloatingLabelDropDown: VFC<FloatingLabelDropDownProps> = ({
  isActive,
}) => (
  <div>
    {/* <InputContainer mb="15px">
      {icon && validIcons[icon]}
      <ControlBox isActive={isActive}>
        <StyledInput
          type={type}
          name="password"
          title="Password"
          onChange={onChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </ControlBox>
    </InputContainer>
    {isActive ? <DropDownOptionList /> : null} */}
  </div>
);

export default FloatingLabelDropDown;
