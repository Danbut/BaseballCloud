import { useBattingLogQuery } from 'graph';

import React, { useState, VFC } from 'react';
import { DatePicker, Flex, Select, Text } from 'shared';
import styled from 'styled-components';
import { EventType } from 'types/EventType';
import { eventTypes } from 'values';

const SessionReports: VFC<{ id: string }> = ({ id }) => {
  const [eventType, setEventType] = useState<EventType>();
  const [date, setDate] = useState<Date>(new Date());
  const { data: battingLog, refetch } = useBattingLogQuery({
    variables: {
      input: {
        count: 10,
        offset: 0,
        profile_id: id,
      },
    },
  });

  // const { data } = useProfileEventsQuery({
  //   variables: {
  //     input: {
  //       count: 10,
  //       offset: 0,
  //       profile_id: id,
  //       date: moment(date).format('DD-MM-YYYY'),
  //       event_type: eventType,
  //     },
  //   },
  // });

  return (
    <>
      <Flex width="100%" justifyContent="space-between" mb="16px">
        <Text fontSize="18px" color="#414f5a" fontWeight="400">
          Batting Log
        </Text>
        <ClearFiltersButton
          onClick={async () => {
            setEventType(undefined);
            setDate(new Date());
            await refetch();
          }}
        >
          Clear Filters
        </ClearFiltersButton>
        <DatePicker value={date} onChange={(v) => setDate(v)} />
        <Select
          items={(eventTypes as unknown) as string[]}
          placeholder="Type"
          value={eventType}
          onChange={(v) => setEventType(v as EventType & undefined)}
        />
      </Flex>
      <Flex width="100%" justifyContent="space-between">
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Date
        </Text>
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Type
        </Text>
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Name
        </Text>
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Purchased
        </Text>
      </Flex>
      {battingLog?.batting_log?.batting_log?.length ? (
        battingLog.batting_log.batting_log.map((r) => (
          <Text color="#667784" font-size="16px">
            {r}
          </Text>
        ))
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Text color="#667784" font-size="16px">
            There&apos;s not info yet!
          </Text>
        </Flex>
      )}
    </>
  );
};

const ClearFiltersButton = styled.button`
  background-color: transparent;
  border-style: none;
  margin: 0;
  overflow: visible;
  display: block;
  border-radius: 4px;
  box-shadow: none;
  font-weight: 400;
  padding: 0;
  font-size: 16px;
  color: #48bbff;
`;

export default SessionReports;
