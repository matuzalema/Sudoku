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

  // disabled(number, index) {
  //   return (
  //     <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number} disabled/>
  //   );
  // }
  //
  // ordinary(number, index) {
  //   return (
  //     <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number}/>
  //   );
  // }

  // const listItems = numbers.map((number, index) => (
  //     <li className='sudoku-tile' key={index}>
  //       { initialNumbers[index]
  //         ? <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number} disabled/>
  //         : <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number}/>
  //       }
  //     </li>
  // ));

  //==========
  // <li className={'sudoku-tile tile' + index} key={index}>
  //   { initialNumbers[index]
  //     ? <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number} disabled/>
  //     : <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number}/>
  //   }
  // </li>
  //=========
  handleMouseOver(index, e) {
    const arrayXY = [];
    const boardArray = [...this.state.board];

    for (let i=0; i<9; i++){
      arrayXY[i] = [];
    }
    
    let j = 0;

    for (let x=0; x<9; x++){
      for (let y=0; y<9; y++){
        arrayXY[x][y] = boardArray[j++];
      }
    }
    

    // function getFirstElementInARow(index) {
    //   const firstRowElement = index - index%9;
    //   const columnNumber = index - firstRowElement;

    //   for(let i = 0; i < 9; i++) {
    //     items[firstRowElement+i].classList.add('selected-row');
    //   }

    //   let currentColumnElement = columnNumber;

    //   for(let i = 0; i < 9; i++) {
    //     items[currentColumnElement].classList.add('selected-column');
    //     currentColumnElement += 9;
    //   }

     



    //   const value = index;

      
    //   console.log(index);

    // }
    // getFirstElementInARow(index);
  }

  handleMouseLeave(index, e) {
    const element = e.target;
    const parent = element.parentElement.parentElement;
    const items = Array.from(parent.children);
    items.forEach(function(item) {
      item.classList.remove('selected-row', 'selected-column');
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
