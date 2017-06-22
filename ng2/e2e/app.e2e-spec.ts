import { PitsPage } from './app.po';

describe('pits App', function() {
  let page: PitsPage;

  beforeEach(() => {
    page = new PitsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
