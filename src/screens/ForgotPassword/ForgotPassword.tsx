import authBackgroundImage from 'assets/images';
import validateFormValues from 'helpers/validateFormSchema';
import React, { VFC } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Flex, Input, Validation, Text, Anchor, Box } from 'shared';
import styled from 'styled-components';
import * as yup from 'yup';

const ContentContainer = styled(Flex)`
  grid-area: content;
`;

const Modal = styled(Flex)`
  backdrop-filter: blur(5px);
`;

type ForgotPasswordFormValues = {
  email: string;
};

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email doesn't valid.")
    .required('Email is required.'),
});

const SignInAnchor = styled(Anchor)`
  white-space: pre-wrap;
  text-decoration: underline;
`;

const ForgotPassword: VFC = () => {
  const onSubmit = () => Promise.resolve();

  return (
    <ContentContainer
      width="100%"
      height="100%"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      p="16px"
      backgroundImage={`url(${authBackgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="top center"
    >
      <Modal
        background="hsla(0,0%,100%,.8)"
        p="16px"
        flexDirection="column"
        borderRadius="8px"
        boxShadow="0 0 20px rgb(0 0 0 / 40%)"
        width="100%"
        maxWidth="450px"
      >
        <Box mb="48px">
          <Text
            fontSize="24px"
            fontWeight="400"
            textAlign="center"
            color="textColor"
            mb="8px"
          >
            Forgot Password
          </Text>
          <Text fontSize="16px" color="textColor" textAlign="center">
            Please enter your email address. You will receive a link to reset
            your password via email.{' '}
          </Text>
        </Box>
        <Form
          onSubmit={onSubmit}
          validate={validateFormValues(forgotPasswordSchema)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field<string> name="email">
                {({
                  input: { onChange, onFocus, onBlur },
                  meta: { error, active, touched },
                }) => (
                  <Validation message={touched ? (error as string) : undefined}>
                    <Input
                      onChange={onChange}
                      placeholder="Email"
                      onFocus={onFocus}
                      onBlur={onBlur}
                      isActive={active}
                      icon="email"
                    />
                  </Validation>
                )}
              </Field>
              <Button
                mb="15px"
                pt="15px"
                pb="17px"
                width="100%"
                bg="#48bbff"
                boxShadow="0 0 4px 0 rgba(72, 187, 255, 0)"
                borderRadius="4px"
                fontSize="16px"
                color="white"
                fontWeight="400"
                border="solid 1px transparent"
                type="submit"
                onSubmit={handleSubmit}
              >
                Submit
              </Button>
            </form>
          )}
        />
        <Flex justifyContent="center">
          <Text fontSize="16px" color="textColor">
            Remember password?
          </Text>
          <SignInAnchor href="/login" color="#48bbff" pl="3px">
            Sign In
          </SignInAnchor>
        </Flex>
      </Modal>
    </ContentContainer>
  );
};

export default ForgotPassword;
