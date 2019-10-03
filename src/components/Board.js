import React, {Component} from 'react';
import Tile from './Tile';

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialBoard: '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....',
      board: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.getNumber = this.getNumber.bind(this);
    this.compareBoards = this.compareBoards.bind(this);
  }

  componentDidMount() {
    if(this.state.board === '') {
      this.setState({
        board: this.state.initialBoard
      })
    }
  }

  handleChange(index, e) {
    let board = [...this.state.board];
    const updateBoard = (index, e) => {
      board[index] = e.target.value;

      return board;
    };

    const newBoard = updateBoard(index, e);

    this.setState({
      board: newBoard
    });
  }

  getNumber() {
    const numbers = [...this.state.board];
    const newNumbers = numbers.map((number) => {
      if(number==='.') number = undefined;
      return number;
    });
    return newNumbers;
  }

  compareBoards() {
    let indexArray = [];
    const initialBoard = [...this.state.initialBoard];
    const disabledNumbers = initialBoard.filter((element, index) => {
      if(element !== '.') {
        indexArray.push(index);
      }
    });

    return indexArray;
  }

  render() {
    const initialValues = this.compareBoards();

    const numbers = this.getNumber();
    const listItems = numbers.map((number, index) => (
      <li key={index}>
        <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number}/>
      </li>
    ));

    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}

export default Board;

// const listItems = numbers.map((number, index) => (
//   <li key={index}>
//     <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number}/>
//   </li>
// ));
