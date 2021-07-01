/* eslint-disable */
import { useBattingLogQuery } from 'graph';
import useDebounce from 'hooks/useDebounce';
import React, { useState, VFC } from 'react';
import { Flex, Search, Select, Text } from 'shared';
import { PitchType } from 'types/PitchType';
import { pitchTypes } from 'values';

const Log: VFC<{ id: string }> = ({ id }) => {
  const [pitchType, setPitchType] = useState<PitchType>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { data } = useBattingLogQuery({
    variables: {
      input: {
        count: 10,
        offset: 0,
        profile_id: id,
        pitch_type: pitchType,
        pitcher_name: debouncedSearchTerm,
      },
    },
    skip: !id,
  });

  return (
    <>
      <Flex width="100%" justifyContent="space-between" mb="23px">
        <Search
          value={searchTerm ?? ''}
          onChange={(value: string) => setSearchTerm(value)}
        />
        <Select
          items={(pitchTypes as unknown) as string[]}
          value={pitchType as string}
          onChange={(value) => {
            setPitchType(value as PitchType & undefined);
          }}
          placeholder="Pitch Type"
        />
      </Flex>
      <Flex width="100%" justifyContent="flex-start" mb="16px">
        <Text fontSize="18px" color="#414f5a" fontWeight="400">
          Batting Log
        </Text>
      </Flex>
      <Flex width="100%" justifyContent="space-between">
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Date
        </Text>
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Pitcher Name
        </Text>
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Pitcher Handedness
        </Text>
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Pitch Type
        </Text>
        <Text fontSize="14px" color="#667784" fontWeight="300">
          Pitch Call
        </Text>
      </Flex>
      {data?.batting_log?.batting_log?.length ? (
        data.batting_log.batting_log.map((r) => (
          <Text color="#667784" font-size="16px">
            r
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

export default Log;
