import React from 'react';

import Resizer from '../Resizer/Resizer';
import css from './_App.scss';

export default function App () {
  const resizableProps = {
    handlers: ['e'],
    minSize: { minWidth: 200 },
    initialSize: { width: 300, height: '100%' },
    isVisible: true,
    className: css.menu,
    targetId: css.wrapper,
    debouncingFunction: function (width, height) {
      if (width !== undefined) {
        console.log(width, height);
      }
    }
  };

  const secondResizable = Object.assign({}, resizableProps, { handlers: ['w'], className: css.rightMenu });

  return (
    <React.Fragment>
      <h1>Resizer</h1>
      A react wrapper component that is able to resize
      <h2>Examples</h2>
      From left to right<br />
      <div id={css.wrapper}>
        <Resizer {...resizableProps}>
          Content
        </Resizer>
      </div>
      From right to left<br />
      <div id={css.wrapper}>
        <Resizer {...secondResizable}>
          Content
        </Resizer>
      </div>
    </React.Fragment>
  );
}
