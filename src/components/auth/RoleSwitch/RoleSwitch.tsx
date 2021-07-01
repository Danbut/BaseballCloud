import React, { VFC } from 'react';
import { Text, CheckboxIcon, Flex } from 'shared';

import styled from 'styled-components';
import { variant } from 'styled-system';
import getTheme from 'helpers/getTheme';
import { Role } from 'types/Role';

const RoleSwitchContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

interface SwitchRoleButtonProps {
  variant: string;
}

const SwitchRoleButton = styled.button<SwitchRoleButtonProps>`
  margin: 0;
  padding: 15px 5px 17px;
  justify-content: center;
  color: ${getTheme('colors.forestGreen') as string};
  border-radius: 0;
  border: 1px solid ${getTheme('colors.forestGreen') as string};

  background-color: ${getTheme('colors.white') as string};

  white-space: nowrap;
  display: flex;
  align-items: flex-start;
  flex: 1 1 auto;

  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  &:hover {
    color: ${getTheme('colors.white') as string};
    border: 1px solid ${getTheme('colors.forestGreen') as string};
    background-color: ${getTheme('colors.forestGreen') as string};
  }
  &:focus {
    color: ${getTheme('colors.white') as string};
    border: 1px solid ${getTheme('colors.forestGreen') as string};
    background-color: ${getTheme('colors.forestGreen') as string};
  }
  ${variant({
    variants: {
      primary: {
        bg: 'forestGreen',
        color: 'white',
      },
      secondary: {
        bg: 'white',
        color: 'forestGreen',
      },
    },
  })}
`;

const IconContainer = styled.span`
  margin-right: 6px;
`;

const Title = styled(Text)`
  text-transform: capitalize;
`;

const descriptions = {
  player:
    'Players have their own profile within the system and plan on having data collected.',
  scoute:
    'Coaches and scouts can view players in the system but do not have their own profile.',
} as const;

interface RoleDescriptionProps {
  role: Role;
}

const RoleDescription: VFC<RoleDescriptionProps> = ({ role }) => (
  <Flex
    background="#48bbff"
    borderRadius="8px"
    p="16px"
    mb="16px"
    flexDirection="column"
    justifyContent="center"
  >
    <Title
      mb="21px"
      fontWeight="700"
      fontSize="36px"
      textAlign="center"
      color="white"
    >
      {role}
    </Title>
    <Text as="p" color="white" textAlign="center">
      {descriptions[role]}
    </Text>
  </Flex>
);

interface RoleSwitch {
  onChange(value: Role): void;
  value: Role;
}

const RoleSwitch: VFC<RoleSwitch> = ({ onChange, value }) => {
  const onPlayerRoleChoose = () => onChange('player');

  const onScouteRoleChoose = () => onChange('scoute');

  return (
    <>
      <RoleSwitchContainer>
        <SwitchRoleButton
          onClick={onPlayerRoleChoose}
          variant={value === 'player' ? 'primary' : 'secondary'}
        >
          <IconContainer>
            <CheckboxIcon />
          </IconContainer>
          <Text fontSize={['13px', '16px']} fontWeight="700">
            Sign up as Player
          </Text>
        </SwitchRoleButton>
        <SwitchRoleButton
          onClick={onScouteRoleChoose}
          variant={value === 'scoute' ? 'primary' : 'secondary'}
        >
          <IconContainer>
            <CheckboxIcon />
          </IconContainer>
          <Text fontSize={['13px', '16px']} fontWeight="700">
            Sign up as Scout
          </Text>
        </SwitchRoleButton>
      </RoleSwitchContainer>
      <RoleDescription role={value} />
    </>
  );
};

export default RoleSwitch;
