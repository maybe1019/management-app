# Quick Start

1. Start the app after set up using `yarn start`.
2. Enter the directory of packages/secberus-app to execute testing commands.
3. Execute the desired commands.

### Examples of useful commands:

- `yarn test` - runs playwright tests for all tests. auto runs all tests with as many workers as possible so avoid using this commands without attaching flags first.
- `yarn test:debug` - has the tests run in debug mode, allowing you to watch and control the pace of a test’s execution live
- `npx playwright codegen localhost:3000` - an excellent tool used to evaluate the app running for selectors that Playwright would recognize.

### Flags

- `--workers=n` - to limit the tests to n amount run at a time, I recommend 1 or `--workers=1`
- `--grep=KEYWORD` - limits the execution of tests to those that match the keyword or the entire title. Must be a string

Examples of use:

- `--grep=‘Category’` for all tests that contain the word “Category”
- `--grep=‘Categories: Custom Category -’` for the test suite
- `--grep=‘Create Custom Category from Settings Page’` runs the specific test
- `--grep=’Filter by Data Source` runs any test that has this phrase

#### Notes

- When a test fails, check the `test-results` folder in the directory. It auto-generates after a failure and will auto wipe after the next test suite runs.
- You can stop the tests running by using control+c. At the wrong time, this can result in a video not being generated properly.
