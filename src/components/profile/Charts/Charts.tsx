/* eslint-disable */
import { useBattingGraphQuery } from 'graph';
import React, { useState, VFC } from 'react';
import { Flex, Select, Text } from 'shared';
import { PitchType } from 'types/PitchType';
import { pitchTypes } from 'values';

const Charts: VFC<{ id: string }> = ({ id }) => {
  const [pitchType, setPitchType] = useState<PitchType>();
  const { data } = useBattingGraphQuery({
    variables: {
      input: {
        profile_id: id,
        pitch_type: pitchType,
      },
    },
    skip: !id,
  });

  return (
    <>
      <Flex width="100%" justifyContent="flex-end">
        <Select
          items={(pitchTypes as unknown) as string[]}
          value={pitchType as string}
          onChange={(value) => {
            setPitchType(value as PitchType & undefined);
          }}
          placeholder="Pitch Type"
        />
      </Flex>
      {data?.batting_graph?.graph_rows?.length ? (
        data.batting_graph.graph_rows.map((r) => (
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

export default Charts;
