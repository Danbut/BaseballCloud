import React, { FC, VFC } from 'react';
import {
  Flex,
  FloatingLabelDropDown,
  FloatingLabelInput,
  FloatingLabelMultiDropDown,
  FloatingLabelTextArea,
} from 'shared';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import validateFormValues from 'helpers/validateFormSchema';
import * as yup from 'yup';
import {
  Facility,
  School,
  Team,
  useFacilitiesQuery,
  useSchoolsQuery,
  useTeamsQuery,
} from 'generated';

import { Item } from 'shared/ui/FloatingLabelMultiDropDown/FloatingLabelMultiDropDown';
import ChoosePhoto from '../ChoosePhoto';

const EditProfileContainer = styled(Flex)`
  grid-area: sidebar;
  grid-column: 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

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

const SectionDivider = styled(Flex)`
  position: relative;
  :before {
    content: '';
    position: absolute;
    top: 36px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e7ebef;
    z-index: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  text-align: left;
  display: inline-block;
  position: relative;
  z-index: 1;
  padding-right: 12px;
  background-color: #ffffff;
`;

const FormSectionHeader: FC<{ children: string }> = ({ children }) => (
  <SectionDivider mb="15px">
    <SectionTitle>{children}</SectionTitle>
  </SectionDivider>
);

const Floating = styled(Flex)`
  > * {
    flex-basis: 48%;
  }
`;

const FirstName: VFC = () => (
  <Field<string> name="firstName">
    {({ input: { onChange, onFocus, onBlur }, meta: { active } }) => (
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
);

const LastName: VFC = () => (
  <Field<string> name="lastName">
    {({ input: { onChange, onFocus, onBlur }, meta: { active } }) => (
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
);

const positions = [
  {
    slug: 'catcher',
    name: 'Catcher',
  },
  {
    slug: 'first_base',
    name: 'First Base',
  },
  {
    slug: 'second_base',
    name: 'Second Base',
  },
  {
    slug: 'shortstop',
    name: 'Shortstop',
  },
  {
    slug: 'third_base',
    name: 'Third Base',
  },
  {
    slug: 'outfield',
    name: 'Outfield',
  },
  {
    slug: 'pitcher',
    name: 'Pitcher',
  },
] as const;

const SelectPosition: VFC = () => (
  <Field<typeof positions[number]>
    name="position"
    parse={(value: string) => positions.find((p) => p?.name === value)!}
  >
    {({ input: { onChange, onFocus, onBlur, value }, meta: { active } }) => (
      <FloatingLabelDropDown
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        isActive={!!active}
        placeholder="Position"
        items={(positions as unknown) as Item[]}
        value={{ id: Math.random(), name: value.name }}
        isRequire
      />
    )}
  </Field>
);

const SelectSecondaryPosition: VFC = () => (
  <Field<typeof positions[number]>
    name="secondaryPosition"
    parse={(value: string) => positions.find((p) => p?.name === value)!}
  >
    {({ input: { onChange, onFocus, onBlur, value }, meta: { active } }) => (
      <FloatingLabelDropDown
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        isActive={!!active}
        placeholder="Secondary Position"
        items={(positions as unknown) as Item[]}
        value={{ id: Math.random(), name: value.name }}
      />
    )}
  </Field>
);

const Age: VFC = () => (
  <Flex mb="20px">
    <Field<string> name="age">
      {({ input: { onChange, onFocus, onBlur }, meta: { active } }) => (
        <FloatingLabelInput
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          isActive={!!active}
          placeholder="Age"
          isRequire
        />
      )}
    </Field>
  </Flex>
);

const Feet: VFC = () => (
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
        isRequire
      />
    )}
  </Field>
);

const Inches: VFC = () => (
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
);

const Weight: VFC = () => (
  <Flex mb="20px">
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
          isRequire
        />
      )}
    </Field>
  </Flex>
);

const hands = [
  {
    slug: 'l',
    name: 'L',
  },
  {
    slug: 'r',
    name: 'R',
  },
] as const;

const SelectThrows: VFC = () => (
  <Field<typeof hands[number]>
    name="throws"
    parse={(value: string) => hands.find((h) => h?.name === value)!}
  >
    {({ input: { onChange, onFocus, onBlur, value }, meta: { active } }) => (
      <FloatingLabelDropDown
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        isActive={!!active}
        placeholder="Throws"
        items={(hands as unknown) as Item[]}
        value={{ id: Math.random(), name: value.name }}
        isRequire
      />
    )}
  </Field>
);

const SelectBats: VFC = () => (
  <Field<typeof hands[number]>
    name="bats"
    parse={(value: string) => hands.find((h) => h?.name === value)!}
  >
    {({ input: { onChange, onFocus, onBlur, value }, meta: { active } }) => (
      <FloatingLabelDropDown
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        isActive={!!active}
        placeholder="Bats"
        items={(hands as unknown) as Item[]}
        value={{ id: Math.random(), name: value.name }}
        isRequire
      />
    )}
  </Field>
);

const SelectSchool: VFC = () => {
  // eslint-disable-next-line
  const { data } = useSchoolsQuery({
    variables: {
      search: '',
    },
  });

  return (
    <Field<Readonly<School>[]>
      name="school"
      // eslint-disable-next-line
      //@ts-ignore
      parse={(value: string) =>
        data?.schools?.schools?.filter(
          (s) => s?.name && value.includes(s.name)
        ) ?? []
      }
      format={(value) => value ?? []}
    >
      {
        /* eslint-disable-next-line */ ({
          input: { onChange, onFocus, onBlur, value },
          meta: { active },
        }) => (
          <FloatingLabelMultiDropDown
            items={((data?.schools?.schools ?? []) as unknown) as Item[]}
            values={(value as unknown) as Item[]}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Schools"
          />
        )
      }
    </Field>
  );
};

const years = [
  {
    slug: 'freshman',
    name: 'Freshman',
  },
  {
    slug: 'sophomore',
    name: 'Sophomore',
  },
  {
    slug: 'junior',
    name: 'Junior',
  },
  {
    slug: 'senior',
    name: 'Senior',
  },
  {
    slug: 'none',
    name: 'None',
  },
] as const;

const SelectSchoolYear: VFC = () => (
  <Field<typeof years[number]>
    name="school year"
    parse={(value: string) => years.find((y) => y?.name === value)!}
  >
    {({ input: { onChange, onFocus, onBlur, value }, meta: { active } }) => (
      <FloatingLabelDropDown
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        isActive={!!active}
        placeholder="School Year"
        items={(years as unknown) as Item[]}
        value={{ id: Math.random(), name: value.name }}
      />
    )}
  </Field>
);

const SelectTeams: VFC = () => {
  // eslint-disable-next-line
  const { data } = useTeamsQuery({
    variables: {
      search: '',
    },
  });

  return (
    <Field<Readonly<Team>[]>
      name="team"
      // eslint-disable-next-line
      //@ts-ignore
      parse={(value: string) =>
        data?.teams?.teams?.filter((t) => t?.name && value.includes(t.name)) ??
        []
      }
      format={(value) => value ?? []}
    >
      {
        /* eslint-disable-next-line */ ({
          input: { onChange, onFocus, onBlur, value },
          meta: { active },
        }) => (
          <FloatingLabelMultiDropDown
            items={((data?.teams?.teams ?? []) as unknown) as Item[]}
            values={(value as unknown) as Item[]}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Teams"
          />
        )
      }
    </Field>
  );
};

const SelectFacilities: VFC = () => {
  const { data } = useFacilitiesQuery({
    variables: {
      search: '',
    },
  });

  return (
    <Field<Readonly<Facility>[]>
      name="facility"
      // eslint-disable-next-line
      // @ts-ignore
      parse={(value: string) =>
        data?.facilities?.facilities?.filter(
          (t) => t?.u_name && value.includes(t.u_name)
        ) ?? []
      }
      format={(value) =>
        value?.map((f) => ({
          id: f?.id,
          name: f?.u_name,
        })) ?? []
      }
    >
      {
        /* eslint-disable-next-line */ ({
          input: { onChange, onFocus, onBlur, value },
          meta: { active },
        }) => (
          <FloatingLabelMultiDropDown
            items={
              ((data?.facilities?.facilities?.map((f) => ({
                id: f?.id,
                name: f?.u_name,
              })) ?? []) as unknown) as Item[]
            }
            values={(value as unknown) as Item[]}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Facilities"
          />
        )
      }
    </Field>
  );
};

const Description: VFC = () => (
  <Flex mb="20px">
    <Field<string> name="description">
      {({ input: { onChange, onFocus, onBlur }, meta: { active } }) => (
        <FloatingLabelTextArea
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          isActive={!!active}
          placeholder="Description yourself in a few words"
        />
      )}
    </Field>
  </Flex>
);

const ButtonContainer = styled.div`
  color: #333;
  font-size: 1.6rem;
  font-family: 'Lato', sans-serif;

  display: flex;
`;

const CancelButton = styled.button`
  margin: 0;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  border: solid 1px #d1d7db;
  background-color: #ffffff;
  box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0);
  width: 100%;
  flex: 1 1 auto;
  margin-right: 12px;
`;

const SaveButton = styled.button`
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  width: 100%;
  flex: 1 1 auto;
  outline: none;
  color: #ffffff;
  box-shadow: 0 0 4px 0 rgba(72, 187, 255, 0.8);
  border: solid 1px transparent;
  background-color: #48bbff;
  margin-right: 0;
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
      boxShadow="0 2px 15px 0 rgb(0 0 0 / 10%)"
      flexDirection="column"
      flex="1"
    >
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
            <ChoosePhoto />
            <Floating mb="20px" justifyContent="space-between">
              <FirstName />
              <LastName />
            </Floating>
            <SelectPosition />
            <SelectSecondaryPosition />
            <FormSectionHeader>Personal Info</FormSectionHeader>

            <Age />

            <Floating mb="20px" justifyContent="space-between">
              <Feet />
              <Inches />
            </Floating>
            <Weight />
            <Floating mb="20px" justifyContent="space-between">
              <SelectThrows />
              <SelectBats />
            </Floating>
            <FormSectionHeader>School</FormSectionHeader>
            <SelectSchool />
            <SelectSchoolYear />
            <SelectTeams />
            <FormSectionHeader>Facility</FormSectionHeader>
            <SelectFacilities />
            <FormSectionHeader>About</FormSectionHeader>
            <Description />
            <ButtonContainer>
              <CancelButton>Cancel</CancelButton>
              <SaveButton>Save</SaveButton>
            </ButtonContainer>
          </form>
        )}
      />
    </EditProfileContainer>
  );
};

export default EditProfile;
