import EditProfile from 'components/profile/EditProfile';
import ProfileInfo from 'components/profile/ProfileInfo';
import Stats from 'components/profile/Stats';
import SummaryEvents from 'components/profile/SummaryEvents';
import { useCurrentProfileQuery } from 'graph';
import withAuth from 'hocs/withAuth';
import React, { useState, VFC } from 'react';
import { ContentContainer, Spinner } from 'shared';
import styled from 'styled-components';

const Main = styled.main`
  background: #788b99;
  flex: 2;
  overflow: auto;
  width: calc(100vw - 220px);
`;

const Profile: VFC = () => {
  /* eslint-disable */
  const { loading, data, error } = useCurrentProfileQuery();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  if (loading)
    return (
      <ContentContainer
        background="white"
        justifyContent="center"
        overflow={['visible', 'hidden']}
        alignItems="center"
      >
        <Spinner loading={loading} />
      </ContentContainer>
    );
  if (error)
    return (
      <ContentContainer
        background="white"
        justifyContent="space-between"
        overflow={['visible', 'hidden']}
      >
        <p>...error</p>
      </ContentContainer>
    );
  if (data && data.current_profile) {
    return (
      <ContentContainer
        background="white"
        justifyContent="space-between"
        overflow={['visible', 'hidden']}
      >
        {isEditingProfile && (
          <EditProfile
            id={data.current_profile.id}
            onCancel={() => {
              setIsEditingProfile(false);
            }}
          />
        )}
        {!isEditingProfile && (
          <ProfileInfo
            profile={data.current_profile}
            onEditProfile={() => {
              setIsEditingProfile(true);
            }}
          />
        )}
        <Main>
          <SummaryEvents />
          <Stats id={data.current_profile.id} profile={data.current_profile} />
        </Main>
      </ContentContainer>
    );
  }
  return <></>;
};

export default withAuth(Profile);
