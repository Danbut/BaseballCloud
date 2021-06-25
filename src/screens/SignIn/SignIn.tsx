import authBackgroundImage from 'assets/images';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Anchor, Box, Button, Flex, Text, Validation } from 'shared';
import Input from 'shared/ui/Input';
import { Field, Form } from 'react-final-form';
import * as yup from 'yup';
import validateFormValues from 'helpers/validateFormSchema';
import Auth from 'services/api';
import storage from 'services/storage';
import { Credentials } from 'types/Credentials';
import { Profile } from 'types/Profile';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import pick from 'lodash/pick';
import { useHistory } from 'react-router-dom';
import routes from 'Routes/constants';
import withAuth from 'hocs/withAuth';

const ContentContainer = styled(Flex)`
  grid-area: content;
`;

const Modal = styled(Flex)`
  backdrop-filter: blur(5px);
`;

type SignInFormValues = {
  email: string;
  password: string;
};

const ForgottenPasswordAnchor = styled(Anchor)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SignInAnchor = styled(Anchor)`
  white-space: pre-wrap;
  text-decoration: underline;
`;

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email doesn't valid.")
    .required('Email is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.'
    ),
});

const SignIn: FC = () => {
  const history = useHistory();
  const onSubmit = async (values: SignInFormValues) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { headers, data } = await Auth.signIn(values);
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    const credentials: Credentials = {
      token: headers['access-token'],
      uid: headers.uid,
      client: headers.client,
    };

    const profile: Profile = pick(pickBy(data.data, identity), [
      'id',
      'email',
      'u_name',
      'team_avatar',
      'team_user',
      'uid',
      'plan_id',
      'paid',
      'direct_paid',
      'role',
      'unsubscribe',
    ]) as Profile;
    storage.setProfile(profile);
    storage.setCredentials(credentials);
    history.push(routes.profile);
  };

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
            Welcome to BaseballCloud!
          </Text>
          <Text fontSize="16px" color="textColor" textAlign="center">
            Sign into your account here:
          </Text>
        </Box>
        <Form
          onSubmit={onSubmit}
          validate={validateFormValues(signInSchema)}
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
              <Field<string> name="password">
                {({
                  input: { onChange, onFocus, onBlur },
                  meta: { error, active, touched },
                }) => (
                  <Validation message={touched ? (error as string) : undefined}>
                    <Input
                      onChange={onChange}
                      placeholder="Password"
                      onFocus={onFocus}
                      onBlur={onBlur}
                      isActive={active}
                      type="password"
                      icon="password"
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
                Sign In
              </Button>
              <Flex justifyContent="flex-end" mb="15px">
                <ForgottenPasswordAnchor href="forgotpassword" color="#337ab7">
                  Forgotten password?
                </ForgottenPasswordAnchor>
              </Flex>
            </form>
          )}
        />
        <Flex justifyContent="center">
          <Text fontSize="16px" color="textColor">
            Don’t have an account?
          </Text>
          <SignInAnchor href="/registration" color="#48bbff" pl="3px">
            Sign Up
          </SignInAnchor>
        </Flex>
      </Modal>
    </ContentContainer>
  );
};

export default withAuth(SignIn);
