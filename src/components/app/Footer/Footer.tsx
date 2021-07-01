import React, { VFC } from 'react';
import styled from 'styled-components';
import { Flex } from 'shared';
import getTheme from 'helpers/getTheme';

const FooterContainer = styled(Flex)`
  grid-area: ft;
`;

const Copyright = styled.span`
  padding: 0 10px;
`;

const FooterLink = styled.a`
  color: ${getTheme('colors.astral') as string};
  text-decoration: none;
  background-color: transparent;
  touch-action: manipulation;
  padding-right: 8px;
`;

const Footer: VFC = () => (
  <FooterContainer
    flexDirection={['column-reverse', 'row']}
    bg="white"
    borderTop="1px solid rgba(0, 0, 0, 0.1)"
    justifyContent="space-between"
    alignItems="center"
    p={['16px', '16px']}
    height={['116px', '40px']}
  >
    <Copyright>© 2018 BaseballCloud</Copyright>
    <div>
      <FooterLink href="/legal/terms">Terms of Service</FooterLink>
      <FooterLink href="/legal/privacy">Privacy Policy</FooterLink>
    </div>
    <div>
      <FooterLink
        href="https://baseballcloud.blog"
        target="_blank"
        rel="noreferrer"
      >
        Blog
      </FooterLink>
      <FooterLink
        href="http://twitter.com/baseballcloudus"
        target="_blank"
        rel="noreferrer"
      >
        Twitter
      </FooterLink>
      <FooterLink
        href="http://www.instagram.com/baseballcloudus/"
        target="_blank"
        rel="noreferrer"
      >
        Instagram
      </FooterLink>
      <FooterLink
        href="http://www.facebook.com/BaseballCloudUS/"
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </FooterLink>
    </div>
  </FooterContainer>
);

export default Footer;
