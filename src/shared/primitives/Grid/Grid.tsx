import styled from 'styled-components';
import {
  grid,
  background,
  border,
  space,
  layout,
  compose,
  GridProps as StyledSystemGridProps,
  BackgroundProps,
  BorderProps,
  SpaceProps,
  LayoutProps,
} from 'styled-system';

interface GridProps
  extends StyledSystemGridProps,
    BackgroundProps,
    BorderProps,
    SpaceProps,
    LayoutProps {}

const Grid = styled.div<GridProps>(
  compose(grid, background, border, space, layout)
);

Grid.defaultProps = {
  display: 'grid',
};

export default Grid;
