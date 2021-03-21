import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button 
        className="square" 
        onClick={props.onClick}
        >
        {props.value}
      </button>
    );
  }
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
            value={this.props.squares[i]}
            onClick={ () => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        locations: [],
        stepNumber: 0,
        jumped: 0,
        xIsNext: true,
      }
    }
    
    handleClick(i) { 
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice(); 

      const locs = this.state.locations.slice(0, this.state.stepNumber);
      locs[locs.length] = determineLocation(i);

      if(determineWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'; 
      this.setState({
        history: history.concat([{squares: squares,}]),
        stepNumber: history.length,
        locations: locs,
        xIsNext: !this.state.xIsNext,
      });
    }
    
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        jumped: step,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = determineWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = move ? `Go to move #${move} (${this.state.locations[move - 1]})` : `Go to game start`;
        return (
          <li key={move}>
            <button onClick={() => {
              this.jumpTo(move);
              //this.state.jumped = move;
              }}>
            {this.state.jumped ? 'jumped to ' + this.state.jumped + " ": 'did not jump '}{desc}
            </button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = `Next player: `+ (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
function determineWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6,],
    [1,4,7,],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for( var i = 0; i < lines.length; ++i ) {
    const [a,b,c] = lines[i];
    if( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
      return squares[a];
    }
  }
  return null;
}

function determineLocation(i) {
  const locations = [
    [1,1],
    [2,1],
    [3,1],
    [1,2],
    [2,2],
    [3,2],
    [1,3],
    [2,3],
    [3,3],
  ]
  return locations[i];
}