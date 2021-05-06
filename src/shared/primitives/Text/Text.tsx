import styled from 'styled-components';
import {
  typography,
  color,
  space,
  layout,
  background,
  compose,
  TypographyProps,
  ColorProps,
  SpaceProps,
  LayoutProps,
  BackgroundProps,
} from 'styled-system';

interface TextProps
  extends TypographyProps,
    ColorProps,
    SpaceProps,
    LayoutProps,
    BackgroundProps {}

const Text = styled.div<TextProps>(
  compose(space, typography, color, layout, background)
);

export default Text;
