import { Profile, useProfileNamesQuery, useProfileQuery } from 'graph';
import getFullName from 'helpers/getFullName';
import React, { useState, VFC } from 'react';
import { Grid, Text } from 'shared';
import styled from 'styled-components';
import Avatar from '../Avatar';
import SearchProfile from '../SearchProfile';
import TopBattingValues from '../TopBattingValues';

const Comparison: VFC<{ profile: Profile }> = ({ profile }) => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [profileName, setProfileName] = useState<Profile>();
  const { data: names } = useProfileNamesQuery({
    variables: {
      input: {
        player_name: searchTerm,
        position: 'second_base',
      },
    },
    skip: !searchTerm,
  });

  const { data } = useProfileQuery({
    variables: {
      id: profileName?.id ?? '',
    },
    skip: !profileName,
  });

  const onChange = (result: Profile | string) => {
    if (typeof result === 'string') {
      setSearchTerm(result);
    } else {
      setProfileName(result);
    }
  };

  return (
    <ComparisonTable>
      <Header>
        <User>
          <Avatar width="40px" height="40px" />
          <Text>
            {getFullName(
              profile.first_name as string,
              profile.last_name as string
            )}
          </Text>
        </User>
        <User>
          <Avatar width="40px" height="40px" />
          <SearchProfile
            profileNames={
              names?.profile_names?.profile_names
                ? (names?.profile_names?.profile_names as Profile[])
                : []
            }
            onChange={onChange}
          />
        </User>
      </Header>
      <Table>
        <Row mt="15px">
          <Cell>Age: {profile.age}</Cell>
          <Cell>Age: {data?.profile?.age ?? ''}</Cell>
        </Row>
        <Row>
          <Cell>
            Height: {profile.feet} ft {profile.inches} in
          </Cell>
          <Cell>
            Height: {data?.profile?.feet ?? ''} ft {data?.profile?.inches ?? ''}{' '}
            in
          </Cell>
        </Row>
        <Row>
          <Cell>Weight: {profile.weight} lbs</Cell>
          <Cell>Weight: {data?.profile?.weight ?? ''} lbs</Cell>
        </Row>
        <TopBattingValues />
      </Table>
    </ComparisonTable>
  );
};

const ComparisonTable = styled.div``;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Table = styled.div``;

const User = styled.div`
  display: flex;
`;

const Row = styled(Grid)`
  min-height: 44px;
  margin-bottom: 6px;

  grid-template-columns: 1fr 1fr;
`;
const Cell = styled.div``;

export default Comparison;
