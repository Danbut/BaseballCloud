import { useProfileQuery } from 'generated';
import React, { VFC } from 'react';

const Profile: VFC = () => {
  const { loading, data, error } = useProfileQuery();

  if (loading) return <p>...loading</p>;
  if (error) return <p>...error</p>;
  return <p>{JSON.stringify(data)}</p>;
};

export default Profile;
