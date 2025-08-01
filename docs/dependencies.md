## Dependencies 
This is optional. The files which are integrated into your website are pre-built and ready to use.

You only need to install these dependencies if you want to view or edit the PrintReady repository locally.

## Setup
Install dependencies (requires NPM):

```bash
npm install
```

### Live server
To view the repository in your browser using Live Server, run this command:

```bash
npm run start
```
Then in the browser navigate to the `/example` folder to view the demo pages.

### Playwright
Playwright tests are included for further development and preventing regressions in the print-ready JavaScript functionality. They are **not needed** to use PrintReady on your site.

To run the tests (after running `npm install`) navigate to the Print ready folder and run the following command in the terminal:

```bash
npx playwright install
```

Then run the following command to execute the tests 

```bash
npx playwright test
```