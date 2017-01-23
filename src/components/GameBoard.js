import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Board = styled.div`
  background-color: #F26D21;
  max-width: 455px;
  height: 455px;
  margin-auto;
  margin-top: 25px;
`;

const Button = styled.button`
  font-size: 65px;
  font-family: Futura, Arial;
  vertical-align: top;
  margin: auto;
  margin-right: 10px;
  height: 145px;
  width: 145px;
  border: none;
`;

const FirstRow = styled.div`
  margin-left: -15px;
  width: 500px;
  padding-bottom: 10px;
`;

const SecondRow = styled.div`
  margin-left: -15px;
  width: 500px;
  padding-bottom: 10px;
`;

const ThirdRow = styled.div`
  width: 500px;
  margin-left: -15px;
`;

const GameBoard = ({squareContains, nextMove, boxColors, playersTurn}) => {
  let [zero, one, two, three, four, five, six, seven, eight] = squareContains;

  const selectedSquare = position => nextMove(position);

  GameBoard.propTypes = {
    squareContains: PropTypes.array,
    nextMove: PropTypes.func,
    boxColors: PropTypes.array,
    playersTurn: PropTypes.bool
  };

  return(
    <Board className="GameBoard container">
      <FirstRow>
        <Button style={boxColors[0]} disabled={zero !== '' || !playersTurn} onClick={() => selectedSquare(0)}>{zero}</Button>
        <Button style={boxColors[1]} disabled={one !== '' || !playersTurn} onClick={() => selectedSquare(1)}>{one}</Button>
        <Button style={boxColors[2]} disabled={two !== '' || !playersTurn} onClick={() => selectedSquare(2)}>{two}</Button>
      </FirstRow>
      <SecondRow>
        <Button style={boxColors[3]} disabled={three !== '' || !playersTurn} onClick={() => selectedSquare(3)}>{three}</Button>
        <Button style={boxColors[4]} disabled={four !== '' || !playersTurn} onClick={() => selectedSquare(4)}>{four}</Button>
        <Button style={boxColors[5]} disabled={five !== '' || !playersTurn} onClick={() => selectedSquare(5)}>{five}</Button>
      </SecondRow>
      <ThirdRow>
        <Button style={boxColors[6]} disabled={six !== '' || !playersTurn} onClick={() => selectedSquare(6)}>{six}</Button>
        <Button style={boxColors[7]} disabled={seven !== '' || !playersTurn} onClick={() => selectedSquare(7)}>{seven}</Button>
        <Button style={boxColors[8]} disabled={eight !== '' || !playersTurn} onClick={() => selectedSquare(8)}>{eight}</Button>
      </ThirdRow>
    </Board>
  );
};

export default GameBoard;
