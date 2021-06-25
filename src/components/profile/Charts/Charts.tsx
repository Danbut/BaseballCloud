import React from 'react';
import { Flex, Select } from 'shared';

const Charts = () => (
  <Flex
    flexDirection="column"
    width="100%"
    height="100%"
    justifyContent="flex-start"
  >
    <Select
      items={['1', '2', '3']}
      value="1"
      onChange={() => {
        console.log('sads');
      }}
    />
  </Flex>
);

export default Charts;
