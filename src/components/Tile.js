import React from 'react';

const Tile = (props) => (
  <input
    className='sudoku-input'
    type='number'
    min='1'
    max='9'
    onMouseOver={(e)=> (props.handleMouseOver(e))}
    onMouseLeave={(e)=> (props.handleMouseLeave(e))}
    onChange={(e) => (props.handleChange(e))}
    value={props.tileValue}
    disabled={props.disabled}
  />
);

export default Tile;
