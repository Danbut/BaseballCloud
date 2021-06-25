import encodeSvg from 'helpers/encodeSvg';
import React, { VFC } from 'react';
import styled from 'styled-components';
import { BaseballIcon, Box, Flex, Text } from 'shared';

const ContentContainer = styled(Flex)`
  grid-area: content;
`;

const NotFound: VFC = () => (
  <ContentContainer
    width="100%"
    height="100%"
    bg="white"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    overflow="hidden"
  >
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Text as="div" marginBottom="15px" fontSize="100px">
        4
        <Box
          display="inline-block"
          verticalAlign="center"
          backgroundImage={`url(${encodeSvg(BaseballIcon)})`}
          backgroundSize="cover"
          width="76px"
          height="76px"
        />
        4
      </Text>
      <Text as="div" margin="0px" fontSize="30px">
        Page Not Found!
      </Text>
    </Flex>
  </ContentContainer>
);

export default NotFound;
