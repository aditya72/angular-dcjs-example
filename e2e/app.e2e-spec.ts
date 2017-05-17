import { CloudPage } from './app.po';

describe('cloud App', () => {
  let page: CloudPage;

  beforeEach(() => {
    page = new CloudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
