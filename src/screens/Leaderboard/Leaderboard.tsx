import React from 'react';
import Table from 'components/leaderboard/LeaderboardTable';
import { ContentContainer } from 'shared';
import withAuth from 'hocs/withAuth';

const Leaderboard = () => (
  <ContentContainer
    background="white"
    justifyContent="space-between"
    height="100%"
  >
    <Table />
  </ContentContainer>
);

export default withAuth(Leaderboard);
