# Secberus React Web Frontend

## Table Of Contents
 - [Usage](#usage)
    - [Dotenv](#dotenv)
    - [Available Scripts](#available-scripts)
        - [Yarn start](#yarn-start)
        - [Yarn build](#yarn-build)
        - [Yarn test](#yarn-test)
        - [Yarn test:open](#yarn-testopen)
        - [Yarn eject](#yarn-eject)
        - [Yarn lint](#yarn-lint)
        - [Yarn lint:fix](#yarn-lintfix)
  - [Analyzing Bundle Size](#analyzing-bundle-size)
    - [Learn More](#learn-more)

## Usage
The application need an [enviroment file](#dotenv) to define environment variables. Then you can either `yarn start` or `yarn build`

### Linting typescript with VSCode

In order to make VSCode register your eslintconfig changes for typescript (and to autofix),

- `command -> shift -> p`,
- type `settings.json`
Then, add the following to this file and save.
```
"[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

### dotenv

``` bash
REACT_APP_API_URL=<backend_api_url>
REACT_APP_TEST_USERNAME=<optional_dev_username> // work on only in dev
REACT_APP_TEST_PASSWORD=<optional_dev_password> // work on only in dev
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

Runs tests in the cli.
Used test library is [Cypress](https://cypress.io).

### `yarn test:open`

Launches interactive cypress gui for debugging and testing.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn lint`

Run the linter to show errors and warnings based on the settings in `.eslintrc`
Used lint library is [Eslint](https://eslint.org/).

### `yarn lint:fix`

Autofix the errors and warnings of linter.

## Analyzing Bundle Size

We use Webpack Bundle Analyzer to visualize the content and size of all our bundles. To use this feature run `yarn analyze` and a new browser tab will open up at `http://127.0.0.1:8888/`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
