import React, { VFC } from 'react';
import styled from 'styled-components';
import { LogoIcon } from 'shared/icons';
import Anchor from 'shared/primitives/Anchor';
import Flex from 'shared/primitives/Flex';

const HeaderContainer = styled(Flex)`
  grid-area: hd;
  grid-column-end: span 2;
`;

const Header: VFC = () => (
  <HeaderContainer
    bg="white"
    justifyContent="space-between"
    flexWrap="wrap"
    borderBottom="1px solid rgba(0, 0, 0, 0.1)"
    p="8px"
    alignItems="center"
  >
    <Anchor href="\">
      <LogoIcon />
    </Anchor>
  </HeaderContainer>
);

export default Header;
