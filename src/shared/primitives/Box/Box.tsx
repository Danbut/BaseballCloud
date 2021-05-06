import styled from 'styled-components';
import {
  background,
  border,
  space,
  layout,
  position,
  color,
  compose,
  BackgroundProps,
  BorderProps,
  SpaceProps,
  LayoutProps,
  PositionProps,
  ColorProps,
} from 'styled-system';

interface BoxProps
  extends BackgroundProps,
    BorderProps,
    SpaceProps,
    LayoutProps,
    PositionProps,
    ColorProps {}

const Box = styled.div<BoxProps>(
  compose(background, border, space, layout, position, color)
);

export default Box;
