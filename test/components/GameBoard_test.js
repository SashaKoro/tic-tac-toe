import {renderComponent, expect} from '../test_helper';
import GameBoard from '../../src/components/GameBoard';

describe('GameBoard', () => {
  let component;

  beforeEach(() => {
    const props = { squareContains: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] };
    component = renderComponent(GameBoard, null, props);
  });
  // it('expects to have the correct class', () => {
  //   expect(component).to.have.class('GameBoard');
  // });
  // it('expects to have 9 buttons', () => {
  //   expect(component.find('button').length).to.equal(9);
  // });
});
