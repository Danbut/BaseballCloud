import { Profile } from 'graph';
import React, { VFC } from 'react';
import { Flex } from 'shared';
import styled from 'styled-components';
import PersonalInfo from 'components/profile/PersonalInfo';
import UserInfo from 'components/profile/UserInfo';
import SchoolInfo from 'components/profile/SchoolInfo';

interface ProfileInfoProps {
  profile: Profile;
  onEditProfile(): void;
}

const ProfileInfo: VFC<ProfileInfoProps> = ({
  profile: {
    first_name: firstName,
    last_name: lastName,
    position,
    position2: secondaryPosition,
    age,
    feet,
    inches,
    weight,
    throws_hand: throws,
    bats_hand: bats,
    school,
    school_year: schoolYear,
    teams,
    facilities,
    biography,
  },
  onEditProfile,
}) => (
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
    <UserInfo
      {...{ profile: { firstName, lastName, position, secondaryPosition } }}
      onEditProfile={onEditProfile}
    />
    <PersonalInfo
      {...{ profile: { age, feet, inches, weight, throws, bats } }}
    />
    <SchoolInfo
      {...{ profile: { school, schoolYear, teams, facilities, biography } }}
    />
  </EditProfileContainer>
);

const EditProfileContainer = styled(Flex)`
  grid-area: sidebar;
  grid-column: 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default ProfileInfo;
