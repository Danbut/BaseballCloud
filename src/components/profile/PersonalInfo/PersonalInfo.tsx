import {
  ageIcon,
  batsIcon,
  heightIcon,
  throwsIcon,
  weightIcon,
} from 'assets/icons';
import { Profile } from 'graph';
import React, { VFC } from 'react';
import { Flex, Text } from 'shared';
import styled from 'styled-components';
import { hands } from 'values';

interface PersonalInfoProps {
  profile: Pick<Profile, 'age' | 'feet' | 'inches' | 'weight'> & {
    throws: Profile['throws_hand'];
    bats: Profile['bats_hand'];
  };
}

const PersonalInfo: VFC<PersonalInfoProps> = ({
  profile: { age, feet, inches, weight, throws, bats },
}) => (
  <Flex flexDirection="column">
    <Item justifyContent="space-between" p="16px 0">
      <span>
        <img src={ageIcon} alt="age" />
      </span>
      <Text as="span">Age</Text>
      <Text as="span">{age}</Text>
    </Item>
    <Item justifyContent="space-between" p="16px 0">
      <span>
        <img src={heightIcon} alt="height" />
      </span>
      <Text as="span">Height</Text>
      <Text as="span">{`${feet as number} ft ${inches as number} in`}</Text>
    </Item>
    <Item justifyContent="space-between" p="16px 0">
      <span>
        <img src={weightIcon} alt="weight" />
      </span>
      <Text as="span">Weight</Text>
      <Text as="span">{`${weight as number} lbs`}</Text>
    </Item>
    <Item justifyContent="space-between" p="16px 0">
      <span>
        <img src={throwsIcon} alt="throws" />
      </span>
      <Text as="span">Throws</Text>
      <Text as="span">{hands.find((h) => h.slug === throws)?.name}</Text>
    </Item>
    <Item justifyContent="space-between" p="16px 0">
      <span>
        <img src={batsIcon} alt="bats" />
      </span>
      <Text as="span">Bats</Text>
      <Text as="span">{hands.find((h) => h.slug === bats)?.name}</Text>
    </Item>
  </Flex>
);

const Item = styled(Flex)`
  span:nth-child(1n) {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
  span:nth-child(2n) {
    width: auto;
    margin-right: auto;
  }
  span:nth-child(3n) {
    width: auto;
    margin: 0;
  }
`;

export default PersonalInfo;
