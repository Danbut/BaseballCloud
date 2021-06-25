import styled from 'styled-components';
import {
  typography,
  color,
  space,
  system,
  compose,
  TypographyProps,
  ColorProps,
  SpaceProps,
} from 'styled-system';

const textDecoration = system({
  textDecoration: true,
});

interface AnchorProps extends TypographyProps, ColorProps, SpaceProps {
  textDecoration?: string;
}

const Anchor = styled.a<AnchorProps>(
  compose(space, typography, color, textDecoration)
);

export default Anchor;
