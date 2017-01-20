import {renderComponent, expect} from '../test_helper';
import TicTacToe from '../../src/components/TicTacToe';

describe('TicTacToe', () => {
  let component;

  beforeEach(() =>{
    component = renderComponent(TicTacToe);
  });
   // it('has the correct class', () => {
   //   expect(component).to.have.class('TicTacToe');
   // });
});
