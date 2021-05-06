import styled from 'styled-components';
import {
  compose,
  typography,
  background,
  layout,
  border,
  shadow,
  color,
  space,
  TypographyProps,
  BackgroundProps,
  LayoutProps,
  BorderProps,
  ShadowProps,
  ColorProps,
  SpaceProps,
} from 'styled-system';

interface ButtonProps
  extends TypographyProps,
    BackgroundProps,
    LayoutProps,
    BorderProps,
    ShadowProps,
    ColorProps,
    SpaceProps {}

const Button = styled.button<ButtonProps>(
  compose(typography, background, layout, border, shadow, color, space)
);

export default Button;
