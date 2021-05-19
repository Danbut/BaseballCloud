import React, { useState, VFC } from 'react';
import styled from 'styled-components';

import storage from 'services/storage';
import { Anchor, Flex, LogoIcon } from 'shared';

import HeaderMenu from '../HeaderMenu';

const HeaderContainer = styled(Flex)`
  grid-area: hd;
  grid-column-end: span 2;
`;

const Header: VFC = () => {
  const [profile, setProfile] = useState(storage.getProfile());
  React.useEffect(() => {
    const sorageListener = window.addEventListener('storage', () => {
      setProfile(storage.getProfile());
    });

    return sorageListener;
  }, []);

  return (
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
      {profile && <HeaderMenu profile={profile} />}
    </HeaderContainer>
  );
};
export default Header;
