import React from 'react';
import styled from 'styled-components';


const P = styled.p`
  margin-top: 75px;
  text-align: center;
  font-family: Futura, Arial;
  font-size: 25px;
`;

const InfoDisplay = ({info}) => {
  return(
    <P>{info}</P>
  );
};

export default InfoDisplay;
