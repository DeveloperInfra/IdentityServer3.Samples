import { Angular2ApplicationPage } from './app.po';

describe('angular2-application App', () => {
  let page: Angular2ApplicationPage;

  beforeEach(() => {
    page = new Angular2ApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
