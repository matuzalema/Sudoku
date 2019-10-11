import React from 'react';

const DifficultyButtons = (props) => (
  <div className='sudoku-buttons-container'>
    <div className='sudoku-buttons'>
      <button className='sudoku-button' onClick={props.easy}>Easy</button>
      <button className='sudoku-button' onClick={props.normal}>Normal</button>
      <button className='sudoku-button' onClick={props.hard}>Hard</button>
      <button className='sudoku-button' onClick={props.insane}>Insane</button>
    </div>
  </div>
);

export default DifficultyButtons;
