import { GitExpertPage } from './app.po';

describe('angular-show-off App', function() {
  let page: GitExpertPage;

  beforeEach(() => {
    page = new GitExpertPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
