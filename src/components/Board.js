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
      initialNumbers: initialNumbers
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
    this.setState({board: this.state.initialBoard})
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

  render() {
    const initialNumbers = this.state.initialNumbers;
    const numbers = this.getNumbers();

    const listItems = numbers.map((number, index) => (
        <li key={index}>
          { initialNumbers[index]
            ? <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number} disabled/>
            : <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number}/>
          }
        </li>
    ));

    return (
      <div>
        <ul>
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
