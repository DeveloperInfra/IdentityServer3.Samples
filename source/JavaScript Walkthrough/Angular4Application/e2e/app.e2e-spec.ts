import { Angular4ApplicationPage } from './app.po';

describe('angular4-application App', () => {
  let page: Angular4ApplicationPage;

  beforeEach(() => {
    page = new Angular4ApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
