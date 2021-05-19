import { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';

const encodeSvg = (reactElement: ReactElement): string =>
  `data:image/svg+xml,${escape(
    ReactDOMServer.renderToStaticMarkup(reactElement)
  )}`;

export default encodeSvg;
