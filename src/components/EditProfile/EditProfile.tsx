import React, { FC } from 'react';
import {
  Flex,
  Box,
  Text,
  FloatingLabelDropDown,
  FloatingLabelInput,
  FloatingLabelMultiDropDown,
  FloatingLabelTextArea,
} from 'shared';
import styled from 'styled-components';
import { avatarBackgroundImage } from 'assets/images';
import { Field, Form } from 'react-final-form';
import validateFormValues from 'helpers/validateFormSchema';
import * as yup from 'yup';
import {
  FacilitiesDocument,
  SchoolsDocument,
  TeamsDocument,
  useSchoolsQuery,
  useTeamsQuery,
} from 'generated';
import { useQuery } from '@apollo/client';

const EditProfileContainer = styled(Flex)`
  grid-area: sidebar;
  grid-column: 1;
`;

const ChoosePhotoForm = styled(Flex)``;

const Avatar = styled(Box)``;

type EditProfileValues = {
  firstName: string;
  lastName: string;
  position: string;
  secondaryPosition: string;
  age: number;
  feet: number;
  inches: number;
  weight: number;
  throws: string;
  bats: string;
  school: string;
  schoolYear: string;
  team: string[];
  facility: string[];
  description: string;
};

const EditProfileSchema = yup.object().shape({});

const FormSectionHeader: FC<{ children: string }> = ({ children }) => (
  <Flex mb="15px">{children}</Flex>
);

const Floating = styled(Flex)`
  > * {
    flex-basis: 48%;
  }
`;

const EditProfile = () => {
  const onSubmit = async (values: EditProfileValues) => Promise.resolve();

  return (
    <EditProfileContainer
      as="aside"
      bg="white"
      width={['100vw', '200px']}
      p="16px"
      borderLeft="1px solid rgba(0, 0, 0, 0.1)"
      borderRight="1px solid rgba(0, 0, 0, 0.1)"
      overflow="auto"
      boxShadow="0 2px 15px 0 rgb(0 0 0 / 10%)"
      flexDirection="column"
    >
      <ChoosePhotoForm
        as="form"
        flexDirection="column"
        alignItems="center"
        mb="23px"
      >
        <Avatar
          mb="8px"
          overflow="hidden"
          borderRadius="50%"
          backgroundImage={`url(${avatarBackgroundImage})`}
          width="100px"
          height="100px"
          backgroundSize="cover"
          backgroundPosition="50% 50%"
        />
        <Text>Choose Photo</Text>
      </ChoosePhotoForm>
      <Form
        onSubmit={onSubmit}
        validate={validateFormValues(EditProfileSchema)}
        mutators={{
          onChangePosition: ([value], state, tools) => {
            tools.changeValue(state, 'position', () => value as string);
          },
        }}
        initialValue={{
          position: '',
        }}
        render={({
          handleSubmit,
          form: {
            mutators: { onChangePosition },
          },
          values: { position },
        }) => (
          <form onSubmit={handleSubmit}>
            <Floating mb="20px" justifyContent="space-between">
              <Field<string> name="firstName">
                {({
                  input: { onChange, onFocus, onBlur },
                  meta: { error, active, touched },
                }) => (
                  <FloatingLabelInput
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    isActive={!!active}
                    placeholder="First Name"
                    isRequire
                  />
                )}
              </Field>
              <Field<string> name="lastName">
                {({
                  input: { onChange, onFocus, onBlur },
                  meta: { error, active, touched },
                }) => (
                  <FloatingLabelInput
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    isActive={!!active}
                    placeholder="Last Name"
                    isRequire
                  />
                )}
              </Field>
            </Floating>
            <Field<string> name="position">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelDropDown
                  onChange={onChangePosition}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  value={position}
                  isActive={!!active}
                  items={['1', '2', '3', '4', '5', '6', '7']}
                  placeholder="Position In Game"
                  isRequire
                />
              )}
            </Field>
            <Field<string> name="secondaryPosition">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelDropDown
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Secondary Position In Game"
                />
              )}
            </Field>
            <FormSectionHeader>Personal Info</FormSectionHeader>
            <Field<string> name="age">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelInput
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Age"
                />
              )}
            </Field>
            <Field<string> name="feet">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelInput
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Feet"
                />
              )}
            </Field>
            <Field<string> name="inches">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelInput
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Inches"
                />
              )}
            </Field>
            <Field<string> name="weight">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelInput
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Weight"
                />
              )}
            </Field>
            <Field<string> name="throws">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelDropDown
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Throws"
                />
              )}
            </Field>
            <Field<string> name="bats">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelDropDown
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Bats"
                />
              )}
            </Field>
            <FormSectionHeader>School</FormSectionHeader>
            <Field<string> name="school">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelDropDown
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="School"
                />
              )}
            </Field>
            <Field<string> name="school year">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelDropDown
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="School Year"
                />
              )}
            </Field>
            <Field<string[]>
              name="team"
              parse={(value) => (value as string).split(' ').filter((v) => v)}
              format={(value) => value ?? []}
            >
              {({
                input: { onChange, onFocus, onBlur, value },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelMultiDropDown
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Teams"
                  // items={['1sdadsadasdas', '2sdad', '3', '4dsadsadsad']}
                  // values={value}
                />
              )}
            </Field>
            <FormSectionHeader>Facility</FormSectionHeader>
            <Field<string> name="facility">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelMultiDropDown
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Facility"
                />
              )}
            </Field>
            <FormSectionHeader>About</FormSectionHeader>
            <Field<string> name="description">
              {({
                input: { onChange, onFocus, onBlur },
                meta: { error, active, touched },
              }) => (
                <FloatingLabelTextArea
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  isActive={!!active}
                  placeholder="Description yourself in a few words"
                />
              )}
            </Field>
          </form>
        )}
      />
    </EditProfileContainer>
  );
};

export default EditProfile;
