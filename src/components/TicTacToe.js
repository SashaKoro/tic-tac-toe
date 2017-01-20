import React, {Component} from 'react';
import IntroScreen from './IntroScreen';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import toastr from 'toastr';
import styled from 'styled-components';

const P = styled.p`
  margin-top: 75px;
  text-align: center;
  font-family: Futura, Arial;
  font-size: 25px;
`;

class TicTacToe extends Component {
  constructor(props){
    super(props);

    this.state = {
      showIntroScreen: true,
      playerScore: 0,
      compScore: 0,
      gameBoard: [ '', '', '', '', '', '', '', '', ''],
      playerChose: '',
      computerChose: '',
      playersTurn: true,
      playerStarts: true,
      boxColors: [
        { backgroundColor: '#D2D2D2' },
        { backgroundColor: '#D2D2D2' },
        { backgroundColor: '#D2D2D2' },
        { backgroundColor: '#D2D2D2' },
        { backgroundColor: '#D2D2D2' },
        { backgroundColor: '#D2D2D2' },
        { backgroundColor: '#D2D2D2' },
        { backgroundColor: '#D2D2D2' },
        { backgroundColor: '#D2D2D2' }
      ]
    };

    this.PlayerHasChosen = this.PlayerHasChosen.bind(this);
    this.NewPlayerMove = this.NewPlayerMove.bind(this);
    this.crownWinner = this.crownWinner.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.ComputerMove = this.ComputerMove.bind(this);
    this.whosMove = this.whosMove.bind(this);
    this.whoStarts = this.whoStarts.bind(this);
  }

  PlayerHasChosen(choice, computerToken) {
    this.setState({ showIntroScreen: false});
    this.setState({ playerChose: choice });
    this.setState({ computerChose: computerToken });
  }

  NewPlayerMove(position){
    let placeToken = this.state.playerChose;
    let currentBoard = this.state.gameBoard;
    currentBoard[position] = placeToken;
    this.setState({gameBoard: currentBoard});
    this.CheckIfWinner(currentBoard);
  }

  CheckIfWinner(Board) {
    let winner = false;
    const winningLines = [
      [0,1,2],
      [0,3,6],
      [0,4,8],
      [1,4,7],
      [2,4,6],
      [2,5,8],
      [3,4,5],
      [6,7,8]
    ];
    winningLines.forEach(winLine  => {
      let [winIdxOne, winIdxTwo, winIdxThree] = winLine;
      if (Board[winIdxOne] + Board[winIdxTwo] + Board[winIdxThree] === 'XXX') {
        winner = true;
        this.crownWinner('X', winIdxOne, winIdxTwo, winIdxThree);

      } else if (Board[winIdxOne] + Board[winIdxTwo] + Board[winIdxThree] === 'OOO') {
        winner = true;
        this.crownWinner('O', winIdxOne, winIdxTwo, winIdxThree);
      }
    });
    if (!winner) this.whosMove();
  }

  whosMove(){
    console.log(this.state.playersTurn);
    if (this.state.playersTurn) {
      this.setState({ playersTurn: false });
      setTimeout( this.ComputerMove, 1000);

    } else this.setState({ playersTurn: true });
  }

  whoStarts(){
    if (this.state.playerStarts) {
      this.setState({ playerStarts: false });
      this.setState({ playersTurn: false });
      setTimeout( this.ComputerMove, 1000);
    } else {
      this.setState({ playerStarts: true });
      this.setState({ playersTurn: true });
    }
  }

  crownWinner(winningToken, winIdxOne, winIdxTwo, winIdxThree) {
    let winningColor = '#EFD469';
    let Colors = this.state.boxColors;
    Colors[winIdxOne].backgroundColor = winningColor;
    Colors[winIdxTwo].backgroundColor = winningColor;
    Colors[winIdxThree].backgroundColor = winningColor;
    this.setState({ boxColors: Colors });
    if (winningToken === this.state.playerChose) {
      toastr.success("You're the Winner!");
      this.setState({ playerScore: this.state.playerScore + 1});
    } else {
      toastr.error('Defeated by the Computer!');
      this.setState({ compScore: this.state.compScore + 1});
    }

    setTimeout(this.restartGame, 5000);
  }

  restartGame() {
    let freshBoard = this.state.boxColors.map(eachColor => {
      eachColor.backgroundColor = '#D2D2D2';
      return eachColor;
    });
    this.setState({ boxColors: freshBoard });
    this.setState({ gameBoard: [ '', '', '', '', '', '', '', '', ''] });
    this.whoStarts();
  }

  ComputerMove() {
    let gameBoard = this.state.gameBoard;
    let i = 0;
    while (gameBoard[i] !== '') {
      i++;
    }
      gameBoard[i] = this.state.computerChose;

    this.setState({ gameBoard: gameBoard });
    this.CheckIfWinner(gameBoard);
  }

  render(){
    let whoseTurn;
    (this.state.playersTurn) ? whoseTurn = <P>Your Turn!</P> : whoseTurn = <P>Thinking...</P>;

    if (this.state.showIntroScreen) {
      return (
        <IntroScreen
        ChooseThis={this.PlayerHasChosen} />
      );
    }
    else return (
      <div>
        {whoseTurn}
        <GameBoard
          playersTurn={this.state.playersTurn}
          nextMove={this.NewPlayerMove}
          squareContains={this.state.gameBoard}
          boxColors={this.state.boxColors} />
        <ScoreBoard
          playerScore={this.state.playerScore}
          compScore={this.state.compScore} />
      </div>
    );
  }
}

export default TicTacToe;
