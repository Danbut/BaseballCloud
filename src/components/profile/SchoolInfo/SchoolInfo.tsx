import { Profile } from 'generated';
import React, { FC, VFC } from 'react';
import { Flex } from 'shared';
import styled from 'styled-components';

interface SchoolInfoProps {
  profile: Pick<Profile, 'school' | 'biography' | 'teams' | 'facilities'> & {
    schoolYear: Profile['school_year'];
  };
}

const SchoolInfo: VFC<SchoolInfoProps> = ({
  profile: { school, schoolYear, teams, facilities, biography },
}) => (
  <Flex flexDirection="column">
    <Flex flexDirection="column">
      <SchoolInfoTitle>School</SchoolInfoTitle>
      <SchoolInfoValue>{school?.name}</SchoolInfoValue>
    </Flex>
    <Flex flexDirection="column">
      <SchoolInfoTitle>School Year</SchoolInfoTitle>
      <SchoolInfoValue>{schoolYear}</SchoolInfoValue>
    </Flex>
    <Flex flexDirection="column">
      <SchoolInfoTitle>Team</SchoolInfoTitle>
      <SchoolInfoValue>{teams?.map((t) => t?.name).join(',')}</SchoolInfoValue>
    </Flex>
    <Flex flexDirection="column">
      <SchoolInfoTitle>Facility</SchoolInfoTitle>
      <SchoolInfoValue>
        {facilities?.map((f) => f?.u_name).join(',')}
      </SchoolInfoValue>
    </Flex>
    <SectionHeader>About</SectionHeader>
    <SchoolInfoValue>{biography}</SchoolInfoValue>
  </Flex>
);

const SectionDivider = styled.div`
  position: relative;
  :before {
    content: '';
    position: absolute;
    top: 36px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e7ebef;
    z-index: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  text-align: left;
  display: inline-block;
  position: relative;
  z-index: 1;
  padding-right: 12px;
  background-color: #ffffff;
`;

const SectionHeader: FC<{ children: string }> = ({ children }) => (
  <SectionDivider>
    <SectionTitle>{children}</SectionTitle>
  </SectionDivider>
);

const SchoolInfoTitle = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #667784;
  margin-bottom: 3px;
  text-align: left;
`;

const SchoolInfoValue = styled.div`
  font-size: 16px;
  color: #667784;
  word-wrap: break-word;
  margin-bottom: 11px;
`;

export default SchoolInfo;
