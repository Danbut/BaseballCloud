import React, { FC, VFC } from 'react';
import {
  Flex,
  FloatingLabelDropDown,
  FloatingLabelInput,
  FloatingLabelMultiDropDown,
  FloatingLabelTextArea,
  Validation,
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
  useUpdateProfileMutation,
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
  school: School;
  schoolYear: string;
  team: Team[];
  facility: Facility[];
  description: string;
  avatar: string;
};

const EditProfileSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  position: yup.string().required('Position is required.'),
  age: yup
    .number()
    .positive('You must be older than 0')
    .max(30, 'Must not be older than 30')
    .required('Age is required.'),
  feet: yup
    .number()
    .min(4, 'Minimum height is 4')
    .max(7, 'Maximum height is 7')
    .required('Feet is required.'),
  inches: yup
    .number()
    .min(0, 'Inches can be from 0 to 11.')
    .max(11, 'Inches can be from 0 to 11.'),
  weight: yup
    .number()
    .min(50, 'Minimal weight is 50 lbs.')
    .max(350, 'Maximum weight is 350 lbs.')
    .required('Weight is required.'),
  throws: yup.string().required('Trow is required.'),
  bats: yup.string().required('Bats is required.'),
});

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
    {({
      input: { onChange, onFocus, onBlur },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <Flex mb="20px">
          <FloatingLabelInput
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="First Name"
            isRequire
          />
        </Flex>
      </Validation>
    )}
  </Field>
);

const LastName: VFC = () => (
  <Field<string> name="lastName">
    {({
      input: { onChange, onFocus, onBlur },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <Flex mb="20px">
          <FloatingLabelInput
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Last Name"
            isRequire
          />
        </Flex>
      </Validation>
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
  <Field<string>
    name="position"
    parse={(value: string) => positions.find((p) => p?.name === value)!.slug}
    format={(value: string) =>
      value && positions.find((p) => p?.slug === value)!.name
    }
  >
    {({
      input: { onChange, onFocus, onBlur, value },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <FloatingLabelDropDown
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          isActive={!!active}
          placeholder="Position"
          items={(positions as unknown) as Item[]}
          value={{ id: Math.random(), name: value }}
          isRequire
        />
      </Validation>
    )}
  </Field>
);

const SelectSecondaryPosition: VFC = () => (
  <Field<string>
    name="secondaryPosition"
    parse={(value: string) => positions.find((p) => p?.name === value)!.slug}
    format={(value: string) =>
      value && positions.find((p) => p?.slug === value)!.name
    }
  >
    {({ input: { onChange, onFocus, onBlur, value }, meta: { active } }) => (
      <FloatingLabelDropDown
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        isActive={!!active}
        placeholder="Secondary Position"
        items={(positions as unknown) as Item[]}
        value={{ id: Math.random(), name: value }}
      />
    )}
  </Field>
);

const Age: VFC = () => (
  <Field<number>
    name="age"
    parse={(value) => parseInt(value, 10)}
    format={(value) => value.toString()}
  >
    {({
      input: { onChange, onFocus, onBlur },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <Flex mb="20px">
          <FloatingLabelInput
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Age"
            isRequire
          />
        </Flex>
      </Validation>
    )}
  </Field>
);

const Feet: VFC = () => (
  <Field<number>
    name="feet"
    parse={(value) => parseInt(value, 10)}
    format={(value) => value.toString()}
  >
    {({
      input: { onChange, onFocus, onBlur },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <Flex mb="20px">
          <FloatingLabelInput
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Feet"
            isRequire
          />
        </Flex>
      </Validation>
    )}
  </Field>
);

const Inches: VFC = () => (
  <Field<number>
    name="inches"
    parse={(value) => parseInt(value, 10)}
    format={(value) => value.toString()}
  >
    {({
      input: { onChange, onFocus, onBlur },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <Flex mb="20px">
          <FloatingLabelInput
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Inches"
          />
        </Flex>
      </Validation>
    )}
  </Field>
);

const Weight: VFC = () => (
  <Field<number>
    name="weight"
    parse={(value) => parseInt(value, 10)}
    format={(value) => value.toString()}
  >
    {({
      input: { onChange, onFocus, onBlur },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <Flex mb="20px">
          <FloatingLabelInput
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Weight"
            isRequire
          />
        </Flex>
      </Validation>
    )}
  </Field>
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
  <Field<string>
    name="throws"
    parse={(value: string) => hands.find((h) => h?.name === value)!.slug}
    format={(value: string) =>
      value && hands.find((h) => h?.slug === value)!.name
    }
  >
    {({
      input: { onChange, onFocus, onBlur, value },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <Flex mb="20px">
          <FloatingLabelDropDown
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Throws"
            items={(hands as unknown) as Item[]}
            value={{ id: Math.random(), name: value }}
            isRequire
          />
        </Flex>
      </Validation>
    )}
  </Field>
);

const SelectBats: VFC = () => (
  <Field<string>
    name="bats"
    parse={(value: string) => hands.find((h) => h?.name === value)!.slug}
    format={(value: string) =>
      value && hands.find((h) => h?.slug === value)!.name
    }
  >
    {({
      input: { onChange, onFocus, onBlur, value },
      meta: { error, active, touched },
    }) => (
      <Validation message={touched ? (error as string) : undefined}>
        <Flex mb="20px">
          <FloatingLabelDropDown
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={!!active}
            placeholder="Bats"
            items={(hands as unknown) as Item[]}
            value={{ id: Math.random(), name: value }}
            isRequire
          />
        </Flex>
      </Validation>
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
    <Field<School>
      name="school"
      // eslint-disable-next-line
      // @ts-ignore
      parse={(value: string) =>
        data &&
        data.schools?.schools &&
        data.schools.schools.find((y) => y?.name === value)
      }
    >
      {({ input: { onChange, onFocus, onBlur, value }, meta: { active } }) => (
        <FloatingLabelDropDown
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          isActive={!!active}
          placeholder="School Year"
          items={(data?.schools?.schools as unknown) as Item[]}
          value={(value as unknown) as Item}
        />
      )}
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
  <Field<string>
    name="school year"
    parse={(value: string) => years.find((y) => y?.name === value)!.slug}
    format={(value: string) =>
      value && years.find((y) => y?.slug === value)!.name
    }
  >
    {({ input: { onChange, onFocus, onBlur, value }, meta: { active } }) => (
      <FloatingLabelDropDown
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        isActive={!!active}
        placeholder="School Year"
        items={(years as unknown) as Item[]}
        value={{ id: Math.random(), name: value }}
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

interface EditProfile {
  onCancel: () => void;
  id: string;
}

const EditProfile: VFC<EditProfile> = ({ onCancel, id }) => {
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (values: EditProfileValues) => {
    console.log(JSON.stringify(values));

    const prepare = {
      avatar: values.avatar,
      feet: values.feet,
      inches: values.inches,
      weight: values.weight,
      age: values.age,
      school_year: values.schoolYear,
      biography: values.description,
      position: values.position,
      position2: values.secondaryPosition,
      first_name: values.firstName,
      last_name: values.lastName,
      bats_hand: values.bats,
      throws_hand: values.throws,
      id,
      school: { id: values.school.id, name: values.school.name },
      teams: values.team.map((t) => ({ id: t.id, name: t.name })),
      facilities: values.facility.map((f) => ({ id: f.id, u_name: f.u_name })),
    };

    await updateProfile({
      variables: {
        form: prepare,
      },
    });
  };

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
        debug={(state) => console.log(JSON.stringify(state, null, '\t'))}
        validate={validateFormValues(EditProfileSchema)}
        mutators={{
          onChangePosition: ([value], state, tools) => {
            tools.changeValue(state, 'position', () => value as string);
          },
          onChangeAvatar: ([value], state, tools) => {
            tools.changeValue(state, 'avatar', () => value as string);
          },
        }}
        initialValue={{
          position: '',
        }}
        render={({
          handleSubmit,
          form: {
            mutators: { onChangeAvatar },
            reset,
          },
          values: { avatar },
          submitting,
          pristine,
        }) => (
          <form onSubmit={handleSubmit}>
            <ChoosePhoto onChange={onChangeAvatar} />
            <Floating justifyContent="space-between">
              <FirstName />
              <LastName />
            </Floating>
            <SelectPosition />
            <SelectSecondaryPosition />
            <FormSectionHeader>Personal Info</FormSectionHeader>
            <Age />
            <Floating justifyContent="space-between">
              <Feet />
              <Inches />
            </Floating>
            <Weight />
            <Floating justifyContent="space-between">
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
              <CancelButton
                onClick={() => {
                  reset();
                  onCancel();
                }}
                type="reset"
                disabled={submitting || pristine}
              >
                Cancel
              </CancelButton>
              <SaveButton
                type="submit"
                onSubmit={handleSubmit}
                disabled={submitting || pristine}
              >
                Save
              </SaveButton>
            </ButtonContainer>
          </form>
        )}
      />
    </EditProfileContainer>
  );
};

export default EditProfile;
