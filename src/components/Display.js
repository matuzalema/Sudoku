import React from 'react';

const Display = (props) => (
  <div className='sudoku-display'><p>{props.children}</p></div>
);

export default Display;
