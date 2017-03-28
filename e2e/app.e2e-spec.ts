import { TestingJavascriptPage } from './app.po';

describe('testing-javascript App', function() {
  let page: TestingJavascriptPage;

  beforeEach(() => {
    page = new TestingJavascriptPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
