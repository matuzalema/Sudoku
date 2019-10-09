import React, {Component} from 'react';
import Tile from './Tile';
import sudoku from 'sudoku-umd';
import Display from './Display';
import Buttons from './Buttons';

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialBoard: '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....',
      board: '',
      initialNumbers: [],
      display: ''
    }

    this.getNumbers = this.getNumbers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentDidMount() {
    if(this.state.board === '') {
      const initialNumbers = this.markBoardNumbers(this.state.initialBoard);

      this.setState({
        board: this.state.initialBoard,
        initialNumbers: initialNumbers
      })
    }
  }

  checkPuzzleCorrectness() {
    const board = this.state.board;
    const evaluatedBoard = sudoku.solve(board);
    (evaluatedBoard === board)
    ? this.setState({display: 'sudoku rozwiązane poprawnie'})
    : evaluatedBoard
    ? this.setState({display: 'jestes na dobrej drodze do rozwiazania sudoku'})
    : this.setState({display: 'gdzies spopelniles blad'});
  }

  startNewGame() {
    const newGame = sudoku.generate();
    const initialNumbers = this.markBoardNumbers(newGame);

    this.setState({
      initialBoard: newGame,
      board: newGame,
      initialNumbers: initialNumbers,
      display: ''
    });
  }

  solvePuzzle() {
    const board = this.state.board;
    const evaluatedBoard = sudoku.solve(board);

    evaluatedBoard
    ? this.setState({board: evaluatedBoard})
    : this.setState({display: 'gdzies spopelniles blad'});

  }

  restartGame() {
    this.setState({
      board: this.state.initialBoard,
      display: ''
    })
  }

  getNumbers() {
    const numbers = [...this.state.board];
    const newNumbers = numbers.map((number) => {
      if(number==='.') number = '';

      return number;
    });

    return newNumbers;
  }

  handleChange(index, e) {
    const board = [...this.state.board];
    board[index] = e.target.value;
    const stringifiedBoard = board.toString().replace(/,/g, '');

    this.setState({
      board: stringifiedBoard
    });
  }

  markBoardNumbers(board) {
    const initialNumbersIndex = [];
    const initialBoard = [...board];

    initialBoard.forEach((element) => {
      (element !== '.') ? initialNumbersIndex.push(true) : initialNumbersIndex.push(false);
    });

    return initialNumbersIndex;
  }

  handleMouseOver(index, e) {
    const items = e.target.parentElement.parentElement.children;

    function highlightSelected(index, state) {
      //highlight row
      const firstRowElement = index - index%9;

      for(let i = 0; i < 9; i++) {
        items[firstRowElement+i].classList.add('selected');
      }
      //highlight column
      const columnNumber = index - firstRowElement;

      let currentColumnElement = columnNumber;

      for(let i = 0; i < 9; i++) {
        items[currentColumnElement].classList.add('selected');
        currentColumnElement += 9;
      }
      //highlight block
      const board = [...state];
      const stringArray = [];

      for(let i = 0; i < 9; i++) {
        const slicedArray = board.slice(0, 9);
        stringArray.push(slicedArray);
        for(let j = 0; j < 9; j++) {
          board.shift();
        }
      }

      const blocksPattern = [
        [0,  1,  2,  9, 10, 11, 18, 19, 20],
        [3,  4,  5, 12, 13, 14, 21, 22, 23],
        [6,  7,  8, 15, 16, 17, 24, 25, 26],
        [27, 28, 29, 36, 37, 38, 45, 46, 47],
        [30, 31, 32, 39, 40, 41, 48, 49, 50],
        [33, 34, 35, 42, 43, 44, 51, 52, 53],
        [54, 55, 56, 63, 64, 65, 72, 73, 74],
        [57, 58, 59, 66, 67, 68, 75, 76, 77],
        [60, 61, 62, 69, 70, 71, 78, 79, 80]
      ];

      let currentBlocksPattern = [];

      for(let i = 0; i < blocksPattern.length; i++) {
        blocksPattern[i].find((element) => {
            if(element === index) {
               currentBlocksPattern = blocksPattern[i];
              return;
            }
        });
      }

      const tiles = Array.from(items);

      for(let i = 0; i < tiles.length; i++) {
        currentBlocksPattern.forEach(function(element) {
          if(element === parseInt([i])) {
          tiles[i].classList.add('selected');
          }
        });
      }
    }

    highlightSelected(index, this.state.board);
  }

  handleMouseLeave(index, e) {
    const element = e.target;
    const parent = element.parentElement.parentElement;
    const items = Array.from(parent.children);
    items.forEach(function(item) {
      item.classList.remove('selected');
    });
  }

  render() {
    const initialNumbers = this.state.initialNumbers;
    const numbers = this.getNumbers();

    const listItems = numbers.map((number, index) => (
      <li className='sudoku-tile' key={index}>
        { initialNumbers[index]
          ? <Tile
              handleMouseOver={this.handleMouseOver.bind(null, index)}
              handleMouseLeave={this.handleMouseLeave.bind(null, index)}
              handleChange={this.handleChange.bind(null, index)}
              tileValue={number}
              disabled
            />
          : <Tile
              handleMouseOver={this.handleMouseOver.bind(null, index)}
              handleMouseLeave={this.handleMouseLeave.bind(null, index)}
              handleChange={this.handleChange.bind(null, index)}
              tileValue={number}
            />
        }
      </li>
    ));

    return (
      <div className='sudoku-container'>
        <ul className='sudoku-board'>
          {listItems}
        </ul>
        <Display>
          {this.state.display}
        </Display>
        <Buttons
          check={() => this.checkPuzzleCorrectness()}
          newGame={() => this.startNewGame()}
          solve={() => this.solvePuzzle()}
          restart={() => this.restartGame()}
        />
      </div>
    );
  }
}

export default Board;
