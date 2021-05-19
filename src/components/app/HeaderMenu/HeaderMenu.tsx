/* eslint-disable */

import React, { useState, VFC } from 'react';
import { useHistory } from 'react-router-dom';
import routes from 'Routes/constants';
import Auth from 'services/api';
import storage from 'services/storage';

import styled from 'styled-components';
import { Profile } from 'types/Profile';
import Avatar from '../../profile/Avatar';

const HeaderMenu: VFC<{ profile: Profile }> = ({ profile }) => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();
  return (
    <Container>
      <Avatar
        width="32px"
        height="32px"
        pictureUrl={profile?.team_avatar?.size_32_32?.url}
      />
      <MenuButton onClick={() => setIsActive(true)}>
        {profile?.uid ?? ''}&nbsp;
        <span>
          <svg width="8" height="5" viewBox="0 0 8 5">
            <path
              fill="#788B99"
              fillRule="evenodd"
              d="M8 .5c0-.273-.227-.5-.5-.5h-7C.227 0 0 .227 0 .5c0 .133.055.258.148.352l3.5 3.5A.497.497 0 0 0 4 4.5a.497.497 0 0 0 .352-.148l3.5-3.5A.497.497 0 0 0 8 .5z"
            />
          </svg>
        </span>
      </MenuButton>
      {isActive && (
        <DropDownMenu
          onMouseLeave={() => {
            setIsActive(false);
          }}
        >
          <Option as="a" href="/profile">
            My Profile
          </Option>
          <Option
            as="a"
            onClick={async () => {
              const isSignedOut = await Auth.signOut();
              if (isSignedOut) {
                history.push(routes.signIn);
                storage.removeCredentials();
                storage.removeProfile();
              }
            }}
          >
            Logout
          </Option>
        </DropDownMenu>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 16px;
  position: relative;
  display: flex;
  margin-left: 15px;
`;

const MenuButton = styled.button`
  list-style: none;
  background-color: transparent;
  border-style: none;
  margin: 0;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;

const Option = styled.div`
  padding: 8px 10px;
  margin-top: 8px;
  margin-bottom: 6px;
  text-decoration: none;

  color: #788b99;
  :focus {
    background-color: dodgerBlue;
    opacity: 0.1;
  }
`;

const DropDownMenu = styled.div`
  width: 178px;
  position: absolute;
  top: 100%;
  right: 0;
  box-sizing: border-box;
  z-index: 10;
  margin-top: 6px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #eff1f3;
  border-radius: 4px;
  overflow-y: auto;
  background: white;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: #788b99;
`;

export default HeaderMenu;
