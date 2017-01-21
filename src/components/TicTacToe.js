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
      turnNumber: 1,
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
    this.setState({ turnNumber: this.state.turnNumber + 1 });
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
    this.setState({ turnNumber: 1 });
    this.whoStarts();
  }

  ComputerMove() {
    let turnNumber = this.state.turnNumber;
    let gameBoard = this.state.gameBoard;
    let token = this.state.computerChose;

    if (turnNumber === 1) {
      //always corner
      gameBoard[0] = token;
    }
    if (turnNumber === 2) {
      // middle, otherwise any corner
      if (gameBoard[4] === '') gameBoard[4] = token;
      else gameBoard[2] = token;
    }
    if (turnNumber === 3) {
      // if he went middle go opposite corner
      // if he went opposite corner, or anywhere else, go adjacent corner
      if (gameBoard[4] !== '') {
        gameBoard[8] = token;
      } else if (gameBoard[1] === ''){
        gameBoard[2] = token;
      } else gameBoard[6] = token;
    }
    if (turnNumber === 4) {
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
      // to write blocking a win logic -- loop over winninglines and see if there are two playerChose token in any given line
      // if there are break out of loop, and insert a token inside the remaining slot

      // blocking a possible win logic here
      // if he goes corner, go side
      // if he goes side, go corner to make two in a row
    }
    if (turnNumber === 5){
      // to write game win logic -- loop over winninglines and see if there are two tokens already in one row,
      // if there are - break out of the loop and insert a token to win the game

      // game win logic
      // game block logic
      // make two in a row logic, if you can make a 'fork', play that
    }
    // let i = 0;
    // while (gameBoard[i] !== '') {
    //   i++;
    // }
    //   gameBoard[i] = this.state.computerChose;

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
