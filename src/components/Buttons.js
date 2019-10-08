import React from 'react';

const Buttons = (props) => (
  <div className='sudoku-buttons-container'>
    <div className='sudoku-buttons'>
      <button className='sudoku-button' onClick={props.check}>Check</button>
      <button className='sudoku-button' onClick={props.newGame}>New Game</button>
      <button className='sudoku-button' onClick={props.solve}>Solve</button>
      <button className='sudoku-button' onClick={props.restart}>Restart</button>
    </div>
  </div>
);

export default Buttons;
