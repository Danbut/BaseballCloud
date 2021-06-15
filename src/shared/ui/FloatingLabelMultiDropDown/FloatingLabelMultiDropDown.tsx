import React, { VFC } from 'react';

// const Chop = ({ value }) => (
//   <Container>
//     <Icon></Icon>
//     <Label>{value}</Label>
//   </Container>
// );

interface FloatingLabelMultiDropDown extends React.HTMLProps<HTMLInputElement> {
  isActive: boolean;
  isRequire?: boolean;
}

const FloatingLabelMultiDropDown: VFC<FloatingLabelMultiDropDown> = () => <></>;

export default FloatingLabelMultiDropDown;
