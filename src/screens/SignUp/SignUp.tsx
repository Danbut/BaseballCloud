import { authBackgroundImage } from 'assets/images';
import RoleSwitch from 'components/RoleSwitch';
import validateFormValues from 'helpers/validateFormSchema';
import React, { VFC } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import Auth from 'services/api';
import storage from 'services/storage';
import {
  Button,
  Flex,
  Input,
  Validation,
  Text,
  Anchor,
  ContentContainer,
} from 'shared';
import styled from 'styled-components';
import { Credentials } from 'types/Credentials';
import { Profile } from 'types/Profile';
import { Role } from 'types/Role';
import * as yup from 'yup';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import pick from 'lodash/pick';
import renameKey from 'helpers/renameKey';
import { SignUpRequest } from 'services/api/dto/SignUpRequestTransformer';
import routes from 'Routes/constants';
import withAuth from 'hocs/withAuth';

const Modal = styled(Flex)`
  backdrop-filter: blur(5px);
`;

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
  role: Role;
};

const ForgottenPasswordAnchor = styled(Anchor)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const signUpSchema = yup.object().shape({
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
  passwordConfirmation: yup
    .string()
    .required('Password is required.')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.'
    ),
  role: yup.string().required(),
});

const SignInAnchor = styled(Anchor)`
  white-space: pre-wrap;
  text-decoration: underline;
`;

const SignUp: VFC = () => {
  const history = useHistory();
  const onSubmit = async (values: SignUpFormValues) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { headers, data } = await Auth.signUp(
      renameKey(
        values,
        'passwordConfirmation',
        'password_confirmation'
      ) as SignUpRequest
    );
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
        <Form
          onSubmit={onSubmit}
          validate={validateFormValues(signUpSchema)}
          mutators={{
            onChangeRole: ([value], state, tools) => {
              tools.changeValue(state, 'role', () => value as Role);
            },
          }}
          initialValue={{
            role: 'player',
          }}
          render={({
            handleSubmit,
            form: {
              mutators: { onChangeRole },
            },
            values: { role },
          }) => (
            <form onSubmit={handleSubmit}>
              <Field<Role> name="role" initialValue="player">
                {() => <RoleSwitch onChange={onChangeRole} value={role} />}
              </Field>
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
                      isActive={active ?? false}
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
                      isActive={active ?? false}
                      type="password"
                      icon="password"
                    />
                  </Validation>
                )}
              </Field>
              <Field<string> name="passwordConfirmation">
                {({
                  input: { onChange, onFocus, onBlur },
                  meta: { error, active, touched },
                }) => (
                  <Validation message={touched ? (error as string) : undefined}>
                    <Input
                      onChange={onChange}
                      placeholder="Confirm Password"
                      onFocus={onFocus}
                      onBlur={onBlur}
                      isActive={active ?? false}
                      type="password"
                      icon="confirm"
                    />
                  </Validation>
                )}
              </Field>
              <Text m="8px 0" p="0 10px">
                By clicking Sign Up, you agree to our{' '}
                <ForgottenPasswordAnchor href="/legal/terms" color="#337ab7">
                  Terms of Service
                </ForgottenPasswordAnchor>{' '}
                and{' '}
                <ForgottenPasswordAnchor href="/legal/privacy" color="#337ab7">
                  Privacy Policy.
                </ForgottenPasswordAnchor>
              </Text>
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
                Sign Up
              </Button>
            </form>
          )}
        />
        <Flex justifyContent="center">
          <Text fontSize="16px" color="textColor">
            Already registered?
          </Text>
          <SignInAnchor href="/login" color="#48bbff" pl="3px">
            Sign In
          </SignInAnchor>
        </Flex>
      </Modal>
    </ContentContainer>
  );
};

export default withAuth(SignUp);
