import React from 'react';
import Table from 'components/app/Table';
import { ContentContainer } from 'shared';
import withAuth from 'hocs/withAuth';

const Network = () => (
  <ContentContainer
    background="white"
    justifyContent="space-between"
    height="100%"
  >
    <Table />
  </ContentContainer>
);

export default withAuth(Network);
