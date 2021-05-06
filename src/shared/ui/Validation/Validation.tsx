import React, { FC, ReactElement } from 'react';
import {
  ValidationContainer,
  ValidationWrapper,
} from '@skbkontur/react-ui-validations';

interface ValidationProps {
  message?: string;
}

const Validation: FC<ValidationProps> = ({ children, message }) => (
  <ValidationContainer>
    <ValidationWrapper validationInfo={{ message }}>
      {children as ReactElement}
    </ValidationWrapper>
  </ValidationContainer>
);

export default Validation;
