import React from 'react';
import { Flex, Box, Text } from 'shared';
import styled from 'styled-components';
import { avatarBackgroundImage } from 'assets/images';

const EditProfileContainer = styled(Flex)`
  grid-area: sidebar;
  grid-column: 1;
`;

const ChoosePhotoForm = styled(Flex)``;

const Avatar = styled(Box)``;

const EditProfile = () => (
  <EditProfileContainer
    as="aside"
    bg="white"
    width={['100vw', '200px']}
    p="16px"
    borderLeft="1px solid rgba(0, 0, 0, 0.1)"
    borderRight="1px solid rgba(0, 0, 0, 0.1)"
    overflow="auto"
    boxShadow="0 2px 15px 0 rgb(0 0 0 / 10%)"
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
  </EditProfileContainer>
);

export default EditProfile;
