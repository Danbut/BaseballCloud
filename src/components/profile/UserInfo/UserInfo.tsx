import React, { VFC } from 'react';
import { Box, Flex, Text } from 'shared';
import styled from 'styled-components';
import { editProfileButtonIcon } from 'assets/icons';
import { Profile } from 'graph';
import { positions } from 'values';
import Avatar from '../Avatar';

interface UserInfoProps {
  profile: Pick<Profile, 'position'> & {
    firstName: Profile['first_name'];
    lastName: Profile['last_name'];
    secondaryPosition: Profile['position2'];
  };
  onEditProfile(): void;
}

const UserInfo: VFC<UserInfoProps> = ({
  profile: { firstName, lastName, position, secondaryPosition },
  onEditProfile,
}) => (
  <Box position="relative">
    <EditProfileButton onClick={onEditProfile}>
      <img src={editProfileButtonIcon} alt="user" />
    </EditProfileButton>
    <Flex justifyContent="center" mb="6px">
      <Avatar />
    </Flex>
    <Flex flexDirection="column" alignItems="center">
      {firstName && (
        <Text
          fontSize="20px"
          color="#414f5a"
          width="fit-content"
        >{`${firstName} ${lastName ?? ''}`}</Text>
      )}
      <Text fontSize="16px" color="#788b99" width="fit-content">
        {positions.find((p) => position === p.slug)?.name ?? ''}
      </Text>
      <Text
        fontSize="16px"
        color="#788b99"
        borderTop="1px solid #cbcccd"
        width="fit-content"
      >
        {positions.find((p) => secondaryPosition === p.slug)?.name ?? ''}
      </Text>
    </Flex>
  </Box>
);

const EditProfileButton = styled.button`
  background-color: transparent;
  border-style: none;
  margin: 0;
  overflow: visible;
  text-transform: none;
  display: block;
  box-shadow: none;
  position: absolute;
  top: 12px;
  right: 13px;
  padding: 0;
`;

export default UserInfo;
