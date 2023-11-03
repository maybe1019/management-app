<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/secberus/secberus-app">
    <img src="packages/secberus-app/public/secberus-small-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Secberus Frontend Monorepo</h3>

  <p align="center">
    A monorepo containing everything we require for our product and intranet apps
    <br />
    <a href="https://github.com/secberus/secberus-app/wiki"><strong>Explore the wiki »</strong></a>
    <br />
    <br />
    <a href="https://app-stg.secberus.com">Staging</a>
    ·
    <a href="https://app.secberus.com">Production</a>
    ·
    <a href="https://api-stg.secberus.com/docs">API Docs</a>
    ·
    <a href="http://storybook.gcp.secberus.com/">Component Storybook*</a>
    ·
    <a href="http://jenkins.gcp.secberus.com/">Build Status*</a>
    ·
    <a href="https://github.com/secberus/secberus-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/secberus/secberus-app/issues">Request Feature</a>
    <br />
   *requires VPN
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#deployed-with">Deployed With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#tools">Tools</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#working-on-a-feature">Working on a feature</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

### Built With

* [Lerna](https://github.com/lerna/lerna)
* [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
* [Typescript](https://www.typescriptlang.org/)

### Deployed With
* [Jankins](https://www.jenkins.io/)



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* yarn

If you do not have yarn
  ```sj
  npm install --global yarn
  ```
  or
  ```sh
  brew install yarn
  ```
Environment variables
  ```
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false

# ---- DEV -----
# The base values for everything already target the dev environment.

# ---- PROD -----
# REACT_APP_DEPLOYED_ENV=prod
# REACT_APP_API_URL=https://api.secberus.io
# REACT_APP_COGNITO_DOMAIN=sso.secberus.io
# REACT_APP_AWS_REGION=us-east-1
# REACT_APP_USER_POOL_ID=us-east-1_Z0q541cdq
# REACT_APP_USER_POOL_WEB_CLIENT_ID=7s9f46vt87g3nu3davd6q52jtp
# REACT_APP_IDENTITY_POOL_ID=us-east-1:429efe62-c728-42c3-bc7e-d72d5d5c5e12
# REACT_APP_X_API_KEY=sio2SCptIh6JX7bGGf0gh4lwHDfvkk8J25hXwQDK
# REACT_APP_ROOT_URL=https://app.secberus.io

# ----- STAGING -----
# REACT_APP_COGNITO_DOMAIN=sso-stage.secberus.io
# REACT_APP_AWS_REGION=us-east-1
# REACT_APP_USER_POOL_ID=us-east-1_79SEOd7cD
# REACT_APP_USER_POOL_WEB_CLIENT_ID=1frre063scno75pj2pe8irb89l
# REACT_APP_IDENTITY_POOL_ID=us-east-1:599e758a-7333-4c17-9ff8-64c3867dc0aa
# REACT_APP_DEPLOYED_ENV=stage
# REACT_APP_API_URL=https://api-stage.secberus.io
# REACT_APP_X_API_KEY=A0X7XxCMPM1FBEfO97gfG2QGSRHUcP1iaG7STfvL
# REACT_APP_ROOT_URL=https://stage.secberus.io

  ```
  
<!-- Installation -->
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/secberus/secberus-app.git
   ```
2. Install dependencies
   ```sh
   yarn
   ```
3. Build packages
   ```sh
   yarn build
   ```
   
<!-- Tools -->
### Tools
Useful VSCode extensions, browser add-ons, etc

1. [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  
   Adds React debugging tools to the Chrome Developer Tools.
   
2. [Redux Devtools](https://github.com/reduxjs/redux-devtools)

   DevTools for Redux with hot reloading, action replay, and customizable UI

3. [Docker](https://www.docker.com/)

   For testing the app in a sandboxed environment and debugging the build process.
   
4. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (VSCode)

   Integrates ESLint into VS Code

5. [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components) (VSCode)

   Syntax highlighting for styled-components
   
6. [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) (VSCode)

   Visual Studio Code plugin that autocompletes filenames

<!-- USAGE -->
### Usage

1. Secberus product app
   ```
   yarn start
   ```
   then navigate to http://localhost:3000/ in your browser.
  
 2. Others
    
    See the README for the package you'd like to work with.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/secberus/secberus-app/issues) for a list of proposed features (and known issues).

See the [confluence doc](https://secberus.atlassian.net/wiki/spaces/PROD/pages/872841279/SECBERUS+Roadmap+2020) for a higher level product level view/

<!-- CONTRIBUTING -->
## Working on a feature

1. Create your Feature Branch (`git checkout -b SomeFeature`)
2. Commit your Changes (`git commit -m 'Add some SomeFeature'`)
3. Push to the Branch (`git push origin SomeFeature`)
4. Open a Pull Request
5. Follow the PR template

You might also want to ensure the app builds and deploys properly by running `yarn build:serve:app`.

If you want to run the app in docker you can do so by running
```sh
DOCKER_BUILDKIT=1 docker build --build-arg REACT_APP_API_URL=https://api-stg.secberus.com --build-arg REACT_APP_DEPLOYED_ENV=stage --target deploy-stage -t app . && docker run -it -p 3000:80 app
```

<!-- TROUBLESHOOTING -->
## Troubleshooting

### Common issues

* If typescript starts acting up in VSCode you can run 
   ```sh 
   Typescript: Restart TS server
   ``` 
   in the command prompt (`CMD + Shift + P`)

* If something doesn't feel right burn it all down via 
   ```sh 
   yarn rebuild
   ```

## Bugs and workarounds

* >semantic error TS2742: The inferred type of 'ssoSlice' cannot be named without a reference to '@reduxjs/toolkit/node_modules/immer/dist/internal'. This is likely not portable. A type annotation is necessary.

   Annoying and opaque error which occurs due to yarn workspaces hoisting logic. We have multiple versions of immer floating around and TS decided whichever version `@secberus/services`'s version of redux is depending on is unsafe. Most easily resolved by forcing everyone to resolve to a specific version. Further discussion here: https://github.com/reduxjs/redux-toolkit/issues/790.
