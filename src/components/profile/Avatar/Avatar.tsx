import { avatarBackgroundImage } from 'assets/images';
import React, { VFC } from 'react';
import { Box } from 'shared';

interface AvatarProps {
  pictureUrl?: string;
}

const Avatar: VFC<AvatarProps> = ({ pictureUrl }) => (
  <Box
    mb="8px"
    overflow="hidden"
    borderRadius="50%"
    backgroundImage={
      pictureUrl ? `url(${pictureUrl})` : `url(${avatarBackgroundImage})`
    }
    width="100px"
    height="100px"
    backgroundSize="cover"
    backgroundPosition="50% 50%"
  />
);

export default Avatar;
