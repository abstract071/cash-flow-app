import { renderComponent , expect } from '../test_helper';
import Header from '../../src/app/components/header';

describe('Header' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Header);
  });

  it('shows a basic header with a logo', () => {
    expect(component.find('.header')).to.exist;
  });
});
