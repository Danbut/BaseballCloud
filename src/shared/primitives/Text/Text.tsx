import styled from 'styled-components';
import {
  typography,
  color,
  space,
  layout,
  background,
  border,
  compose,
  TypographyProps,
  ColorProps,
  SpaceProps,
  LayoutProps,
  BorderProps,
  BackgroundProps,
} from 'styled-system';

interface TextProps
  extends TypographyProps,
    ColorProps,
    SpaceProps,
    LayoutProps,
    BackgroundProps,
    BorderProps {}

const Text = styled.div<TextProps>(
  compose(space, typography, color, layout, background, border)
);

export default Text;
