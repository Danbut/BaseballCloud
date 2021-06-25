import styled from 'styled-components';
import {
  flexbox,
  background,
  border,
  space,
  color,
  layout,
  shadow,
  compose,
  FlexboxProps,
  BackgroundProps,
  BorderProps,
  SpaceProps,
  LayoutProps,
  ShadowProps,
  ColorProps,
} from 'styled-system';

interface FlexProps
  extends FlexboxProps,
    BackgroundProps,
    BorderProps,
    SpaceProps,
    LayoutProps,
    ShadowProps,
    ColorProps {}

const Flex = styled.div<FlexProps>(
  compose(flexbox, background, border, space, color, layout, shadow)
);

Flex.defaultProps = {
  display: 'flex',
};

export default Flex;
