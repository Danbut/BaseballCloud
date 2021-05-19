import EditProfile from 'components/EditProfile';
import { useProfileQuery } from 'generated';
import withAuth from 'hocs/withAuth';
import React, { VFC } from 'react';
import { ContentContainer, Flex } from 'shared';
import styled from 'styled-components';

const Profile: VFC = () => {
  const { loading, data, error } = useProfileQuery();

  if (loading) return <p>...loading</p>;
  if (error) return <p>...error</p>;
  return (
    <ContentContainer
      background="white"
      justifyContent="space-between"
      overflow={['visible']}
    >
      <EditProfile />
    </ContentContainer>
  );
};

export default withAuth(Profile);
