import EditProfile from 'components/EditProfile';
import { useCurrentProfileQuery } from 'generated';
import withAuth from 'hocs/withAuth';
import React, { VFC } from 'react';
import { ContentContainer } from 'shared';

const Profile: VFC = () => {
  const { loading, data, error } = useCurrentProfileQuery();

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
