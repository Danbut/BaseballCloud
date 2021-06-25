import React, { FC, ReactNode } from 'react';
import { Box, Flex, Text } from 'shared';
import { FlexProps } from 'styled-system';
import { Line } from 'rc-progress';

const SummaryEvents = () => (
  <Flex flexWrap="wrap">
    <PitcherSummary>
      <Title>Top Batting Values</Title>
      <EventItemList>
        <EventItem title="Exit Velocity" />
        <EventItem title="Carry Distance" />
        <EventItem title="Launch Angle" />
      </EventItemList>
    </PitcherSummary>
    <RecentEvents>
      <Title>Recent Session Report</Title>
      <EmptyMessage>No data currently linked to this profile</EmptyMessage>
    </RecentEvents>
  </Flex>
);

const PitcherSummary: FC<{ children: ReactNode[] }> = ({ children }) => (
  <Flex
    width="100%"
    flexDirection="column"
    bg="white"
    m="16px"
    p="16px"
    borderRadius="8px"
    height="150px"
  >
    {children}
  </Flex>
);

const EventItemList: FC<{ children: ReactNode[] } & FlexProps> = ({
  children,
}) => (
  <Flex overflow="hidden" height="100%" justifyContent="space-between">
    {children}
  </Flex>
);

const Title: FC<{ children: string }> = ({ children }) => (
  <Flex>
    <Text
      as="h3"
      textAlign="center"
      fontSize="18px"
      fontWeight="900"
      color="#414f5a"
    >
      {children}
    </Text>
  </Flex>
);

const EventItem: FC<{ title: string; value?: string }> = ({ title, value }) => (
  <Flex flexDirection="column" p="16px 24px 0 0" width="100%">
    <Flex justifyContent="space-between" mb="8px" width="100%">
      <Text fontSize="16px" color="#667784">
        {title}
      </Text>
      <Text fontSize="16px" color="#667784" fontWeight="700">
        {value ?? 'N/A'}
      </Text>
    </Flex>
    <Box maxWidth="100%" height="4px">
      <Line percent={10} strokeWidth={4} strokeColor="#ffd01a" />
    </Box>
  </Flex>
);

const RecentEvents: FC<{ children: ReactNode[] }> = ({ children }) => (
  <Flex
    width="100%"
    flexDirection="column"
    bg="white"
    m="16px"
    p="16px"
    borderRadius="8px"
  >
    {children}
  </Flex>
);

const EmptyMessage: FC<{ children: string }> = ({ children }) => (
  <Text fontSize="16px" color="#667784">
    {children}
  </Text>
);

export default SummaryEvents;
