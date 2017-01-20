import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  padding-top: 10px;
  font-size: 25px;
  font-family: Futura, Arial;
  max-width: 455px;
  margin: auto;
`;

const InnerDiv = styled.div`
  margin: auto;
  width: 310px;
`;

const P = styled.p`
  margin-left: 25px;
  display: inline-block;
`;

const Output = styled.output`
  margin-left: 10px;
  display: inline-block;
`;

const ScoreBoard = ({ playerScore, compScore }) => {
  return(
    <Div>
      <InnerDiv>
        <P>Player:</P>
        <Output>{playerScore}</Output>
        <P>Computer:</P>
        <Output>{compScore}</Output>
      </InnerDiv>
    </Div>
  );
};

export default ScoreBoard;
