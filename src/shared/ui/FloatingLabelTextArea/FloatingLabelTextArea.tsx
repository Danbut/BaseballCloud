import React, { VFC } from 'react';

interface FloatingLabelTextArea extends React.HTMLProps<HTMLInputElement> {
  isActive: boolean;
  isRequire?: boolean;
}

const FloatingLabelTextArea: VFC<FloatingLabelTextArea> = () => <></>;

export default FloatingLabelTextArea;
